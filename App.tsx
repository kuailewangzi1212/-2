import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatBooking from './components/ChatBooking';
import VisualDiagnosis from './components/VisualDiagnosis';
import FeedbackInsight from './components/FeedbackInsight';
import PresentationMode from './components/PresentationMode';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onChangeView={setCurrentView} />;
      case AppView.BOOKING:
        return <ChatBooking />;
      case AppView.DIAGNOSIS:
        return <VisualDiagnosis />;
      case AppView.FEEDBACK:
        return <FeedbackInsight />;
      case AppView.SCRIPT:
        return <PresentationMode />;
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;