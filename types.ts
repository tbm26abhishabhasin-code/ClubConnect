
export enum View {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  SIGNUP = 'SIGNUP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  EXPLORE = 'EXPLORE',
  CLUB_DETAIL = 'CLUB_DETAIL',
  EVENT_DETAIL = 'EVENT_DETAIL',
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
  visibility: 'public' | 'private';
  location: string;
  ownerId: string;
  founderName?: string;
  founderBio?: string;
}

export type RSVPStatus = 'going' | 'maybe' | 'not_going';

export interface Event {
  id: string;
  clubId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  bannerImage?: string;
  capacity?: number;
  attendees: number; // count
  rsvps: Record<string, RSVPStatus>; // userId -> status
}

export interface Post {
  id: string;
  clubId: string;
  user: User;
  content: string;
  likes: number;
  timestamp: string;
}

export interface Notification {
    id: string;
    userId: string;
    type: 'EVENT_INVITE' | 'NEW_POST' | 'RSVP_UPDATE' | 'CLUB_JOIN';
    message: string;
    read: boolean;
    timestamp: string;
    linkId?: string; // clubId or eventId
    viewToNavigate?: View;
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
}

export const CATEGORIES = [
  "Books", "Running", "Music", "Fitness", "Tech", "Startups", 
  "Photography", "Travel", "Movies", "Art", "Cooking", "Chess", 
  "Wellness", "Cycling", "Dance", "Anime", "Finance", "Speaking", 
  "Gaming", "Design"
];