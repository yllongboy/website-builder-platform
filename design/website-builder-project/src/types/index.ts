// Website Builder Platform Types

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface Website {
  id: string;
  name: string;
  thumbnail?: string;
  status: 'draft' | 'published';
  url?: string;
  createdAt: string;
  updatedAt: string;
  template?: string;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: TemplateCategory;
  isPremium: boolean;
  description?: string;
  previewUrl?: string;
}

export type TemplateCategory = 
  | 'all'
  | 'business'
  | 'portfolio'
  | 'ecommerce'
  | 'blog'
  | 'landing'
  | 'saas'
  | 'agency';

export interface EditorBlock {
  id: string;
  type: BlockType;
  name: string;
  icon: string;
  category: 'layout' | 'content' | 'media' | 'forms' | 'advanced';
}

export type BlockType = 
  | 'hero'
  | 'features'
  | 'pricing'
  | 'testimonials'
  | 'cta'
  | 'header'
  | 'footer'
  | 'gallery'
  | 'contact'
  | 'text'
  | 'image'
  | 'video'
  | 'button'
  | 'form'
  | 'divider'
  | 'spacer'
  | 'columns'
  | 'grid';

export interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string;
}
