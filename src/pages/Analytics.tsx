import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, TrendingUp, Users, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import api from '../lib/api';

const Analytics = () => {
  const [analyticsStats, setAnalyticsStats] = useState<any[]>([]);
  const [utilizationData, setUtilizationData] = useState<any[]>([]);
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [bookingTrends, setBookingTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statsRes, utilRes, custRes, trendsRes] = await Promise.all([
          api.get('/admin/analytics/stats'),
          api.get('/admin/analytics/utilization'),
          api.get('/admin/analytics/customers'),
          api.get('/admin/analytics/booking-trends'),
        ]);
        setAnalyticsStats(statsRes.data.stats || []);
        setUtilizationData(utilRes.data.utilization || []);
        setCustomerData(custRes.data.customers || []);
        setBookingTrends(trendsRes.data.trends || []);
      } catch (err) {
        setError('Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-6">Loading analytics data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <DashboardHeader />
          <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-500 mt-1">Deep insights into business performance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="flex items-center space-x-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">{stat.change}</span>
                      <span className="text-gray-500">from last period</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Utilization</CardTitle>
                  <CardDescription>Daily fleet usage breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={utilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                      <Area type="monotone" dataKey="utilization" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="maintenance" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="available" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Acquisition</CardTitle>
                  <CardDescription>New vs returning customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={customerData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="new" stackId="a" fill="#8B5CF6" />
                      <Bar dataKey="returning" stackId="a" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Patterns</CardTitle>
                  <CardDescription>Peak booking hours throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bookingTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}`, 'Bookings']} />
                      <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Insights</CardTitle>
                  <CardDescription>Important business metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Peak Performance</h3>
                      <p className="text-sm text-blue-700">Friday evenings show highest booking rates at 95% fleet utilization</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">Customer Growth</h3>
                      <p className="text-sm text-green-700">Returning customer rate increased by 12% indicating strong satisfaction</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-2">Revenue Opportunity</h3>
                      <p className="text-sm text-purple-700">Weekend availability suggests potential for promotional campaigns</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Maintenance Alert</h3>
                      <p className="text-sm text-yellow-700">12% of fleet in maintenance on Sundays - consider scheduling optimization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
