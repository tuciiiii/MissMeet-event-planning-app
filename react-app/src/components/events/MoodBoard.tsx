
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MoodBoardProps {
  images: { id: string; imageUrl: string; addedBy: string }[];
  onAddImage: (imageUrl: string) => void;
  onRemoveImage: (id: string) => void;
}

const MoodBoard = ({ images, onAddImage, onRemoveImage }: MoodBoardProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = () => {
    if (!imageUrl.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an image URL",
      });
      return;
    }

    onAddImage(imageUrl);
    setImageUrl("");
    setOpen(false);
    
    toast({
      title: "Image added",
      description: "Your image has been added to the mood board",
    });
  };

  // Sample pastel/aesthetic image collections if the board is empty
  const sampleImages = [
    "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=300&auto=format&fit=crop",
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-xl font-semibold">Mood Board</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full border-girly-pink hover:bg-girly-pink/10 hover:text-girly-pink-dark"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-xl">
            <DialogHeader>
              <DialogTitle className="font-display">Add to Mood Board</DialogTitle>
              <DialogDescription>
                Add an image URL to include in the event mood board
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="girly-input col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleAddImage}
                className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
              >
                Add to Board
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {images.length === 0 ? (
        <div>
          <div className="text-center py-6 bg-girly-purple/5 rounded-xl border border-dashed border-girly-purple/20 mb-4">
            <h3 className="font-display font-medium text-lg text-girly-purple-dark">No images yet</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Add images to create a mood board for this event!
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="mt-4 bg-gradient-to-r from-girly-pink to-girly-purple text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Start Mood Board
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-xl">
                <DialogHeader>
                  <DialogTitle className="font-display">Add to Mood Board</DialogTitle>
                  <DialogDescription>
                    Add an image URL to include in the event mood board
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageUrl2" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="imageUrl2"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="girly-input col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddImage}
                    className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
                  >
                    Add to Board
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <h4 className="font-display text-sm font-medium text-girly-purple-dark mb-2">
            Need inspiration? Try one of these:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sampleImages.map((image, index) => (
              <div 
                key={index} 
                className="relative rounded-lg overflow-hidden h-24 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => onAddImage(image)}
              >
                <img src={image} alt={`Sample ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {images.map((image) => (
            <div key={image.id} className="relative group rounded-lg overflow-hidden h-32">
              <img 
                src={image.imageUrl} 
                alt="Mood board" 
                className="h-full w-full object-cover"
              />
              <button 
                onClick={() => onRemoveImage(image.id)}
                className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
          
          <Dialog>
            <DialogTrigger asChild>
              <div className="h-32 border-2 border-dashed border-girly-pink/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-girly-pink/5 transition-colors">
                <Plus className="h-6 w-6 text-girly-pink/50" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl">
              <DialogHeader>
                <DialogTitle className="font-display">Add to Mood Board</DialogTitle>
                <DialogDescription>
                  Add an image URL to include in the event mood board
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl3" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl3"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="girly-input col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddImage}
                  className="bg-gradient-to-r from-girly-pink to-girly-purple text-white"
                >
                  Add to Board
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default MoodBoard;
