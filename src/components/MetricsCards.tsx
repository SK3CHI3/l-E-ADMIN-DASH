
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Plane, Users, CalendarDays, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const metrics = [
  {
    title: "Total Fleet",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Car,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
  },
  {
    title: "Active Bookings",
    value: "89",
    change: "+8.2%",
    trend: "up",
    icon: CalendarDays,
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100",
  },
  {
    title: "Total Customers",
    value: "2,847",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
  },
  {
    title: "Monthly Revenue",
    value: "£224,500",
    change: "+18.1%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100",
  },
];

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className={`bg-gradient-to-br ${metric.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              {metric.title}
            </CardTitle>
            <div className={`h-8 w-8 bg-gradient-to-r ${metric.gradient} rounded-lg flex items-center justify-center`}>
              <metric.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="flex items-center text-sm">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                {metric.change}
              </span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
