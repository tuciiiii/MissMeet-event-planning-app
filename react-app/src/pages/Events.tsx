
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Circle, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import EventCard from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateEventForm from "@/components/events/CreateEventForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchEvents } from "@/services/mockData";
import { Event } from "@/types/event";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, []);

  const upcomingEvents = events.filter(event => event.status !== 'past');
  const pastEvents = events.filter(event => event.status === 'past');
  
  const handleCreateEvent = (values: any) => {
    console.log("Creating event with values:", values);
    setCreateDialogOpen(false);
  };

  const renderEventList = (eventList: Event[]) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-girly-pink/10">
              <Skeleton className="h-36 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (eventList.length === 0) {
      return (
        <div className="text-center py-12 bg-girly-pink/5 rounded-xl border border-dashed border-girly-pink/20">
          <Calendar className="mx-auto h-12 w-12 text-girly-pink/40 mb-2" />
          <h3 className="font-display font-medium text-lg text-girly-pink-dark">No events found</h3>
          <p className="text-muted-foreground text-sm mt-1 mb-4">
            {eventList === upcomingEvents
              ? "Create your first event to get started!"
              : "You haven't had any events yet."}
          </p>
          {eventList === upcomingEvents && (
            <Button 
              onClick={() => setCreateDialogOpen(true)}
              className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventList.map(event => (
          <Link to={`/events/${event.id}`} key={event.id}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-girly-cream/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 mb-16 md:mb-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-2xl font-bold">Events</h1>
          <Button 
            onClick={() => setCreateDialogOpen(true)}
            className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="bg-girly-pink/10 p-1 rounded-full">
            <TabsTrigger 
              value="upcoming" 
              className="rounded-full data-[state=active]:bg-white relative px-4"
            >
              Upcoming
              {upcomingEvents.length > 0 && (
                <Circle className="h-2 w-2 absolute top-1 right-1 fill-girly-pink text-girly-pink" />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="rounded-full data-[state=active]:bg-white px-4"
            >
              Past
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4">
            {renderEventList(upcomingEvents)}
          </TabsContent>
          
          <TabsContent value="past" className="mt-4">
            {renderEventList(pastEvents)}
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Create Event Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Create New Event</DialogTitle>
          </DialogHeader>
          <CreateEventForm 
            onSubmit={handleCreateEvent} 
            onCancel={() => setCreateDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
