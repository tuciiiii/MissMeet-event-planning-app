
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Calendar, Heart, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [active, setActive] = useState<string>("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "events", icon: Calendar, label: "Events", path: "/events" },
    { id: "favorites", icon: Heart, label: "Favorites", path: "/favorites" },
    { id: "notifications", icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="w-full px-4 py-3 bg-white border-b border-girly-pink/10 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-display font-bold bg-gradient-to-r from-girly-pink-dark to-girly-purple bg-clip-text text-transparent">
            GirlHangout
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link to={item.path} key={item.id}>
              <Button 
                variant="ghost" 
                className={cn(
                  "rounded-full flex items-center gap-2 px-4",
                  active === item.id && "bg-girly-pink/10 text-girly-pink-dark"
                )}
                onClick={() => setActive(item.id)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" />
                <AvatarFallback className="bg-girly-pink-light text-girly-pink-dark">
                  US
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-girly-pink/10 z-10 px-2 py-1">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link to={item.path} key={item.id} className="py-2">
              <Button 
                variant="ghost" 
                className={cn(
                  "rounded-full flex flex-col items-center h-auto px-3 py-1.5",
                  active === item.id && "bg-girly-pink/10 text-girly-pink-dark"
                )}
                onClick={() => setActive(item.id)}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Button>
            </Link>
          ))}
          <Button 
            variant="ghost" 
            className="rounded-full flex flex-col items-center h-auto px-3 py-1.5"
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
