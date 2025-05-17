import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

    const { testId, answers, userId } = await req.json();

    // Get test details
    const { data: testData, error: testError } = await supabase
      .from('mock_tests')
      .select(`
        *,
        questions:questions(*)
      `)
      .eq('id', testId)
      .single();

    if (testError) throw testError;

    // Calculate score
    const calculateScore = (answers: Record<string, string>, questions: any[]) => {
      let correct = 0;
      let incorrect = 0;
      let skipped = 0;
      
      questions.forEach(question => {
        const userAnswer = answers[question.id];
        if (!userAnswer) {
          skipped++;
        } else if (userAnswer === question.correct_answer) {
          correct++;
        } else {
          incorrect++;
        }
      });

      return {
        score: (correct / questions.length) * 100,
        correct,
        incorrect,
        skipped,
        total: questions.length
      };
    };

    const results = calculateScore(answers, testData.questions);

    // Save attempt
    const { error: saveError } = await supabase
      .from('test_attempts')
      .insert({
        user_id: userId,
        mock_test_id: testId,
        answers,
        score: results.score,
        feedback: results
      });

    if (saveError) throw saveError;

    return new Response(
      JSON.stringify(results),
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