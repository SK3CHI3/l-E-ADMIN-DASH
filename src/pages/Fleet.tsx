import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Car, Plane, Plus, Search, Edit, Trash2, MapPin, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '../lib/api';

const Fleet = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddHelicopterModalOpen, setIsAddHelicopterModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form state for cars
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: '',
    make: '',
    carType: '',
    transmission: '',
    fuelType: '',
    seats: '',
    pricePerDay: '',
    pricePerHour: '',
    description: '',
    location: '',
    withDriver: false,
    isAvailable: true,
    images: [] as string[]
  });

  // Form state for helicopters
  const [helicopterFormData, setHelicopterFormData] = useState({
    name: '',
    model: '',
    year: '',
    make: '',
    helicopterType: '',
    engineType: '',
    fuelCapacity: '',
    seats: '',
    maxSpeed: '',
    range: '',
    pricePerHour: '',
    pricePerDay: '',
    description: '',
    location: '',
    withPilot: false,
    isAvailable: true,
    images: [] as string[]
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/admin/cars');
        setVehicles(res.data.cars || []);
      } catch (err: any) {
        setError('Failed to fetch vehicles');
        // Fallback to sample data for testing
        setVehicles([
          {
            id: '1',
            name: 'Toyota Camry',
            model: 'Camry',
            year: '2023',
            make: 'Toyota',
            type: 'Sedan',
            category: 'car',
            status: 'Available',
            price: 'KSh 3,500/day',
            location: 'Nairobi CBD',
            carType: 'sedan',
            transmission: 'automatic',
            fuelType: 'petrol',
            seats: 5,
            pricePerDay: 3500,
            description: 'Comfortable sedan for city driving',
            withDriver: false,
            isAvailable: true
          },
          {
            id: '2',
            name: 'Land Rover Defender',
            model: 'Defender',
            year: '2022',
            make: 'Land Rover',
            type: 'SUV',
            category: 'car',
            status: 'Rented',
            price: 'KSh 8,000/day',
            location: 'Westlands',
            carType: 'suv',
            transmission: 'automatic',
            fuelType: 'diesel',
            seats: 7,
            pricePerDay: 8000,
            description: 'Luxury SUV for adventure',
            withDriver: true,
            isAvailable: false
          },
          {
            id: '3',
            name: 'Robinson R44',
            model: 'R44',
            year: '2021',
            make: 'Robinson',
            type: 'Helicopter',
            category: 'helicopter',
            status: 'Available',
            price: 'KSh 45,000/hour',
            location: 'Wilson Airport',
            helicopterType: 'light',
            engineType: 'piston',
            fuelCapacity: '200L',
            seats: 4,
            maxSpeed: '240 km/h',
            range: '600 km',
            pricePerHour: 45000,
            description: 'Light helicopter for scenic flights',
            withPilot: true,
            isAvailable: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Rented': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHelicopterInputChange = (field: string, value: string | number | boolean) => {
    setHelicopterFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const carData = {
        ...formData,
        pricePerDay: parseFloat(formData.pricePerDay),
        pricePerHour: parseFloat(formData.pricePerHour),
        seats: parseInt(formData.seats),
        year: parseInt(formData.year)
      };

      const response = await api.post('/admin/cars', carData);
      
      toast({
        title: "Success!",
        description: "Vehicle added successfully to the fleet.",
      });

      // Add the new vehicle to the list
      setVehicles(prev => [...prev, response.data.car]);
      
      // Reset form and close modal
      setFormData({
        name: '',
        model: '',
        year: '',
        make: '',
        carType: '',
        transmission: '',
        fuelType: '',
        seats: '',
        pricePerDay: '',
        pricePerHour: '',
        description: '',
        location: '',
        withDriver: false,
        isAvailable: true,
        images: []
      });
      setIsAddModalOpen(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to add vehicle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelicopterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const helicopterData = {
        ...helicopterFormData,
        pricePerDay: parseFloat(helicopterFormData.pricePerDay),
        pricePerHour: parseFloat(helicopterFormData.pricePerHour),
        seats: parseInt(helicopterFormData.seats),
        year: parseInt(helicopterFormData.year),
        fuelCapacity: parseFloat(helicopterFormData.fuelCapacity),
        maxSpeed: parseFloat(helicopterFormData.maxSpeed),
        range: parseFloat(helicopterFormData.range)
      };

      const response = await api.post('/admin/helicopters', helicopterData);
      
      toast({
        title: "Success!",
        description: "Helicopter added successfully to the fleet.",
      });

      // Add the new helicopter to the list
      setVehicles(prev => [...prev, response.data.helicopter]);
      
      // Reset form and close modal
      setHelicopterFormData({
        name: '',
        model: '',
        year: '',
        make: '',
        helicopterType: '',
        engineType: '',
        fuelCapacity: '',
        seats: '',
        maxSpeed: '',
        range: '',
        pricePerHour: '',
        pricePerDay: '',
        description: '',
        location: '',
        withPilot: false,
        isAvailable: true,
        images: []
      });
      setIsAddHelicopterModalOpen(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to add helicopter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.category?.toLowerCase().includes(searchTerm.toLowerCase())
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
              
              <div className="flex space-x-3">
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Car className="h-4 w-4 mr-2" />
                      Add Car
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Car</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to add a new car to your fleet.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Vehicle Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="e.g., Toyota Camry"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="model">Model *</Label>
                          <Input
                            id="model"
                            value={formData.model}
                            onChange={(e) => handleInputChange('model', e.target.value)}
                            placeholder="e.g., Camry"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="year">Year *</Label>
                          <Input
                            id="year"
                            type="number"
                            value={formData.year}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                            placeholder="2023"
                            min="1900"
                            max="2030"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="make">Make *</Label>
                          <Input
                            id="make"
                            value={formData.make}
                            onChange={(e) => handleInputChange('make', e.target.value)}
                            placeholder="e.g., Toyota"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="seats">Seats *</Label>
                          <Input
                            id="seats"
                            type="number"
                            value={formData.seats}
                            onChange={(e) => handleInputChange('seats', e.target.value)}
                            placeholder="5"
                            min="1"
                            max="20"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="carType">Vehicle Type *</Label>
                          <Select value={formData.carType} onValueChange={(value) => handleInputChange('carType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sedan">Sedan</SelectItem>
                              <SelectItem value="suv">SUV</SelectItem>
                              <SelectItem value="hatchback">Hatchback</SelectItem>
                              <SelectItem value="wagon">Wagon</SelectItem>
                              <SelectItem value="coupe">Coupe</SelectItem>
                              <SelectItem value="convertible">Convertible</SelectItem>
                              <SelectItem value="pickup">Pickup</SelectItem>
                              <SelectItem value="van">Van</SelectItem>
                              <SelectItem value="luxury">Luxury</SelectItem>
                              <SelectItem value="sports">Sports</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="transmission">Transmission *</Label>
                          <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transmission" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="automatic">Automatic</SelectItem>
                              <SelectItem value="manual">Manual</SelectItem>
                              <SelectItem value="cvt">CVT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="fuelType">Fuel Type *</Label>
                          <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="petrol">Petrol</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="electric">Electric</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pricePerDay">Price per Day (KSh) *</Label>
                          <Input
                            id="pricePerDay"
                            type="number"
                            value={formData.pricePerDay}
                            onChange={(e) => handleInputChange('pricePerDay', e.target.value)}
                            placeholder="3500"
                            min="0"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pricePerHour">Price per Hour (KSh)</Label>
                          <Input
                            id="pricePerHour"
                            type="number"
                            value={formData.pricePerHour}
                            onChange={(e) => handleInputChange('pricePerHour', e.target.value)}
                            placeholder="500"
                            min="0"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="e.g., Nairobi CBD"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Describe the vehicle features, condition, etc."
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="withDriver"
                            checked={formData.withDriver}
                            onChange={(e) => handleInputChange('withDriver', e.target.checked)}
                            className="rounded"
                          />
                          <Label htmlFor="withDriver">Available with driver</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isAvailable"
                            checked={formData.isAvailable}
                            onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
                            className="rounded"
                          />
                          <Label htmlFor="isAvailable">Available for booking</Label>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Adding...' : 'Add Car'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isAddHelicopterModalOpen} onOpenChange={setIsAddHelicopterModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                      <Plane className="h-4 w-4 mr-2" />
                      Add Helicopter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Helicopter</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to add a new helicopter to your fleet.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleHelicopterSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="helicopter-name">Helicopter Name *</Label>
                          <Input
                            id="helicopter-name"
                            value={helicopterFormData.name}
                            onChange={(e) => handleHelicopterInputChange('name', e.target.value)}
                            placeholder="e.g., Robinson R44"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="helicopter-model">Model *</Label>
                          <Input
                            id="helicopter-model"
                            value={helicopterFormData.model}
                            onChange={(e) => handleHelicopterInputChange('model', e.target.value)}
                            placeholder="e.g., R44"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="helicopter-year">Year *</Label>
                          <Input
                            id="helicopter-year"
                            type="number"
                            value={helicopterFormData.year}
                            onChange={(e) => handleHelicopterInputChange('year', e.target.value)}
                            placeholder="2021"
                            min="1900"
                            max="2030"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="helicopter-make">Make *</Label>
                          <Input
                            id="helicopter-make"
                            value={helicopterFormData.make}
                            onChange={(e) => handleHelicopterInputChange('make', e.target.value)}
                            placeholder="e.g., Robinson"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="helicopter-seats">Seats *</Label>
                          <Input
                            id="helicopter-seats"
                            type="number"
                            value={helicopterFormData.seats}
                            onChange={(e) => handleHelicopterInputChange('seats', e.target.value)}
                            placeholder="4"
                            min="1"
                            max="20"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="helicopter-type">Helicopter Type *</Label>
                          <Select value={helicopterFormData.helicopterType} onValueChange={(value) => handleHelicopterInputChange('helicopterType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="heavy">Heavy</SelectItem>
                              <SelectItem value="twin-engine">Twin Engine</SelectItem>
                              <SelectItem value="luxury">Luxury</SelectItem>
                              <SelectItem value="utility">Utility</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="engine-type">Engine Type *</Label>
                          <Select value={helicopterFormData.engineType} onValueChange={(value) => handleHelicopterInputChange('engineType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select engine type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="piston">Piston</SelectItem>
                              <SelectItem value="turbine">Turbine</SelectItem>
                              <SelectItem value="turboshaft">Turboshaft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="fuel-capacity">Fuel Capacity (L) *</Label>
                          <Input
                            id="fuel-capacity"
                            type="number"
                            value={helicopterFormData.fuelCapacity}
                            onChange={(e) => handleHelicopterInputChange('fuelCapacity', e.target.value)}
                            placeholder="200"
                            min="0"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="max-speed">Max Speed (km/h) *</Label>
                          <Input
                            id="max-speed"
                            type="number"
                            value={helicopterFormData.maxSpeed}
                            onChange={(e) => handleHelicopterInputChange('maxSpeed', e.target.value)}
                            placeholder="240"
                            min="0"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="range">Range (km) *</Label>
                          <Input
                            id="range"
                            type="number"
                            value={helicopterFormData.range}
                            onChange={(e) => handleHelicopterInputChange('range', e.target.value)}
                            placeholder="600"
                            min="0"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="helicopter-location">Location *</Label>
                          <Input
                            id="helicopter-location"
                            value={helicopterFormData.location}
                            onChange={(e) => handleHelicopterInputChange('location', e.target.value)}
                            placeholder="e.g., Wilson Airport"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="helicopter-price-hour">Price per Hour (KSh) *</Label>
                          <Input
                            id="helicopter-price-hour"
                            type="number"
                            value={helicopterFormData.pricePerHour}
                            onChange={(e) => handleHelicopterInputChange('pricePerHour', e.target.value)}
                            placeholder="45000"
                            min="0"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="helicopter-price-day">Price per Day (KSh)</Label>
                          <Input
                            id="helicopter-price-day"
                            type="number"
                            value={helicopterFormData.pricePerDay}
                            onChange={(e) => handleHelicopterInputChange('pricePerDay', e.target.value)}
                            placeholder="300000"
                            min="0"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="helicopter-description">Description</Label>
                        <Textarea
                          id="helicopter-description"
                          value={helicopterFormData.description}
                          onChange={(e) => handleHelicopterInputChange('description', e.target.value)}
                          placeholder="Describe the helicopter features, capabilities, etc."
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="withPilot"
                            checked={helicopterFormData.withPilot}
                            onChange={(e) => handleHelicopterInputChange('withPilot', e.target.checked)}
                            className="rounded"
                          />
                          <Label htmlFor="withPilot">Available with pilot</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="helicopter-available"
                            checked={helicopterFormData.isAvailable}
                            onChange={(e) => handleHelicopterInputChange('isAvailable', e.target.checked)}
                            className="rounded"
                          />
                          <Label htmlFor="helicopter-available">Available for booking</Label>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddHelicopterModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Adding...' : 'Add Helicopter'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
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
              {loading ? (
                <div>Loading vehicles...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : filteredVehicles.length === 0 ? (
                <div>No vehicles found.</div>
              ) : (
                filteredVehicles.map((vehicle) => (
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
                      <CardTitle className="text-lg">{vehicle.name || vehicle.model}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {vehicle.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Type:</span>
                          <Badge variant="outline">{vehicle.carType || vehicle.helicopterType || vehicle.type}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Price:</span>
                          <span className="font-semibold text-blue-600">
                            {vehicle.category === 'helicopter' 
                              ? `KSh ${vehicle.pricePerHour || vehicle.price}/hour`
                              : `KSh ${vehicle.pricePerDay || vehicle.price}/day`
                            }
                          </span>
                        </div>
                        {vehicle.withDriver && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Driver:</span>
                            <Badge variant="outline" className="bg-green-100 text-green-800">With Driver</Badge>
                          </div>
                        )}
                        {vehicle.withPilot && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Pilot:</span>
                            <Badge variant="outline" className="bg-green-100 text-green-800">With Pilot</Badge>
                          </div>
                        )}
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
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Fleet;
