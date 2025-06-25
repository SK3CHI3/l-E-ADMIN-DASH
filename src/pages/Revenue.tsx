
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Revenue = () => {
  const revenueStats = [
    { title: 'Total Revenue', value: '£1,285,200', change: '+18%', icon: DollarSign },
    { title: 'Monthly Revenue', value: '£152,800', change: '+12%', icon: CreditCard },
    { title: 'Average Booking', value: '£820', change: '+5%', icon: TrendingUp },
    { title: 'Revenue Growth', value: '24%', change: '+3%', icon: Calendar },
  ];

  const monthlyData = [
    { month: 'Jan', carRevenue: 42000, helicopterRevenue: 85000, bookings: 125 },
    { month: 'Feb', carRevenue: 38000, helicopterRevenue: 92000, bookings: 118 },
    { month: 'Mar', carRevenue: 45000, helicopterRevenue: 105000, bookings: 142 },
    { month: 'Apr', carRevenue: 48000, helicopterRevenue: 112000, bookings: 156 },
    { month: 'May', carRevenue: 52000, helicopterRevenue: 125000, bookings: 168 },
    { month: 'Jun', carRevenue: 55000, helicopterRevenue: 135000, bookings: 175 },
  ];

  const vehicleTypeRevenue = [
    { name: 'Luxury Cars', value: 285000, color: '#8B5CF6' },
    { name: 'Premium Cars', value: 150000, color: '#3B82F6' },
    { name: 'Economy Cars', value: 50200, color: '#10B981' },
    { name: 'Executive Helicopters', value: 420000, color: '#F59E0B' },
    { name: 'Light Helicopters', value: 180000, color: '#EF4444' },
    { name: 'Twin Engine Helicopters', value: 320000, color: '#8B5CF6' },
  ];

  const topPerformers = [
    { vehicle: 'Bell 407 (Helicopter)', revenue: '£125,600', bookings: 42 },
    { vehicle: 'Eurocopter AS350', revenue: '£98,300', bookings: 38 },
    { vehicle: 'BMW 7 Series', revenue: '£45,600', bookings: 142 },
    { vehicle: 'Robinson R44', revenue: '£42,300', bookings: 65 },
    { vehicle: 'Mercedes S-Class', revenue: '£38,900', bookings: 128 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <DashboardHeader />
          <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
                <p className="text-gray-500 mt-1">Track financial performance across cars and helicopters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {revenueStats.map((stat, index) => (
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
                      <span className="text-gray-500">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                  <CardDescription>Revenue trends for cars vs helicopters</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [`£${value.toLocaleString()}`, name]} />
                      <Line type="monotone" dataKey="carRevenue" stroke="#3B82F6" strokeWidth={3} name="Car Revenue" />
                      <Line type="monotone" dataKey="helicopterRevenue" stroke="#F59E0B" strokeWidth={3} name="Helicopter Revenue" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Vehicle Type</CardTitle>
                  <CardDescription>Distribution across all vehicle categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={vehicleTypeRevenue}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {vehicleTypeRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`£${value.toLocaleString()}`, 'Revenue']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Bookings</CardTitle>
                  <CardDescription>Total bookings across all vehicles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Vehicles</CardTitle>
                  <CardDescription>Highest revenue generating vehicles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((vehicle, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{vehicle.vehicle}</p>
                            <p className="text-sm text-gray-500">{vehicle.bookings} bookings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{vehicle.revenue}</p>
                        </div>
                      </div>
                    ))}
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

export default Revenue;
