
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge, Trophy, Star, Zap } from 'lucide-react';

const stats = [
  {
    title: 'Fleet Utilization',
    value: 78,
    target: 85,
    icon: Gauge,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Customer Satisfaction',
    value: 94,
    target: 95,
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    title: 'Loyalty Program',
    value: 67,
    target: 75,
    icon: Trophy,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'System Performance',
    value: 99,
    target: 99,
    icon: Zap,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
];

export function QuickStats() {
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
