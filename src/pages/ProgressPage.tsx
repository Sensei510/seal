import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, LineChart, TrendingUp, TrendingDown, Award, Target, BookOpen, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProgressData {
  testPerformance: {
    averageScore: number;
    totalAttempts: number;
    improvement: number;
    recentScores: number[];
    strengthAreas: string[];
    weaknessAreas: string[];
  };
  interviewPerformance: {
    averageRating: number;
    totalSessions: number;
    improvement: number;
    recentFeedback: any[];
    commonStrengths: string[];
    areasForImprovement: string[];
  };
  overallProgress: {
    completionRate: number;
    overallScore: number;
    trend: string;
  };
  recommendations: string[];
}

const ProgressPage: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/progress-tracking?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      const data = await response.json();
      setProgressData(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-army-green border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!progressData) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">No Progress Data Available</h1>
            <p className="text-neutral-600">Start taking tests and interviews to track your progress!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your Progress <span className="text-army-green">Dashboard</span>
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Track your performance, identify areas for improvement, and follow personalized recommendations for better results.
          </p>
        </div>

        {/* Overall Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Overall Score</h2>
              <Award className="h-6 w-6 text-army-green" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {Math.round(progressData.overallProgress.overallScore)}%
            </div>
            <div className="flex items-center text-sm">
              {progressData.overallProgress.trend === 'improving' ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">Improving</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">Needs Attention</span>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Test Performance</h2>
              <Target className="h-6 w-6 text-army-green" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {Math.round(progressData.testPerformance.averageScore)}%
            </div>
            <div className="text-sm text-neutral-600">
              {progressData.testPerformance.totalAttempts} tests completed
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Interview Performance</h2>
              <Users className="h-6 w-6 text-army-green" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {progressData.interviewPerformance.averageRating.toFixed(1)}/5
            </div>
            <div className="text-sm text-neutral-600">
              {progressData.interviewPerformance.totalSessions} interviews completed
            </div>
          </motion.div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 text-army-green mr-2" />
              Your Strengths
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Test Performance</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  {progressData.testPerformance.strengthAreas.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Interview Performance</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  {progressData.interviewPerformance.commonStrengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Areas for Improvement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 text-army-green mr-2" />
              Areas for Improvement
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Test Performance</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  {progressData.testPerformance.weaknessAreas.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Interview Performance</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  {progressData.interviewPerformance.areasForImprovement.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="font-display text-xl font-semibold mb-4 flex items-center">
            <BookOpen className="h-5 w-5 text-army-green mr-2" />
            Personalized Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressData.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <p className="text-neutral-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="font-display text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Recent Test Scores</h3>
              <div className="h-40 bg-neutral-50 rounded-lg p-4">
                {/* Add a chart component here */}
                <div className="flex items-center justify-center h-full text-neutral-400">
                  <BarChart className="h-6 w-6 mr-2" />
                  Chart visualization would go here
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Interview Performance Trend</h3>
              <div className="h-40 bg-neutral-50 rounded-lg p-4">
                {/* Add a chart component here */}
                <div className="flex items-center justify-center h-full text-neutral-400">
                  <LineChart className="h-6 w-6 mr-2" />
                  Chart visualization would go here
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressPage;