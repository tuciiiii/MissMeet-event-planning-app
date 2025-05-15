
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Camera, 
  Clock, 
  MapPin, 
  MoreVertical, 
  Pencil, 
  Share, 
  Trash, 
  Users 
} from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import OutfitGallery from "@/components/events/OutfitGallery";
import MoodBoard from "@/components/events/MoodBoard";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchEvent } from "@/services/mockData";
import { Event } from "@/types/event";
import { useToast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadOutfitOpen, setUploadOutfitOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const eventData = await fetchEvent(id);
        if (eventData) {
          setEvent(eventData);
        }
      } catch (error) {
        console.error("Error loading event:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load event details"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadEvent();
  }, [id, toast]);

  const handleAddOutfit = () => {
    setUploadOutfitOpen(true);
  };
  
  const handleAddToMoodBoard = (imageUrl: string) => {
    if (!event) return;
    
    // In a real app, this would be an API call to update the event
    const newImage = {
      id: `m${event.moodboard.length + 1}`,
      imageUrl,
      addedBy: "u1" // Current user ID
    };
    
    setEvent({
      ...event,
      moodboard: [...event.moodboard, newImage]
    });
  };
  
  const handleRemoveFromMoodBoard = (id: string) => {
    if (!event) return;
    
    setEvent({
      ...event,
      moodboard: event.moodboard.filter(image => image.id !== id)
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-girly-cream/30">
        <Navigation />
        
        <main className="container mx-auto px-4 py-6 mb-16 md:mb-0">
          <div className="mb-4">
            <Skeleton className="h-8 w-40" />
          </div>
          
          <div className="rounded-xl overflow-hidden mb-6">
            <Skeleton className="h-48 w-full" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen bg-girly-cream/30">
        <Navigation />
        
        <main className="container mx-auto px-4 py-6 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/events">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </main>
      </div>
    );
  }
  
  // Determine display date and time
  const displayDate = event.confirmedDate
    ? new Date(event.confirmedDate)
    : event.dateOptions.length > 0
      ? new Date(event.dateOptions[0].date)
      : new Date();
  
  const displayTime = event.dateOptions[0]?.time || "";
  
  // Determine status badge class
  const statusColor = {
    planning: "bg-girly-blue-light text-girly-blue-dark",
    confirmed: "bg-girly-purple-light text-girly-purple-dark",
    past: "bg-gray-200 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-girly-cream/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 mb-16 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <Link to="/events">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full border-girly-pink/30 hover:bg-girly-pink/10"
            >
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full h-8 w-8 border-girly-pink/30 hover:bg-girly-pink/10"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl">
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Event
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500">
                  <Trash className="h-4 w-4 mr-2" />
                  Cancel Event
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Header */}
        <div className="rounded-xl overflow-hidden mb-6 relative">
          <div className="h-48 bg-gradient-to-r from-girly-pink/30 to-girly-purple/30">
            {event.place?.image ? (
              <img 
                src={event.place.image} 
                alt={event.place.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-display font-medium text-girly-purple/50">
                  {event.title}
                </span>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 flex items-center">
            <Badge className={`mr-2 ${statusColor[event.status]}`}>
              {event.status === 'planning' ? 'Planning' : 
               event.status === 'confirmed' ? 'Confirmed' : 'Past'}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details */}
            <div className="bg-white rounded-xl border border-girly-pink/10 shadow-sm p-6">
              <h1 className="font-display text-2xl font-bold mb-2">{event.title}</h1>
              
              {event.description && (
                <p className="text-muted-foreground mb-4">{event.description}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-girly-pink/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-girly-pink" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{format(displayDate, 'EEEE, MMMM d, yyyy')}</p>
                  </div>
                </div>
                
                {displayTime && (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-girly-pink/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-girly-pink" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{displayTime}</p>
                    </div>
                  </div>
                )}
                
                {event.place && (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-girly-pink/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-girly-pink" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{event.place.name}</p>
                      {event.place.location && (
                        <p className="text-sm text-muted-foreground">{event.place.location}</p>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-girly-pink/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-girly-pink" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <div className="flex items-center mt-1">
                      <div className="flex -space-x-2 mr-2">
                        {event.participants.slice(0, 4).map((userId, index) => (
                          <Avatar key={userId} className="h-6 w-6 border-2 border-white">
                            <AvatarImage src={`https://i.pravatar.cc/100?img=${index + 10}`} />
                            <AvatarFallback className="bg-girly-pink-light text-girly-pink-dark text-xs">
                              {String.fromCharCode(65 + index)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-sm">
                        {event.participants.length} {event.participants.length === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {(event.status === 'planning' || event.status === 'confirmed') && (
                <Button 
                  className="w-full bg-gradient-to-r from-girly-pink to-girly-purple text-white"
                >
                  {event.status === 'planning' ? 'Vote on Dates' : 'I\'m Going!'}
                </Button>
              )}
            </div>
            
            {/* Tabs for Outfits and Mood Board */}
            <Tabs defaultValue="outfits" className="bg-white rounded-xl border border-girly-pink/10 shadow-sm p-6">
              <TabsList className="bg-girly-pink/10 p-1 rounded-full mb-4">
                <TabsTrigger 
                  value="outfits" 
                  className="rounded-full data-[state=active]:bg-white px-4"
                >
                  Outfit Gallery
                </TabsTrigger>
                <TabsTrigger 
                  value="moodboard" 
                  className="rounded-full data-[state=active]:bg-white px-4"
                >
                  Mood Board
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="outfits">
                <OutfitGallery 
                  outfits={event.outfits} 
                  onAddOutfit={handleAddOutfit} 
                />
              </TabsContent>
              
              <TabsContent value="moodboard">
                <MoodBoard 
                  images={event.moodboard}
                  onAddImage={handleAddToMoodBoard}
                  onRemoveImage={handleRemoveFromMoodBoard}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            {/* Polls */}
            {event.polls && event.polls.length > 0 && (
              <div className="bg-white rounded-xl border border-girly-pink/10 shadow-sm p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Polls</h3>
                
                {event.polls.map(poll => (
                  <div key={poll.id} className="mb-4">
                    <h4 className="font-display font-medium mb-2">{poll.question}</h4>
                    
                    <div className="space-y-2">
                      {poll.options.map(option => {
                        const votePercentage = poll.options.reduce((total, opt) => total + opt.votes.length, 0) > 0
                          ? Math.round((option.votes.length / poll.options.reduce((total, opt) => total + opt.votes.length, 0)) * 100)
                          : 0;
                        
                        return (
                          <div key={option.id} className="relative">
                            <div className="bg-girly-pink/10 rounded-full h-10 w-full overflow-hidden">
                              <div 
                                className="absolute top-0 left-0 h-10 bg-gradient-to-r from-girly-pink/30 to-girly-purple/30 rounded-full"
                                style={{ width: `${votePercentage}%` }}
                              />
                              <div className="absolute top-0 left-0 h-10 w-full flex items-center justify-between px-4">
                                <span>{option.value}</span>
                                <span className="text-sm font-medium">{votePercentage}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-3 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="rounded-full border-girly-pink/30 hover:bg-girly-pink/10 text-sm"
                      >
                        Vote
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Date Options (if in planning) */}
            {event.status === 'planning' && (
              <div className="bg-white rounded-xl border border-girly-pink/10 shadow-sm p-6">
                <h3 className="font-display text-xl font-semibold mb-4">Date Options</h3>
                
                <div className="space-y-3">
                  {event.dateOptions.map(option => {
                    const optionDate = new Date(option.date);
                    const votePercentage = event.participants.length > 0
                      ? Math.round((option.votes.length / event.participants.length) * 100)
                      : 0;
                    
                    return (
                      <div key={option.id} className="relative">
                        <div className="bg-girly-blue/10 rounded-full h-12 w-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-12 bg-gradient-to-r from-girly-blue/30 to-girly-purple/30 rounded-full"
                            style={{ width: `${votePercentage}%` }}
                          />
                          <div className="absolute top-0 left-0 h-12 w-full flex items-center justify-between px-4">
                            <div>
                              <div className="font-medium">{format(optionDate, 'EEE, MMM d')}</div>
                              {option.time && (
                                <div className="text-xs text-muted-foreground">{option.time}</div>
                              )}
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">{option.votes.length} votes</span>
                              <div className="flex -space-x-1">
                                {option.votes.slice(0, 3).map((userId, index) => (
                                  <Avatar key={userId} className="h-6 w-6 border-2 border-white">
                                    <AvatarFallback className="bg-girly-blue-light text-girly-blue-dark text-xs">
                                      {String.fromCharCode(65 + index)}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="rounded-full border-girly-blue/30 hover:bg-girly-blue/10 text-girly-blue-dark text-sm mr-2"
                  >
                    Suggest Date
                  </Button>
                  <Button 
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-girly-blue to-girly-purple text-white text-sm"
                  >
                    Vote
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Upload Outfit Dialog */}
      <Dialog open={uploadOutfitOpen} onOpenChange={setUploadOutfitOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Share Your Outfit</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              Upload a photo of your outfit for this event!
            </p>
            
            <div className="border-2 border-dashed border-girly-pink/20 rounded-xl p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-girly-pink/10 flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-girly-pink" />
              </div>
              <h3 className="font-display font-medium text-lg mb-2">
                Drag & drop or click to upload
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                PNG, JPG or JPEG (max. 5MB)
              </p>
              <Button 
                className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
              >
                Select Photo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetails;
