
import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import PlaceCard from "@/components/favorites/PlaceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchPlaces, fetchFavoritePlaces, getCurrentUser } from "@/services/mockData";
import { Place } from "@/types/event";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Favorites = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // For demo purposes, we use the first user
  const currentUser = getCurrentUser();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [placesData, favoritesData] = await Promise.all([
          fetchPlaces(),
          fetchFavoritePlaces(currentUser.id)
        ]);
        
        setPlaces(placesData);
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load places"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [currentUser.id, toast]);

  const filteredFavorites = favorites.filter(place => 
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (place.location && place.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredPlaces = places.filter(place => 
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (place.location && place.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const isFavorite = (placeId: string) => {
    return favorites.some(fav => fav.id === placeId);
  };
  
  const toggleFavorite = (place: Place) => {
    if (isFavorite(place.id)) {
      setFavorites(favorites.filter(fav => fav.id !== place.id));
      toast({
        title: "Removed from favorites",
        description: `${place.name} has been removed from your favorites`,
      });
    } else {
      setFavorites([...favorites, place]);
      toast({
        title: "Added to favorites",
        description: `${place.name} has been added to your favorites`,
      });
    }
  };
  
  const renderPlaceList = (placeList: Place[], showFavoriteStatus: boolean) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-girly-pink/10">
              <Skeleton className="h-36 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (placeList.length === 0) {
      return (
        <div className="text-center py-12 bg-girly-pink/5 rounded-xl border border-dashed border-girly-pink/20">
          <h3 className="font-display font-medium text-lg text-girly-pink-dark mb-2">
            {showFavoriteStatus 
              ? "No favorite places yet" 
              : "No places found"}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {showFavoriteStatus 
              ? "Add your favorite cafés, restaurants, and more!" 
              : "Try different search terms or add a new place"}
          </p>
          <Button 
            onClick={() => setAddDialogOpen(true)}
            className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Place
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {placeList.map(place => (
          <PlaceCard 
            key={place.id} 
            place={place} 
            isFavorite={showFavoriteStatus ? true : isFavorite(place.id)}
            onToggleFavorite={() => toggleFavorite(place)}
            onSelect={() => console.log("Selected place", place.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-girly-cream/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 mb-16 md:mb-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-2xl font-bold">Favorite Places</h1>
          <Button 
            onClick={() => setAddDialogOpen(true)}
            className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Place
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-girly-pink-dark opacity-70" />
          <Input 
            placeholder="Search places..." 
            className="girly-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="favorites" className="mb-8">
          <TabsList className="bg-girly-pink/10 p-1 rounded-full">
            <TabsTrigger 
              value="favorites" 
              className="rounded-full data-[state=active]:bg-white px-4"
            >
              My Favorites
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="rounded-full data-[state=active]:bg-white px-4"
            >
              All Places
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="favorites" className="mt-4">
            {renderPlaceList(filteredFavorites, true)}
          </TabsContent>
          
          <TabsContent value="all" className="mt-4">
            {renderPlaceList(filteredPlaces, false)}
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Add Place Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Add New Place</DialogTitle>
            <DialogDescription>
              Add a new place to your collection
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <p className="text-muted-foreground mb-6">
              This feature will be coming soon! You'll be able to add custom places.
            </p>
            <Button 
              onClick={() => setAddDialogOpen(false)}
              className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Favorites;
