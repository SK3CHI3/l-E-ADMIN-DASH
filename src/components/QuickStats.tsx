import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge, Trophy, Star, Zap } from 'lucide-react';
import api from '../lib/api';

export function QuickStats() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/admin/dashboard/quick-stats');
        setStats(res.data.stats || []);
      } catch (err) {
        setError('Failed to fetch quick stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
    <CardHeader>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </CardHeader>
    <CardContent className="space-y-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </CardContent>
  </Card>;
  
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{stat.title}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{stat.value}%</span>
            </div>
            <Progress value={stat.value} className="h-2" />
            <p className="text-xs text-gray-500">Target: {stat.target}%</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
