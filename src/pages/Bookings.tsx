
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Search, Eye, Edit, Car, User, Clock } from 'lucide-react';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bookings = [
    { id: 'BK001', customer: 'John Smith', vehicle: 'BMW 7 Series', startDate: '2024-06-26', endDate: '2024-06-30', status: 'Active', amount: '£600' },
    { id: 'BK002', customer: 'Sarah Johnson', vehicle: 'Mercedes S-Class', startDate: '2024-06-25', endDate: '2024-06-28', status: 'Completed', amount: '£540' },
    { id: 'BK003', customer: 'Mike Wilson', vehicle: 'Toyota Camry', startDate: '2024-06-27', endDate: '2024-07-01', status: 'Pending', amount: '£180' },
    { id: 'BK004', customer: 'Emily Davis', vehicle: 'Audi A8', startDate: '2024-06-28', endDate: '2024-07-02', status: 'Confirmed', amount: '£640' },
    { id: 'BK005', customer: 'David Brown', vehicle: 'Ford Focus', startDate: '2024-06-26', endDate: '2024-06-29', status: 'Active', amount: '£105' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <DashboardHeader />
          <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
                <p className="text-gray-500 mt-1">Manage customer reservations</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-lg">{booking.id}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Customer:</span>
                        <span className="font-medium">{booking.customer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Vehicle:</span>
                        <span className="font-medium">{booking.vehicle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Duration:</span>
                        <span className="font-medium">{booking.startDate} - {booking.endDate}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-semibold text-blue-600">{booking.amount}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Bookings;
