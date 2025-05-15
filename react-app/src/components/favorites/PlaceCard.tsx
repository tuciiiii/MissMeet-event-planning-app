
import { Heart, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Place } from "@/types/event";

interface PlaceCardProps {
  place: Place;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onSelect?: () => void;
}

const PlaceCard = ({ 
  place, 
  isFavorite = false,
  onToggleFavorite,
  onSelect
}: PlaceCardProps) => {
  const placeTags = {
    cafe: "bg-girly-blue-light text-girly-blue-dark",
    restaurant: "bg-girly-purple-light text-girly-purple-dark",
    bar: "bg-girly-pink-light text-girly-pink-dark",
    cinema: "bg-amber-100 text-amber-700",
    other: "bg-gray-100 text-gray-700",
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow border-girly-pink/10"
      onClick={onSelect}
    >
      <div className="relative h-36 bg-gradient-to-r from-girly-blue/20 to-girly-purple/20">
        {place.image ? (
          <img 
            src={place.image} 
            alt={place.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-lg font-medium text-girly-purple/50">
              {place.name}
            </span>
          </div>
        )}
        
        <Badge 
          className={`absolute top-2 right-2 ${placeTags[place.type]}`}
        >
          {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
        </Badge>
        
        {isFavorite !== undefined && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 bg-white/70 hover:bg-white h-8 w-8 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? "fill-girly-pink text-girly-pink" : "text-girly-pink/70"}`} 
            />
          </Button>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-display font-semibold text-lg truncate">{place.name}</h3>
        
        {place.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <MapPin className="h-4 w-4 text-girly-pink" />
            <span className="truncate">{place.location}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
          <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
          <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
          <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
          <Star className="h-4 w-4 text-gray-300" />
        </div>
        
        <Button 
          variant="ghost" 
          className="text-sm px-3 rounded-full text-girly-purple hover:bg-girly-purple/10 hover:text-girly-purple-dark"
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
