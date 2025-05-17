import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArmyCategoriesPage from './pages/ArmyCategoriesPage';
import HowToApplyPage from './pages/HowToApplyPage';
import LearningResourcesPage from './pages/LearningResourcesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';
import MockTestPage from './pages/MockTestPage';
import MockInterviewPage from './pages/MockInterviewPage';
import TestResultsPage from './pages/TestResultsPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<ArmyCategoriesPage />} />
        <Route path="how-to-apply/:branch" element={<HowToApplyPage />} />
        <Route path="resources" element={<LearningResourcesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="mock-test" element={<MockTestPage />} />
        <Route path="mock-interview" element={<MockInterviewPage />} />
        <Route path="test-results" element={<TestResultsPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;