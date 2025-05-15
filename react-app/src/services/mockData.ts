
import { Event, Place } from "@/types/event";

// Sample users
export const users = [
  { id: "u1", name: "Emma", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "u2", name: "Olivia", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "u3", name: "Sophia", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: "u4", name: "Isabella", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: "u5", name: "Ava", avatar: "https://i.pravatar.cc/150?img=16" },
];

// Sample places
export const places: Place[] = [
  {
    id: "p1",
    name: "Aroma Café",
    type: "cafe",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=60",
    location: "123 Main St"
  },
  {
    id: "p2",
    name: "Bella Restaurant",
    type: "restaurant",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60",
    location: "456 Oak Ave"
  },
  {
    id: "p3",
    name: "Starlight Cinema",
    type: "cinema",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60",
    location: "789 Pine Blvd"
  },
  {
    id: "p4",
    name: "Moonlight Bar",
    type: "bar",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&auto=format&fit=crop&q=60",
    location: "101 Elm St"
  },
  {
    id: "p5",
    name: "Sweet Treats Bakery",
    type: "cafe",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=500&auto=format&fit=crop&q=60",
    location: "202 Maple Dr"
  },
  {
    id: "p6",
    name: "Park View Restaurant",
    type: "restaurant",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&auto=format&fit=crop&q=60",
    location: "303 Birch Ln"
  },
];

// Sample events
export const events: Event[] = [
  {
    id: "e1",
    title: "Coffee & Catch Up",
    description: "Let's try the new pastries at Aroma Café!",
    createdBy: "u1",
    place: places[0],
    dateOptions: [
      { id: "d1", date: "2025-05-20", time: "3:00 PM", votes: ["u1", "u3"] },
      { id: "d2", date: "2025-05-21", time: "4:00 PM", votes: ["u2"] },
    ],
    confirmedDate: "2025-05-20",
    polls: [
      {
        id: "poll1",
        question: "What should we order?",
        options: [
          { id: "o1", value: "Croissants", votes: ["u1"] },
          { id: "o2", value: "Muffins", votes: ["u2", "u3"] },
          { id: "o3", value: "Both!", votes: [] },
        ]
      }
    ],
    outfits: [
      {
        id: "outfit1",
        userId: "u1",
        username: "Emma",
        userAvatar: "https://i.pravatar.cc/150?img=1",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=60",
        reactions: [
          { userId: "u2", emoji: "😍" },
          { userId: "u3", emoji: "💖" }
        ]
      },
      {
        id: "outfit2",
        userId: "u2",
        username: "Olivia",
        userAvatar: "https://i.pravatar.cc/150?img=5",
        imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&auto=format&fit=crop&q=60",
        reactions: [
          { userId: "u1", emoji: "🔥" },
          { userId: "u3", emoji: "✨" }
        ]
      }
    ],
    status: "confirmed",
    participants: ["u1", "u2", "u3"],
    moodboard: [
      { 
        id: "m1", 
        imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&auto=format&fit=crop&q=60", 
        addedBy: "u1" 
      },
      { 
        id: "m2", 
        imageUrl: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=300&auto=format&fit=crop&q=60", 
        addedBy: "u2" 
      }
    ]
  },
  {
    id: "e2",
    title: "Movie Night",
    description: "Let's watch the new romantic comedy!",
    createdBy: "u2",
    place: places[2],
    dateOptions: [
      { id: "d3", date: "2025-05-25", time: "7:00 PM", votes: ["u2", "u4", "u5"] },
      { id: "d4", date: "2025-05-26", time: "8:00 PM", votes: ["u1", "u3"] },
    ],
    outfits: [],
    status: "planning",
    participants: ["u1", "u2", "u3", "u4", "u5"],
    moodboard: []
  },
  {
    id: "e3",
    title: "Brunch at Bella's",
    description: "Sunday brunch with the girls!",
    createdBy: "u3",
    place: places[1],
    dateOptions: [
      { id: "d5", date: "2025-05-19", time: "11:00 AM", votes: ["u1", "u2", "u3", "u4"] },
    ],
    confirmedDate: "2025-05-19",
    outfits: [
      {
        id: "outfit3",
        userId: "u3",
        username: "Sophia",
        userAvatar: "https://i.pravatar.cc/150?img=9",
        imageUrl: "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?w=300&auto=format&fit=crop&q=60",
        reactions: [
          { userId: "u1", emoji: "💖" },
          { userId: "u2", emoji: "🌸" },
          { userId: "u4", emoji: "👗" }
        ]
      }
    ],
    status: "past",
    participants: ["u1", "u2", "u3", "u4"],
    moodboard: [
      { 
        id: "m3", 
        imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&auto=format&fit=crop&q=60", 
        addedBy: "u3" 
      },
      { 
        id: "m4", 
        imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&auto=format&fit=crop&q=60", 
        addedBy: "u1" 
      }
    ]
  }
];

// Sample favorite places by user
export const favoritePlaces = {
  "u1": ["p1", "p3", "p5"],
  "u2": ["p2", "p4"],
  "u3": ["p1", "p2", "p6"],
  "u4": ["p3", "p5"],
  "u5": ["p1", "p4"]
};

// Simulate API calls with timeouts
export const fetchEvents = () => {
  return new Promise<Event[]>((resolve) => {
    setTimeout(() => {
      resolve(events);
    }, 500);
  });
};

export const fetchPlaces = () => {
  return new Promise<Place[]>((resolve) => {
    setTimeout(() => {
      resolve(places);
    }, 500);
  });
};

export const fetchEvent = (id: string) => {
  return new Promise<Event | undefined>((resolve) => {
    setTimeout(() => {
      resolve(events.find(event => event.id === id));
    }, 300);
  });
};

export const fetchFavoritePlaces = (userId: string) => {
  return new Promise<Place[]>((resolve) => {
    setTimeout(() => {
      const favIds = favoritePlaces[userId as keyof typeof favoritePlaces] || [];
      const userFavorites = places.filter(place => favIds.includes(place.id));
      resolve(userFavorites);
    }, 300);
  });
};

export const getCurrentUser = () => {
  // For demo purposes, we'll return the first user
  return users[0];
};
