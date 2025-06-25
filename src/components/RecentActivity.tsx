
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Plane, User, CreditCard, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'booking',
    title: 'New helicopter booking: Bell 407 for Peter Mwangi',
    time: '2 minutes ago',
    status: 'confirmed',
    icon: Plane,
    color: 'bg-purple-500',
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment received: KSh 480,000 from Grace Wanjiku (Helicopter)',
    time: '15 minutes ago',
    status: 'completed',
    icon: CreditCard,
    color: 'bg-green-500',
  },
  {
    id: 3,
    type: 'booking',
    title: 'New car booking: Toyota Prado for John Kamau',
    time: '1 hour ago',
    status: 'confirmed',
    icon: Car,
    color: 'bg-blue-500',
  },
  {
    id: 4,
    type: 'user',
    title: 'New customer registration: Mary Njeri',
    time: '2 hours ago',
    status: 'verified',
    icon: User,
    color: 'bg-indigo-500',
  },
  {
    id: 5,
    type: 'booking',
    title: 'Helicopter booking completed: Robinson R44 for David Kiptoo',
    time: '3 hours ago',
    status: 'completed',
    icon: Plane,
    color: 'bg-orange-500',
  },
];

export function RecentActivity() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className={`${activity.color} p-2 rounded-lg`}>
                <activity.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <Badge 
                variant={activity.status === 'completed' || activity.status === 'confirmed' || activity.status === 'verified' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
