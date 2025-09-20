export interface HealthData {
  timestamp: Date;
  heartRate: number;
  bloodOxygen: number;
  activityLevel: number;
  sleepQuality: number;
}

// Simulate realistic health data with some variation and patterns
export const generateHealthData = (): HealthData => {
  const now = new Date();
  const hour = now.getHours();
  
  // Heart rate varies by time of day and activity
  let baseHeartRate = 72;
  if (hour >= 6 && hour <= 9) baseHeartRate = 68; // Morning rest
  if (hour >= 10 && hour <= 16) baseHeartRate = 75; // Active day
  if (hour >= 17 && hour <= 21) baseHeartRate = 80; // Evening activity
  if (hour >= 22 || hour <= 5) baseHeartRate = 65; // Night rest
  
  // Add some realistic variation
  const heartRateVariation = (Math.random() - 0.5) * 20;
  const heartRate = Math.round(Math.max(50, Math.min(120, baseHeartRate + heartRateVariation)));
  
  // Blood oxygen is usually stable but can vary slightly
  const bloodOxygen = Math.round(Math.max(88, Math.min(100, 98 + (Math.random() - 0.5) * 4)));
  
  // Activity level varies throughout the day
  let baseActivity = 500;
  if (hour >= 7 && hour <= 9) baseActivity = 2000; // Morning activity
  if (hour >= 12 && hour <= 14) baseActivity = 1500; // Lunch walk
  if (hour >= 17 && hour <= 19) baseActivity = 3000; // Evening exercise
  
  const activityVariation = Math.random() * 1000;
  const activityLevel = Math.round(baseActivity + activityVariation);
  
  // Sleep quality is higher during typical sleep hours
  let sleepQuality = 85;
  if (hour >= 22 || hour <= 6) {
    sleepQuality = Math.round(75 + Math.random() * 20);
  } else {
    sleepQuality = Math.round(60 + Math.random() * 30);
  }
  
  return {
    timestamp: now,
    heartRate,
    bloodOxygen,
    activityLevel,
    sleepQuality
  };
};

// AI-powered anomaly detection simulation
export const detectAnomalies = (data: HealthData): string[] => {
  const anomalies: string[] = [];
  
  // Heart rate anomalies
  if (data.heartRate > 100) {
    anomalies.push(`Elevated heart rate detected: ${data.heartRate} BPM (Normal: 60-100 BPM)`);
  } else if (data.heartRate < 60) {
    anomalies.push(`Low heart rate detected: ${data.heartRate} BPM (Normal: 60-100 BPM)`);
  }
  
  // Blood oxygen anomalies
  if (data.bloodOxygen < 95) {
    anomalies.push(`Low blood oxygen saturation: ${data.bloodOxygen}% (Normal: ≥95%)`);
  }
  
  // Activity anomalies
  const hour = new Date().getHours();
  if (hour >= 9 && hour <= 17 && data.activityLevel < 1000) {
    anomalies.push(`Low activity level during daytime: ${data.activityLevel} steps`);
  }
  
  // Sleep quality anomalies
  if (data.sleepQuality < 60) {
    anomalies.push(`Poor sleep quality detected: ${data.sleepQuality}% (Recommended: ≥70%)`);
  }
  
  // Correlation anomalies (AI-like analysis)
  if (data.heartRate > 90 && data.activityLevel < 500) {
    anomalies.push('High heart rate with low activity - possible stress or medical condition');
  }
  
  if (data.bloodOxygen < 96 && data.heartRate > 90) {
    anomalies.push('Combined low oxygen and elevated heart rate - requires attention');
  }
  
  return anomalies;
};

// Generate sample historical data for initial load
export const generateHistoricalData = (count: number = 50): HealthData[] => {
  const data: HealthData[] = [];
  const now = new Date();
  
  for (let i = count; i > 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3000); // 3 seconds apart
    data.push({
      ...generateHealthData(),
      timestamp
    });
  }
  
  return data;
};