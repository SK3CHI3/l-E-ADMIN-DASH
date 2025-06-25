
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Car, Plane, Plus, Search, Edit, Trash2, MapPin } from 'lucide-react';

const Fleet = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const vehicles = [
    { id: 1, model: 'Toyota Land Cruiser V8', type: 'Luxury SUV', category: 'car', status: 'Available', location: 'Nairobi CBD', price: 'KSh 15,000/day', image: '/placeholder.svg' },
    { id: 2, model: 'Mercedes Benz E-Class', type: 'Luxury Car', category: 'car', status: 'Rented', location: 'Westlands', price: 'KSh 12,000/day', image: '/placeholder.svg' },
    { id: 3, model: 'Toyota Corolla', type: 'Economy Car', category: 'car', status: 'Available', location: 'Mombasa', price: 'KSh 4,500/day', image: '/placeholder.svg' },
    { id: 4, model: 'Range Rover Sport', type: 'Luxury SUV', category: 'car', status: 'Maintenance', location: 'Karen', price: 'KSh 18,000/day', image: '/placeholder.svg' },
    { id: 5, model: 'Nissan Note', type: 'Economy Car', category: 'car', status: 'Available', location: 'Kisumu', price: 'KSh 3,500/day', image: '/placeholder.svg' },
    { id: 6, model: 'BMW X5', type: 'Luxury SUV', category: 'car', status: 'Available', location: 'Nairobi CBD', price: 'KSh 16,000/day', image: '/placeholder.svg' },
    { id: 7, model: 'Robinson R44', type: 'Light Helicopter', category: 'helicopter', status: 'Available', location: 'Wilson Airport', price: 'KSh 120,000/hour', image: '/placeholder.svg' },
    { id: 8, model: 'Eurocopter AS350', type: 'Twin Engine Helicopter', category: 'helicopter', status: 'Available', location: 'JKIA', price: 'KSh 250,000/hour', image: '/placeholder.svg' },
    { id: 9, model: 'Bell 407', type: 'Executive Helicopter', category: 'helicopter', status: 'Rented', location: 'Mombasa Airport', price: 'KSh 320,000/hour', image: '/placeholder.svg' },
    { id: 10, model: 'Airbus H125', type: 'Single Engine Helicopter', category: 'helicopter', status: 'Maintenance', location: 'Wilson Airport', price: 'KSh 280,000/hour', image: '/placeholder.svg' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Rented': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
                <p className="text-gray-500 mt-1">Manage your cars and helicopters</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      {vehicle.category === 'car' ? (
                        <Car className="h-8 w-8 text-blue-600" />
                      ) : (
                        <Plane className="h-8 w-8 text-purple-600" />
                      )}
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{vehicle.model}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {vehicle.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Type:</span>
                        <Badge variant="outline">{vehicle.type}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Price:</span>
                        <span className="font-semibold text-blue-600">{vehicle.price}</span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default Fleet;
