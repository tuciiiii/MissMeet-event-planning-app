
import { useState } from "react";
import { Bell, Calendar, Clock, Heart, MapPin, Star, Trash, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'event' | 'friend' | 'place' | 'outfit' | 'system';
  message: string;
  time: string;
  read: boolean;
  data?: {
    eventId?: string;
    placeId?: string;
    userId?: string;
    image?: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'event',
    message: 'Olivia invited you to "Movie Night"',
    time: '1 hour ago',
    read: false,
    data: { eventId: 'e2' }
  },
  {
    id: 'n2',
    type: 'outfit',
    message: 'Emma and 2 others reacted to your outfit',
    time: '3 hours ago',
    read: false,
    data: { eventId: 'e1' }
  },
  {
    id: 'n3',
    type: 'place',
    message: 'New event at Aroma Café: Poetry Night',
    time: '5 hours ago',
    read: true,
    data: { placeId: 'p1' }
  },
  {
    id: 'n4',
    type: 'friend',
    message: 'Isabella is now using MissMeet',
    time: '1 day ago',
    read: true,
    data: { userId: 'u4' }
  },
  {
    id: 'n5',
    type: 'event',
    message: 'Your event "Coffee & Catch Up" is tomorrow',
    time: '1 day ago',
    read: true,
    data: { eventId: 'e1' }
  },
  {
    id: 'n6',
    type: 'place',
    message: 'New dessert menu at Sweet Treats Bakery',
    time: '2 days ago',
    read: true,
    data: { placeId: 'p5' }
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'event':
      return <Calendar className="h-5 w-5 text-girly-pink" />;
    case 'friend':
      return <User className="h-5 w-5 text-girly-purple" />;
    case 'place':
      return <MapPin className="h-5 w-5 text-girly-blue" />;
    case 'outfit':
      return <Star className="h-5 w-5 text-amber-400" />;
    case 'system':
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };
  
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-girly-cream/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 mb-16 md:mb-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="font-display text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <div className="ml-2 bg-girly-pink text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount}
              </div>
            )}
          </div>
          
          <Button 
            variant="outline"
            className="text-sm border-girly-pink/30 hover:bg-girly-pink/10 hover:text-girly-pink-dark"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
        
        <div className="bg-white rounded-xl border border-girly-pink/10 shadow-sm overflow-hidden">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground/40 mb-2" />
              <h3 className="font-display font-medium text-lg">No notifications</h3>
              <p className="text-muted-foreground text-sm mt-1">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div>
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div className={cn(
                    "flex items-start p-4 hover:bg-girly-pink/5 transition-colors",
                    !notification.read && "bg-girly-pink/5"
                  )}>
                    <div className="h-10 w-10 rounded-full bg-white border border-girly-pink/20 flex items-center justify-center mr-3">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm",
                        !notification.read && "font-medium"
                      )}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-girly-pink/10"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
