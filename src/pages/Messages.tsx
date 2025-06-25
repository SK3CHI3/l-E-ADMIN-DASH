
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, Reply, Archive, Star, Clock } from 'lucide-react';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const messages = [
    { 
      id: 1, 
      customer: 'John Smith', 
      subject: 'Issue with BMW 7 Series booking', 
      preview: 'Hi, I had an issue with my recent booking. The car had a minor scratch...', 
      time: '2 hours ago', 
      status: 'unread', 
      priority: 'high' 
    },
    { 
      id: 2, 
      customer: 'Sarah Johnson', 
      subject: 'Excellent service feedback', 
      preview: 'I wanted to thank you for the exceptional service. The Mercedes was perfect...', 
      time: '5 hours ago', 
      status: 'read', 
      priority: 'low' 
    },
    { 
      id: 3, 
      customer: 'Mike Wilson', 
      subject: 'Booking modification request', 
      preview: 'Could I please extend my rental period by 2 days? I will pay the additional...', 
      time: '1 day ago', 
      status: 'replied', 
      priority: 'medium' 
    },
    { 
      id: 4, 
      customer: 'Emily Davis', 
      subject: 'Question about luxury package', 
      preview: 'What does the luxury package include? I am interested in upgrading...', 
      time: '2 days ago', 
      status: 'unread', 
      priority: 'medium' 
    },
    { 
      id: 5, 
      customer: 'David Brown', 
      subject: 'Payment confirmation needed', 
      preview: 'I need a receipt for my recent payment. Can you please send it to...', 
      time: '3 days ago', 
      status: 'archived', 
      priority: 'low' 
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || message.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Messages', count: messages.length },
    { value: 'unread', label: 'Unread', count: messages.filter(m => m.status === 'unread').length },
    { value: 'replied', label: 'Replied', count: messages.filter(m => m.status === 'replied').length },
    { value: 'archived', label: 'Archived', count: messages.filter(m => m.status === 'archived').length },
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
                <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                <p className="text-gray-500 mt-1">Customer communications and support</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filter Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {filterOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={selectedFilter === option.value ? "default" : "ghost"}
                        className="w-full justify-between"
                        onClick={() => setSelectedFilter(option.value)}
                      >
                        <span>{option.label}</span>
                        <Badge variant="secondary">{option.count}</Badge>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:w-3/4 space-y-4">
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredMessages.map((message) => (
                    <Card key={message.id} className={`hover:shadow-lg transition-shadow cursor-pointer ${message.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{message.customer}</h3>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {message.time}
                                </p>
                              </div>
                            </div>
                            <h4 className="font-medium text-gray-800 mb-1">{message.subject}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">{message.preview}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                              <Star className={`h-4 w-4 ${getPriorityColor(message.priority)}`} />
                              <Badge className={getStatusColor(message.status)}>
                                {message.status}
                              </Badge>
                            </div>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline">
                                <Reply className="h-4 w-4 mr-1" />
                                Reply
                              </Button>
                              <Button size="sm" variant="outline">
                                <Archive className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredMessages.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Messages;
