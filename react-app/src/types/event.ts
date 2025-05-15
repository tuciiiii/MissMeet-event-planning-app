
export type Place = {
  id: string;
  name: string;
  type: 'cafe' | 'restaurant' | 'bar' | 'cinema' | 'other';
  image?: string;
  location?: string;
};

export type DateOption = {
  id: string;
  date: string;
  time?: string;
  votes: string[]; // array of user IDs
};

export type PollOption = {
  id: string;
  value: string;
  votes: string[]; // array of user IDs
};

export type Poll = {
  id: string;
  question: string;
  options: PollOption[];
};

export type Outfit = {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  imageUrl: string;
  reactions: {
    userId: string;
    emoji: string;
  }[];
};

export type EventStatus = 'planning' | 'confirmed' | 'past';

export type Event = {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  place?: Place;
  dateOptions: DateOption[];
  confirmedDate?: string;
  polls?: Poll[];
  outfits: Outfit[];
  status: EventStatus;
  participants: string[]; // user IDs
  moodboard: { id: string; imageUrl: string; addedBy: string }[];
};
