import React from 'react';
import { Heart, Activity, Droplets, Moon, TrendingUp } from 'lucide-react';
import { HealthData } from '../utils/healthData';

interface HealthMetricsProps {
  data: HealthData;
  anomalies: string[];
}

const HealthMetrics: React.FC<HealthMetricsProps> = ({ data, anomalies }) => {
  const hasAnomaly = (metric: string) => anomalies.some(a => a.toLowerCase().includes(metric.toLowerCase()));

  const getMetricStatus = (value: number, normal: [number, number]) => {
    if (value < normal[0] || value > normal[1]) return 'warning';
    return 'normal';
  };

  const metrics = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: data.heartRate,
      unit: 'BPM',
      status: getMetricStatus(data.heartRate, [60, 100]),
      normal: '60-100 BPM',
      color: hasAnomaly('heart') ? 'red' : 'blue',
    },
    {
      icon: Droplets,
      label: 'Blood Oxygen',
      value: data.bloodOxygen,
      unit: '%',
      status: getMetricStatus(data.bloodOxygen, [95, 100]),
      normal: '95-100%',
      color: hasAnomaly('oxygen') ? 'red' : 'teal',
    },
    {
      icon: Activity,
      label: 'Activity Level',
      value: data.activityLevel,
      unit: 'steps',
      status: 'normal',
      normal: '8000+ steps',
      color: 'green',
    },
    {
      icon: Moon,
      label: 'Sleep Quality',
      value: data.sleepQuality,
      unit: '%',
      status: getMetricStatus(data.sleepQuality, [70, 100]),
      normal: '70-100%',
      color: 'purple',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={metric.label}
          className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
            metric.status === 'warning' ? 'border-red-200 bg-red-50' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
              metric.color === 'red' ? 'from-red-500 to-red-600' :
              metric.color === 'blue' ? 'from-blue-500 to-blue-600' :
              metric.color === 'teal' ? 'from-teal-500 to-teal-600' :
              metric.color === 'green' ? 'from-green-500 to-green-600' :
              'from-purple-500 to-purple-600'
            } flex items-center justify-center shadow-lg`}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>
            {metric.status === 'warning' && (
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-600">{metric.label}</p>
            <div className="flex items-baseline space-x-2">
              <span className={`text-3xl font-bold ${
                metric.status === 'warning' ? 'text-red-600' : 'text-slate-900'
              }`}>
                {metric.value}
              </span>
              <span className="text-sm text-slate-500">{metric.unit}</span>
            </div>
            <p className="text-xs text-slate-400">Normal: {metric.normal}</p>
          </div>

          {/* Progress bar for visual representation */}
          <div className="mt-4">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${
                  metric.color === 'red' ? 'from-red-400 to-red-500' :
                  metric.color === 'blue' ? 'from-blue-400 to-blue-500' :
                  metric.color === 'teal' ? 'from-teal-400 to-teal-500' :
                  metric.color === 'green' ? 'from-green-400 to-green-500' :
                  'from-purple-400 to-purple-500'
                } transition-all duration-300`}
                style={{
                  width: metric.label === 'Heart Rate' ? `${Math.min(metric.value / 120 * 100, 100)}%` :
                         metric.label === 'Blood Oxygen' ? `${metric.value}%` :
                         metric.label === 'Activity Level' ? `${Math.min(metric.value / 12000 * 100, 100)}%` :
                         `${metric.value}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthMetrics;