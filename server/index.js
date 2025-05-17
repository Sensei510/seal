import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Mock database
const users = [];
const mockInterviews = [
  {
    id: 1,
    question: "Why do you want to join the Armed Forces?",
    expectedPoints: [
      "Sense of duty towards nation",
      "Family tradition of service",
      "Leadership opportunities",
      "Challenging career"
    ]
  },
  {
    id: 2,
    question: "How do you handle pressure situations?",
    expectedPoints: [
      "Stay calm and focused",
      "Prioritize tasks",
      "Follow standard procedures",
      "Learn from experience"
    ]
  }
];

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword
    };

    users.push(user);
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/api/mock-interview/questions', authenticateToken, (req, res) => {
  res.json(mockInterviews);
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  console.log('Contact form submission:', { name, email, phone, subject, message });
  
  setTimeout(() => {
    res.status(200).json({ success: true, message: 'Your message has been received' });
  }, 1000);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-interview', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined interview room ${roomId}`);
  });

  socket.on('submit-answer', (data) => {
    // Simulate AI evaluation
    const score = Math.floor(Math.random() * 10) + 1;
    socket.emit('answer-feedback', {
      score,
      feedback: `Your answer scored ${score}/10. ${score > 7 ? 'Excellent work!' : 'Keep practicing!'}`
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});