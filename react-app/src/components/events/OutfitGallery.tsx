
import { useState } from "react";
import { Camera, Heart, MessageCircle, Plus, Smile } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Outfit } from "@/types/event";

interface OutfitGalleryProps {
  outfits: Outfit[];
  onAddOutfit: () => void;
}

const OutfitCard = ({ outfit }: { outfit: Outfit }) => {
  const [showReactions, setShowReactions] = useState(false);
  
  const reactionEmojis = ["💖", "😍", "🔥", "✨", "👗", "👠", "👑", "🌸"];
  
  const handleReactionClick = (emoji: string) => {
    console.log(`Reacted with ${emoji} to outfit ${outfit.id}`);
    setShowReactions(false);
  };
  
  return (
    <Card className="overflow-hidden border-girly-pink/10">
      <div className="relative">
        <img 
          src={outfit.imageUrl} 
          alt={`${outfit.username}'s outfit`} 
          className="w-full h-64 object-cover object-top"
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={outfit.userAvatar} />
              <AvatarFallback className="bg-girly-purple text-white">
                {outfit.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="ml-2 text-white font-medium">{outfit.username}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex">
            {outfit.reactions.slice(0, 3).map((reaction, i) => (
              <Badge 
                key={i} 
                variant="outline" 
                className="mr-1 bg-girly-pink/5 hover:bg-girly-pink/10"
              >
                {reaction.emoji}
              </Badge>
            ))}
            {outfit.reactions.length > 3 && (
              <Badge variant="outline" className="bg-girly-pink/5">
                +{outfit.reactions.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full hover:bg-girly-pink/10"
              onClick={() => setShowReactions(!showReactions)}
            >
              <Smile className="h-4 w-4 text-girly-pink-dark" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full hover:bg-girly-pink/10"
            >
              <Heart className="h-4 w-4 text-girly-pink-dark" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full hover:bg-girly-pink/10"
            >
              <MessageCircle className="h-4 w-4 text-girly-pink-dark" />
            </Button>
          </div>
        </div>
        
        {showReactions && (
          <div className="mt-2 p-2 bg-white border border-girly-pink/20 rounded-xl shadow-md animate-fade-in">
            <div className="flex flex-wrap justify-center gap-2">
              {reactionEmojis.map((emoji) => (
                <Button 
                  key={emoji} 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 text-xl hover:bg-girly-pink/10"
                  onClick={() => handleReactionClick(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const OutfitGallery = ({ outfits, onAddOutfit }: OutfitGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-xl font-semibold">Outfit Gallery</h3>
        <Button 
          onClick={onAddOutfit}
          variant="outline" 
          size="sm"
          className="rounded-full border-girly-pink hover:bg-girly-pink/10 hover:text-girly-pink-dark"
        >
          <Camera className="mr-2 h-4 w-4" />
          Add Your Look
        </Button>
      </div>
      
      {outfits.length === 0 ? (
        <div className="text-center py-8 bg-girly-pink/5 rounded-xl border border-dashed border-girly-pink/20">
          <Camera className="mx-auto h-12 w-12 text-girly-pink/40 mb-2" />
          <h3 className="font-display font-medium text-lg text-girly-pink-dark">No outfits yet</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Be the first to share your look for this event!
          </p>
          <Button 
            onClick={onAddOutfit}
            className="mt-4 bg-gradient-to-r from-girly-pink to-girly-purple text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your Outfit
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OutfitGallery;
