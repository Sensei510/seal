/*
  # Quiz System Schema Update

  1. New Tables
    - quiz_categories: Hierarchical categories for quizzes
    - questions: Question bank with multiple types
    - user_attempts: Track user quiz attempts
    - performance_metrics: Store user performance data

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Secure user data isolation
*/

-- Quiz Categories
CREATE TABLE IF NOT EXISTS quiz_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  difficulty_level integer CHECK (difficulty_level BETWEEN 1 AND 5),
  parent_id uuid REFERENCES quiz_categories(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_categories ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'quiz_categories' AND policyname = 'Anyone can view quiz categories'
  ) THEN
    CREATE POLICY "Anyone can view quiz categories"
      ON quiz_categories
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Questions
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES quiz_categories(id),
  question_type text CHECK (question_type IN ('multiple_choice', 'true_false', 'coding')),
  difficulty_level integer CHECK (difficulty_level BETWEEN 1 AND 5),
  question_text text NOT NULL,
  code_snippet text,
  options jsonb,
  correct_answer text,
  explanation text,
  points integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'questions' AND policyname = 'Anyone can view questions'
  ) THEN
    CREATE POLICY "Anyone can view questions"
      ON questions
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- User Attempts
CREATE TABLE IF NOT EXISTS user_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  category_id uuid REFERENCES quiz_categories(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  answers jsonb,
  score numeric,
  time_taken interval,
  feedback jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_attempts ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_attempts' AND policyname = 'Users can view own attempts'
  ) THEN
    CREATE POLICY "Users can view own attempts"
      ON user_attempts
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_attempts' AND policyname = 'Users can create attempts'
  ) THEN
    CREATE POLICY "Users can create attempts"
      ON user_attempts
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Performance Metrics
CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  category_id uuid REFERENCES quiz_categories(id),
  metric_type text CHECK (metric_type IN ('accuracy', 'speed', 'consistency')),
  metric_value numeric,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'performance_metrics' AND policyname = 'Users can view own metrics'
  ) THEN
    CREATE POLICY "Users can view own metrics"
      ON performance_metrics
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'performance_metrics' AND policyname = 'Users can create metrics'
  ) THEN
    CREATE POLICY "Users can create metrics"
      ON performance_metrics
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_user ON user_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_user ON performance_metrics(user_id);