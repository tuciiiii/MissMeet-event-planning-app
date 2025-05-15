
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, ChevronRight, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import EventCard from "@/components/events/EventCard";
import PlaceCard from "@/components/favorites/PlaceCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateEventForm from "@/components/events/CreateEventForm";
import { fetchEvents, fetchFavoritePlaces, getCurrentUser } from "@/services/mockData";
import { Event, Place } from "@/types/event";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // For demo purposes, we use the first user
  const currentUser = getCurrentUser();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [eventsData, placesData] = await Promise.all([
          fetchEvents(),
          fetchFavoritePlaces(currentUser.id)
        ]);
        
        setEvents(eventsData);
        setFavoritePlaces(placesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [currentUser.id]);

  const handleCreateEvent = (values: any) => {
    console.log("Creating event with values:", values);
    setCreateDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-girly-cream/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 mb-16 md:mb-0">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-girly-pink-light to-girly-purple-light rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="max-w-lg">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-girly-purple-dark mb-2">
                Plan Your Next Hangout! 
              </h1>
              <p className="text-girly-purple-dark/80 mb-4">
                Create events, coordinate with your friends and share your cute outfits all in one place!
              </p>
              <Button 
                onClick={() => setCreateDialogOpen(true)}
                className="bg-white text-girly-purple hover:bg-white/90 shadow-sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Event
              </Button>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 opacity-20 md:opacity-30">
              <CalendarIcon className="w-full h-full text-girly-purple-dark" />
            </div>
          </div>
        </section>
        
        {/* Upcoming Events Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold">Upcoming Events</h2>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="text-girly-pink">
                See All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
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
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events
                .filter(event => event.status !== 'past')
                .slice(0, 3)
                .map(event => (
                  <Link to={`/events/${event.id}`} key={event.id}>
                    <EventCard event={event} />
                  </Link>
                ))
              }
            </div>
          ) : (
            <div className="text-center py-12 bg-girly-pink/5 rounded-xl border border-dashed border-girly-pink/20">
              <h3 className="font-display font-medium text-lg text-girly-pink-dark">No upcoming events</h3>
              <p className="text-muted-foreground text-sm mt-1 mb-4">
                Create your first event to get started!
              </p>
              <Button 
                onClick={() => setCreateDialogOpen(true)}
                className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>
          )}
        </section>
        
        {/* Favorite Places Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold">Favorite Places</h2>
            <Link to="/favorites">
              <Button variant="ghost" size="sm" className="text-girly-pink">
                See All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-girly-pink/10">
                  <Skeleton className="h-36 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : favoritePlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {favoritePlaces.slice(0, 4).map(place => (
                <PlaceCard 
                  key={place.id} 
                  place={place} 
                  isFavorite={true}
                  onToggleFavorite={() => console.log("Toggle favorite for", place.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-girly-blue/5 rounded-xl border border-dashed border-girly-blue/20">
              <h3 className="font-display font-medium text-lg text-girly-blue-dark">No favorite places yet</h3>
              <p className="text-muted-foreground text-sm mt-1 mb-4">
                Add your favorite cafés, restaurants, and more!
              </p>
              <Link to="/favorites">
                <Button className="bg-gradient-to-r from-girly-blue to-girly-purple text-white">
                  Explore Places
                </Button>
              </Link>
            </div>
          )}
        </section>
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

export default Index;
