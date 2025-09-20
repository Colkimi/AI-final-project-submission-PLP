import React from 'react';
import { Brain, Lightbulb, AlertCircle, CheckCircle, Target, Activity } from 'lucide-react';
import { HealthData } from '../utils/healthData';

interface RecommendationsProps {
  data: HealthData;
  anomalies: string[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ data, anomalies }) => {
  const generateRecommendations = () => {
    const recommendations = [];

    // Heart rate recommendations
    if (data.heartRate > 100) {
      recommendations.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Elevated Heart Rate',
        message: 'Consider relaxation techniques or light stretching. Avoid caffeine.',
        priority: 'high'
      });
    } else if (data.heartRate < 60) {
      recommendations.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Low Heart Rate',
        message: 'Monitor closely. If symptomatic, consult healthcare provider.',
        priority: 'high'
      });
    } else {
      recommendations.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Heart Rate Optimal',
        message: 'Your heart rate is within the healthy range. Keep up the good work!',
        priority: 'normal'
      });
    }

    // Blood oxygen recommendations
    if (data.bloodOxygen < 95) {
      recommendations.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Low Blood Oxygen',
        message: 'Practice deep breathing exercises. Consider consulting a doctor.',
        priority: 'high'
      });
    } else {
      recommendations.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Oxygen Levels Good',
        message: 'Blood oxygen saturation is healthy.',
        priority: 'normal'
      });
    }

    // Activity recommendations
    if (data.activityLevel < 5000) {
      recommendations.push({
        type: 'info',
        icon: Target,
        title: 'Increase Activity',
        message: 'Try to reach 8,000+ steps daily. Take short walks throughout the day.',
        priority: 'normal'
      });
    } else if (data.activityLevel > 10000) {
      recommendations.push({
        type: 'success',
        icon: Activity,
        title: 'Great Activity Level!',
        message: 'Excellent daily activity. Remember to stay hydrated and rest when needed.',
        priority: 'normal'
      });
    }

    // Sleep recommendations
    if (data.sleepQuality < 70) {
      recommendations.push({
        type: 'info',
        icon: Lightbulb,
        title: 'Improve Sleep Quality',
        message: 'Maintain consistent sleep schedule. Avoid screens 1 hour before bed.',
        priority: 'normal'
      });
    }

    return recommendations.sort((a, b) => a.priority === 'high' ? -1 : 1);
  };

  const recommendations = generateRecommendations();

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">AI Health Insights</h3>
            <p className="text-sm text-slate-600">Personalized recommendations</p>
          </div>
        </div>

        {/* Health Score */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Overall Health Score</span>
            <span className="text-2xl font-bold text-blue-600">
              {Math.round((
                (data.heartRate >= 60 && data.heartRate <= 100 ? 25 : 15) +
                (data.bloodOxygen >= 95 ? 25 : 15) +
                (data.activityLevel >= 8000 ? 25 : data.activityLevel >= 5000 ? 20 : 10) +
                (data.sleepQuality >= 70 ? 25 : 15)
              ))}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
              style={{
                width: `${Math.round((
                  (data.heartRate >= 60 && data.heartRate <= 100 ? 25 : 15) +
                  (data.bloodOxygen >= 95 ? 25 : 15) +
                  (data.activityLevel >= 8000 ? 25 : data.activityLevel >= 5000 ? 20 : 10) +
                  (data.sleepQuality >= 70 ? 25 : 15)
                ))}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h4 className="text-md font-semibold text-slate-900 mb-4">Personalized Recommendations</h4>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border-l-4 ${
                rec.type === 'warning' ? 'bg-red-50 border-red-400' :
                rec.type === 'success' ? 'bg-green-50 border-green-400' :
                'bg-blue-50 border-blue-400'
              } transition-all duration-200 hover:shadow-sm`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  rec.type === 'warning' ? 'bg-red-100' :
                  rec.type === 'success' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  <rec.icon className={`w-4 h-4 ${
                    rec.type === 'warning' ? 'text-red-600' :
                    rec.type === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-slate-900 text-sm">{rec.title}</h5>
                  <p className="text-xs text-slate-600 mt-1">{rec.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h4 className="text-md font-semibold text-slate-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-sm font-medium text-blue-700 transition-colors duration-200">
            Log Activity
          </button>
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-xl text-sm font-medium text-green-700 transition-colors duration-200">
            Track Mood
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-xl text-sm font-medium text-purple-700 transition-colors duration-200">
            Set Reminder
          </button>
          <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-xl text-sm font-medium text-orange-700 transition-colors duration-200">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;