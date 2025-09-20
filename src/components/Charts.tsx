import React from 'react';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { HealthData } from '../utils/healthData';

interface ChartsProps {
  data: HealthData[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  const latest20 = data.slice(-20);

  const LineChart: React.FC<{ data: number[]; color: string; label: string }> = ({ data, color, label }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <div className="h-48 flex items-end space-x-1">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col justify-end">
              <div 
                className={`bg-gradient-to-t ${color} rounded-t-sm transition-all duration-300 hover:opacity-80`}
                style={{ height: `${Math.max(height, 5)}%` }}
              ></div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Heart Rate Trends</h3>
              <p className="text-sm text-slate-600">Last 20 measurements</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">Real-time</div>
        </div>
        
        {latest20.length > 0 && (
          <>
            <LineChart 
              data={latest20.map(d => d.heartRate)} 
              color="from-blue-400 to-blue-600"
              label="Heart Rate"
            />
            <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
              <span>20 readings ago</span>
              <span>Current: {data[data.length - 1]?.heartRate} BPM</span>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Blood Oxygen</h3>
              <p className="text-sm text-slate-600">Saturation levels</p>
            </div>
          </div>
          
          {latest20.length > 0 && (
            <>
              <LineChart 
                data={latest20.map(d => d.bloodOxygen)} 
                color="from-teal-400 to-teal-600"
                label="Blood Oxygen"
              />
              <div className="mt-4 text-sm text-slate-500 text-center">
                Current: {data[data.length - 1]?.bloodOxygen}%
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Activity Level</h3>
              <p className="text-sm text-slate-600">Steps per reading</p>
            </div>
          </div>
          
          {latest20.length > 0 && (
            <>
              <LineChart 
                data={latest20.map(d => d.activityLevel)} 
                color="from-green-400 to-green-600"
                label="Activity Level"
              />
              <div className="mt-4 text-sm text-slate-500 text-center">
                Current: {data[data.length - 1]?.activityLevel} steps
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;