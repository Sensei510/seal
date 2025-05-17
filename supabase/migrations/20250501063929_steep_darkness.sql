/*
  # Initial Schema Setup for Military Exam Platform

  1. New Tables
    - users_profile
      - Extended user profile information
      - Tracks user progress and preferences
    
    - exam_categories
      - Different types of military exams
      - Categorizes questions and tests
    
    - questions
      - Test questions bank
      - Includes multiple choice and situational questions
    
    - mock_tests
      - Pre-defined test configurations
      - Time limits and question selections
    
    - test_attempts
      - User test attempt records
      - Stores answers and scores
    
    - interview_questions
      - Mock interview question bank
      - Different types of interview scenarios
    
    - interview_sessions
      - User interview attempts
      - AI feedback and ratings
    
    - progress_metrics
      - User performance analytics
      - Historical progress tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Secure user data isolation
*/

-- Users Profile
CREATE TABLE IF NOT EXISTS users_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  preferred_branch text CHECK (preferred_branch IN ('army', 'navy', 'airforce')),
  physical_metrics jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users_profile
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users_profile
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Exam Categories
CREATE TABLE IF NOT EXISTS exam_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  branch text CHECK (branch IN ('army', 'navy', 'airforce', 'common')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exam_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view exam categories"
  ON exam_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Questions Bank
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES exam_categories(id),
  question_type text CHECK (question_type IN ('multiple_choice', 'situational', 'physical')),
  difficulty_level integer CHECK (difficulty_level BETWEEN 1 AND 5),
  question_text text NOT NULL,
  options jsonb,
  correct_answer text,
  explanation text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Mock Tests
CREATE TABLE IF NOT EXISTS mock_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration_minutes integer NOT NULL,
  total_questions integer NOT NULL,
  difficulty_level integer CHECK (difficulty_level BETWEEN 1 AND 5),
  question_distribution jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view mock tests"
  ON mock_tests
  FOR SELECT
  TO authenticated
  USING (true);

-- Test Attempts
CREATE TABLE IF NOT EXISTS test_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  mock_test_id uuid REFERENCES mock_tests(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  answers jsonb,
  score numeric,
  feedback jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own test attempts"
  ON test_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create test attempts"
  ON test_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Interview Questions
CREATE TABLE IF NOT EXISTS interview_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_type text CHECK (question_type IN ('leadership', 'problem_solving', 'protocol', 'general')),
  question_text text NOT NULL,
  expected_points text[],
  evaluation_criteria jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view interview questions"
  ON interview_questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Interview Sessions
CREATE TABLE IF NOT EXISTS interview_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  session_date timestamptz NOT NULL,
  questions_asked jsonb,
  responses jsonb,
  ai_feedback jsonb,
  overall_rating integer CHECK (overall_rating BETWEEN 1 AND 5),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own interview sessions"
  ON interview_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create interview sessions"
  ON interview_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Progress Metrics
CREATE TABLE IF NOT EXISTS progress_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  metric_type text CHECK (metric_type IN ('test_performance', 'interview_performance', 'physical_fitness')),
  metric_data jsonb,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE progress_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress metrics"
  ON progress_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create progress metrics"
  ON progress_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_user ON test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user ON interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_metrics_user ON progress_metrics(user_id);