export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  lastLogin?: string;
  websitesCount: number;
}

export interface Website {
  id: string;
  name: string;
  owner: string;
  ownerId: string;
  status: 'published' | 'draft' | 'under_review' | 'suspended';
  lastPublished?: string;
  createdAt: string;
  templateName: string;
  pageViews: number;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  categoryId: string;
  status: 'active' | 'inactive';
  isPremium: boolean;
  usageCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  templatesCount: number;
  order: number;
  status: 'active' | 'inactive';
}

export interface Subscription {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  renewalDate: string;
  amount: number;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'user_signup' | 'website_published' | 'subscription_created' | 'template_created' | 'user_suspended';
  description: string;
  timestamp: string;
  userName?: string;
}
