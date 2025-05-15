
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

const EventCard = ({ event, onClick }: EventCardProps) => {
  // Calculate the date to display
  const displayDate = event.confirmedDate
    ? new Date(event.confirmedDate)
    : event.dateOptions.length > 0
      ? new Date(event.dateOptions[0].date)
      : new Date();

  // Determine status class
  const statusColor = {
    planning: "bg-girly-blue-light text-girly-blue-dark",
    confirmed: "bg-girly-purple-light text-girly-purple-dark",
    past: "bg-gray-200 text-gray-600",
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg border-girly-pink/10"
      onClick={onClick}
    >
      <div className="relative h-36 bg-gradient-to-r from-girly-pink/30 to-girly-purple/30">
        {event.place?.image ? (
          <img 
            src={event.place.image} 
            alt={event.place.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-lg font-medium text-girly-pink-dark/50">
              {event.place?.name || event.title}
            </span>
          </div>
        )}
        <Badge className={`absolute top-3 right-3 ${statusColor[event.status]}`}>
          {event.status === 'planning' ? 'Planning' : 
           event.status === 'confirmed' ? 'Confirmed' : 'Past'}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-display font-semibold text-lg mb-2 truncate">{event.title}</h3>
        
        <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
          {event.place && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-girly-pink" />
              <span className="truncate">{event.place.name}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-girly-pink" />
            <span>{format(displayDate, 'EEE, MMM d')}</span>
          </div>
          
          {event.dateOptions[0]?.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-girly-pink" />
              <span>{event.dateOptions[0].time}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-girly-pink" />
              <span>{event.participants.length} going</span>
            </div>
            
            <div className="flex -space-x-2">
              {[...Array(Math.min(3, event.participants.length))].map((_, i) => (
                <Avatar key={i} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                  <AvatarFallback className="text-xs bg-girly-pink-light text-girly-pink-dark">
                    {String.fromCharCode(65 + i)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {event.participants.length > 3 && (
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarFallback className="text-xs bg-girly-blue-light text-girly-blue-dark">
                    +{event.participants.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
