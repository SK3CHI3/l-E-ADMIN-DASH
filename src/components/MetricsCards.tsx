import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Plane, Users, CalendarDays, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import api from '../lib/api';

// Default card definitions (titles/icons/colors), but no values
const defaultCards = [
  {
    title: "Total Fleet",
    icon: "Car",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
  },
  {
    title: "Active Bookings",
    icon: "CalendarDays",
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100",
  },
  {
    title: "Total Customers",
    icon: "Users",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
  },
  {
    title: "Monthly Revenue",
    icon: "DollarSign",
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100",
  },
];

// Icon mapping for dynamic icons
const iconMap: { [key: string]: any } = {
  Car,
  Plane,
  Users,
  CalendarDays,
  DollarSign,
};

export function MetricsCards() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('MetricsCards component rendered');

  useEffect(() => {
    const fetchMetrics = async () => {
      console.log('Fetching metrics...');
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/admin/dashboard/metrics');
        console.log('API response:', res);
        setMetrics(res.data.metrics || []);
      } catch (err) {
        console.log('API error, using fallback metrics:', err);
        // Fallback to default metrics if API fails
        setMetrics([]); // No fallback, just blank
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  console.log('Current state:', { loading, error, metricsLength: metrics.length });

  if (loading) {
    console.log('Showing loading skeleton');
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </CardContent>
        </Card>
      ))}
    </div>;
  }

  console.log('Rendering metrics cards:', metrics);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {defaultCards.map((card, index) => {
        const IconComponent = iconMap[card.icon] || Car;
        const metric = metrics[index];
        return (
          <Card key={index} className={`bg-gradient-to-br ${card.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {card.title}
              </CardTitle>
              <div className={`h-8 w-8 bg-gradient-to-r ${card.gradient} rounded-lg flex items-center justify-center`}>
                <IconComponent className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric ? metric.value : ''}
              </div>
              <div className="flex items-center text-sm min-h-[20px]">
                {metric ? (
                  metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  ) : null
                ) : null}
                <span className={metric ? (metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : '') : ''}>
                  {metric ? metric.change : ''}
                </span>
                {metric && <span className="text-gray-500 ml-1">from last month</span>}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
