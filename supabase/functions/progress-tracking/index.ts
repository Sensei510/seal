import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      throw new Error('User ID is required');
    }

    // Get test attempts
    const { data: testAttempts, error: testError } = await supabase
      .from('test_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (testError) throw testError;

    // Get interview sessions
    const { data: interviewSessions, error: interviewError } = await supabase
      .from('interview_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (interviewError) throw interviewError;

    // Calculate progress metrics
    const calculateProgress = (testAttempts: any[], interviewSessions: any[]) => {
      const testScores = testAttempts.map(attempt => attempt.score);
      const interviewRatings = interviewSessions.map(session => session.overall_rating);

      return {
        testPerformance: {
          averageScore: testScores.length ? 
            testScores.reduce((a, b) => a + b, 0) / testScores.length : 0,
          totalAttempts: testScores.length,
          improvement: testScores.length > 1 ? 
            testScores[0] - testScores[testScores.length - 1] : 0,
          recentScores: testScores.slice(0, 5),
          strengthAreas: analyzeStrengths(testAttempts),
          weaknessAreas: analyzeWeaknesses(testAttempts)
        },
        interviewPerformance: {
          averageRating: interviewRatings.length ? 
            interviewRatings.reduce((a, b) => a + b, 0) / interviewRatings.length : 0,
          totalSessions: interviewRatings.length,
          improvement: interviewRatings.length > 1 ? 
            interviewRatings[0] - interviewRatings[interviewRatings.length - 1] : 0,
          recentFeedback: interviewSessions.slice(0, 3).map(session => session.ai_feedback),
          commonStrengths: analyzeInterviewStrengths(interviewSessions),
          areasForImprovement: analyzeInterviewWeaknesses(interviewSessions)
        },
        overallProgress: calculateOverallProgress(testAttempts, interviewSessions),
        recommendations: generateRecommendations(testScores, interviewRatings)
      };
    };

    const analyzeStrengths = (attempts: any[]) => {
      // Analyze question categories where user performs well
      const strengths = [];
      // Implementation details...
      return strengths;
    };

    const analyzeWeaknesses = (attempts: any[]) => {
      // Identify areas needing improvement
      const weaknesses = [];
      // Implementation details...
      return weaknesses;
    };

    const analyzeInterviewStrengths = (sessions: any[]) => {
      // Analyze positive interview feedback patterns
      const strengths = [];
      // Implementation details...
      return strengths;
    };

    const analyzeInterviewWeaknesses = (sessions: any[]) => {
      // Identify interview areas needing improvement
      const weaknesses = [];
      // Implementation details...
      return weaknesses;
    };

    const calculateOverallProgress = (testAttempts: any[], interviewSessions: any[]) => {
      // Calculate overall progress metrics
      return {
        completionRate: 0,
        overallScore: 0,
        trend: 'improving'
      };
    };

    const generateRecommendations = (testScores: number[], interviewRatings: number[]) => {
      const recommendations = [];

      if (testScores.length < 3) {
        recommendations.push('Take more practice tests to establish a baseline performance');
      } else if (testScores[0] < 70) {
        recommendations.push('Focus on improving test scores through additional study');
      }

      if (interviewRatings.length < 2) {
        recommendations.push('Participate in more mock interviews to build confidence');
      } else if (interviewRatings[0] < 4) {
        recommendations.push('Practice interview scenarios to improve performance');
      }

      return recommendations;
    };

    const progress = calculateProgress(testAttempts, interviewSessions);

    // Save progress metrics
    const { error: saveError } = await supabase
      .from('progress_metrics')
      .insert({
        user_id: userId,
        metric_type: 'combined_performance',
        metric_data: progress
      });

    if (saveError) throw saveError;

    return new Response(
      JSON.stringify(progress),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});