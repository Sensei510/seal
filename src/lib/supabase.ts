import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables for Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type QuizCategory = {
  id: string;
  name: string;
  description: string | null;
  difficulty_level: number;
  parent_id: string | null;
  created_at: string;
};

export type Question = {
  id: string;
  category_id: string;
  question_type: 'multiple_choice' | 'true_false' | 'coding';
  difficulty_level: number;
  question_text: string;
  code_snippet: string | null;
  options: any;
  correct_answer: string;
  explanation: string | null;
  points: number;
  created_at: string;
  updated_at: string;
};

export type UserAttempt = {
  id: string;
  user_id: string;
  category_id: string;
  start_time: string;
  end_time: string | null;
  answers: Record<string, any>;
  score: number | null;
  time_taken: string | null;
  feedback: Record<string, any> | null;
  created_at: string;
};

export type PerformanceMetric = {
  id: string;
  user_id: string;
  category_id: string;
  metric_type: 'accuracy' | 'speed' | 'consistency';
  metric_value: number;
  recorded_at: string;
};