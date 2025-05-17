import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, BarChart } from 'lucide-react';

interface TestResults {
  score: number;
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
}

const TestResultsPage: React.FC = () => {
  const location = useLocation();
  const results = location.state?.results as TestResults;

  if (!results) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold mb-4">Results Not Found</h1>
          <p className="text-neutral-600 mb-6">The test results you're looking for are not available.</p>
          <Link
            to="/mock-test"
            className="inline-flex items-center bg-army-green text-white px-6 py-3 rounded-md hover:bg-army-dark transition-colors"
          >
            Take a New Test <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-army-green text-white text-center">
              <h1 className="font-display text-3xl font-bold mb-2">Test Results</h1>
              <p className="text-neutral-100">Here's how you performed in the mock test</p>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">
                  <span className={getScoreColor(results.score)}>{Math.round(results.score)}%</span>
                </div>
                <p className="text-neutral-600">Overall Score</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-500">{results.correct}</div>
                  <p className="text-neutral-600">Correct</p>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-500">{results.incorrect}</div>
                  <p className="text-neutral-600">Incorrect</p>
                </div>
                
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-neutral-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-neutral-500">{results.skipped}</div>
                  <p className="text-neutral-600">Skipped</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold mb-4">Performance Analysis</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy Rate</span>
                      <span>{Math.round((results.correct / (results.correct + results.incorrect)) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${(results.correct / (results.correct + results.incorrect)) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Rate</span>
                      <span>{Math.round(((results.correct + results.incorrect) / results.total) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${((results.correct + results.incorrect) / results.total) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link
                  to="/mock-test"
                  className="flex-1 bg-army-green text-white py-3 rounded-md hover:bg-army-dark transition-colors text-center"
                >
                  Take Another Test
                </Link>
                <Link
                  to="/progress"
                  className="flex-1 border border-army-green text-army-green py-3 rounded-md hover:bg-army-green/10 transition-colors text-center"
                >
                  View Progress <BarChart className="inline-block ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestResultsPage;