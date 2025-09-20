import React, { useState, useEffect } from 'react';
import { Heart, Activity, Droplets, Moon, TrendingUp, AlertTriangle, CheckCircle, Brain } from 'lucide-react';
import Dashboard from './components/Dashboard';
import HealthMetrics from './components/HealthMetrics';
import Charts from './components/Charts';
import Recommendations from './components/Recommendations';
import { HealthData, generateHealthData, detectAnomalies } from './utils/healthData';

function App() {
  const [currentData, setCurrentData] = useState<HealthData>(generateHealthData());
  const [historicalData, setHistoricalData] = useState<HealthData[]>([]);
  const [anomalies, setAnomalies] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateHealthData();
      setCurrentData(newData);
      
      setHistoricalData(prev => {
        const updated = [...prev, newData].slice(-50); // Keep last 50 data points
        const detectedAnomalies = detectAnomalies(newData);
        setAnomalies(detectedAnomalies);
        return updated;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">HealthAI Monitor</h1>
                <p className="text-sm text-slate-600">Real-time Health Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Live Monitoring</span>
              </div>
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Anomaly Alerts */}
        {anomalies.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Health Alert Detected</h3>
                  <ul className="space-y-1">
                    {anomalies.map((anomaly, index) => (
                      <li key={index} className="text-red-700 text-sm">• {anomaly}</li>
                    ))}
                  </ul>
                  <p className="text-red-600 text-sm mt-2">AI recommendation: Please consult with a healthcare professional.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Metrics Grid */}
        <HealthMetrics data={currentData} anomalies={anomalies} />

        {/* Dashboard and Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
          <div className="xl:col-span-2">
            <Charts data={historicalData} />
          </div>
          <div>
            <Recommendations data={currentData} anomalies={anomalies} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;