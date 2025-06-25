
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Gift, Award, TrendingUp } from 'lucide-react';

const Loyalty = () => {
  const loyaltyStats = [
    { title: 'Total Members', value: '2,847', change: '+12%', icon: Trophy },
    { title: 'Points Issued', value: '1.2M', change: '+8%', icon: Star },
    { title: 'Rewards Redeemed', value: '456', change: '+15%', icon: Gift },
    { title: 'Active Tiers', value: '4', change: '0%', icon: Award },
  ];

  const topMembers = [
    { name: 'John Smith', points: 15420, tier: 'Platinum', totalSpent: '£12,500' },
    { name: 'Emily Davis', points: 12890, tier: 'Gold', totalSpent: '£9,800' },
    { name: 'Sarah Johnson', points: 10560, tier: 'Gold', totalSpent: '£8,200' },
    { name: 'Mike Wilson', points: 8790, tier: 'Silver', totalSpent: '£6,500' },
    { name: 'David Brown', points: 7320, tier: 'Silver', totalSpent: '£5,800' },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <DashboardHeader />
          <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Loyalty Program</h1>
                <p className="text-gray-500 mt-1">Manage customer rewards and loyalty points</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Gift className="h-4 w-4 mr-2" />
                Create Reward
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loyaltyStats.map((stat, index) => (
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
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>Top Loyalty Members</span>
                  </CardTitle>
                  <CardDescription>Members with highest point balances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.points.toLocaleString()} points</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getTierColor(member.tier)}>
                            {member.tier}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">{member.totalSpent}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    <span>Tier Benefits</span>
                  </CardTitle>
                  <CardDescription>Current loyalty tier structure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-purple-900">Platinum Tier</h3>
                        <Badge className="bg-purple-100 text-purple-800">15,000+ points</Badge>
                      </div>
                      <ul className="text-sm text-purple-700 mt-2 space-y-1">
                        <li>• 20% discount on all rentals</li>
                        <li>• Priority customer support</li>
                        <li>• Free upgrades available</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-yellow-900">Gold Tier</h3>
                        <Badge className="bg-yellow-100 text-yellow-800">10,000+ points</Badge>
                      </div>
                      <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                        <li>• 15% discount on all rentals</li>
                        <li>• Extended rental periods</li>
                        <li>• Birthday bonus points</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-500">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Silver Tier</h3>
                        <Badge className="bg-gray-100 text-gray-800">5,000+ points</Badge>
                      </div>
                      <ul className="text-sm text-gray-700 mt-2 space-y-1">
                        <li>• 10% discount on rentals</li>
                        <li>• Early access to new vehicles</li>
                        <li>• Quarterly bonus points</li>
                      </ul>
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

export default Loyalty;
