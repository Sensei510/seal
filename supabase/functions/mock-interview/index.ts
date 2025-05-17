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

    const { question, answer } = await req.json();

    // Simulate AI evaluation
    const evaluateAnswer = (answer: string, expectedPoints: string[]) => {
      const words = answer.toLowerCase().split(' ');
      let score = 0;
      let matchedPoints = [];

      for (const point of expectedPoints) {
        const pointWords = point.toLowerCase().split(' ');
        let matches = 0;
        
        for (const word of pointWords) {
          if (words.includes(word)) matches++;
        }
        
        if (matches >= pointWords.length * 0.6) {
          score++;
          matchedPoints.push(point);
        }
      }

      return {
        score: (score / expectedPoints.length) * 10,
        matchedPoints,
        feedback: generateFeedback(score, expectedPoints.length, matchedPoints)
      };
    };

    const generateFeedback = (score: number, total: number, matchedPoints: string[]) => {
      const percentage = (score / total) * 100;
      
      let feedback = '';
      if (percentage >= 80) {
        feedback = 'Excellent response! You covered most key points effectively.';
      } else if (percentage >= 60) {
        feedback = 'Good answer, but there\'s room for improvement.';
      } else {
        feedback = 'Your answer needs more work. Consider including these key points:';
      }

      return {
        summary: feedback,
        matchedPoints,
        suggestedPoints: matchedPoints.length < total ? 
          'Consider incorporating points about leadership, problem-solving, and military protocol.' : 
          'You\'ve covered all major points well!'
      };
    };

    // Get question details from database
    const { data: questionData, error: questionError } = await supabase
      .from('interview_questions')
      .select('*')
      .eq('id', question.id)
      .single();

    if (questionError) throw questionError;

    const evaluation = evaluateAnswer(answer, questionData.expected_points);

    return new Response(
      JSON.stringify(evaluation),
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