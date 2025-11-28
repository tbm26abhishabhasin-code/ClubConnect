export enum View {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  EXPLORE = 'EXPLORE',
  CLUB_DETAIL = 'CLUB_DETAIL',
  CREATE_CLUB = 'CREATE_CLUB',
  CREATE_EVENT = 'CREATE_EVENT',
  PROFILE = 'PROFILE',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  city: string;
  interests: string[];
  joinedClubs: string[];
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  image: string;
  coverImage: string;
  tags: string[];
  members: User[];
}

export interface Event {
  id: string;
  clubId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  attendees: number;
}

export interface Post {
  id: string;
  clubId: string;
  user: User;
  content: string;
  likes: number;
  timestamp: string;
}

export const CATEGORIES = [
  "Books", "Running", "Music", "Fitness", "Tech", "Startups", 
  "Photography", "Travel", "Movies", "Art", "Cooking", "Chess", 
  "Wellness", "Cycling", "Dance", "Anime", "Finance", "Speaking", 
  "Gaming", "Design"
];
