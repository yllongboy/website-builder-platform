import type { Activity, Category, Subscription, Template, User, Website } from './models';

export const mockUsers: User[] = [
  { id: '1', email: 'john@example.com', name: 'John Doe', role: 'admin', status: 'active', createdAt: '2024-01-15', lastLogin: '2024-12-20', websitesCount: 5 },
  { id: '2', email: 'sarah@example.com', name: 'Sarah Miller', role: 'user', status: 'active', createdAt: '2024-02-20', lastLogin: '2024-12-19', websitesCount: 3 },
  { id: '3', email: 'mike@example.com', name: 'Mike Johnson', role: 'editor', status: 'suspended', createdAt: '2024-03-10', lastLogin: '2024-11-15', websitesCount: 2 },
  { id: '4', email: 'emma@example.com', name: 'Emma Wilson', role: 'user', status: 'active', createdAt: '2024-04-05', lastLogin: '2024-12-20', websitesCount: 8 },
  { id: '5', email: 'david@example.com', name: 'David Brown', role: 'user', status: 'pending', createdAt: '2024-05-12', websitesCount: 0 },
  { id: '6', email: 'lisa@example.com', name: 'Lisa Anderson', role: 'user', status: 'active', createdAt: '2024-06-18', lastLogin: '2024-12-18', websitesCount: 4 },
  { id: '7', email: 'james@example.com', name: 'James Taylor', role: 'editor', status: 'active', createdAt: '2024-07-22', lastLogin: '2024-12-17', websitesCount: 6 },
  { id: '8', email: 'olivia@example.com', name: 'Olivia Martinez', role: 'user', status: 'active', createdAt: '2024-08-30', lastLogin: '2024-12-20', websitesCount: 2 }
];

export const mockWebsites: Website[] = [
  { id: '1', name: 'TechStartup Pro', owner: 'John Doe', ownerId: '1', status: 'published', lastPublished: '2024-12-15', createdAt: '2024-06-10', templateName: 'Startup Landing', pageViews: 15420 },
  { id: '2', name: 'Creative Portfolio', owner: 'Sarah Miller', ownerId: '2', status: 'published', lastPublished: '2024-12-10', createdAt: '2024-07-22', templateName: 'Portfolio Pro', pageViews: 8930 },
  { id: '3', name: 'Fitness Blog', owner: 'Emma Wilson', ownerId: '4', status: 'draft', createdAt: '2024-09-05', templateName: 'Blog Starter', pageViews: 0 },
  { id: '4', name: 'Restaurant Menu', owner: 'David Brown', ownerId: '5', status: 'under_review', createdAt: '2024-10-12', templateName: 'Restaurant Theme', pageViews: 0 },
  { id: '5', name: 'E-commerce Store', owner: 'Lisa Anderson', ownerId: '6', status: 'published', lastPublished: '2024-12-18', createdAt: '2024-08-30', templateName: 'Shop Pro', pageViews: 24560 },
  { id: '6', name: 'Photography Showcase', owner: 'James Taylor', ownerId: '7', status: 'suspended', createdAt: '2024-05-15', templateName: 'Gallery Dark', pageViews: 5670 },
  { id: '7', name: 'Agency Website', owner: 'John Doe', ownerId: '1', status: 'published', lastPublished: '2024-12-20', createdAt: '2024-04-08', templateName: 'Agency Bold', pageViews: 32100 }
];

export const mockTemplates: Template[] = [
  { id: '1', name: 'Startup Landing', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', category: 'Business', categoryId: '1', status: 'active', isPremium: false, usageCount: 234, createdAt: '2024-01-10' },
  { id: '2', name: 'Portfolio Pro', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', category: 'Portfolio', categoryId: '2', status: 'active', isPremium: true, usageCount: 189, createdAt: '2024-02-15' },
  { id: '3', name: 'Blog Starter', thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop', category: 'Blog', categoryId: '3', status: 'active', isPremium: false, usageCount: 412, createdAt: '2024-03-20' },
  { id: '4', name: 'Shop Pro', thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop', category: 'E-commerce', categoryId: '4', status: 'active', isPremium: true, usageCount: 156, createdAt: '2024-04-25' },
  { id: '5', name: 'Agency Bold', thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', category: 'Business', categoryId: '1', status: 'active', isPremium: true, usageCount: 98, createdAt: '2024-05-30' },
  { id: '6', name: 'Gallery Dark', thumbnail: 'https://images.unsplash.com/photo-1493799817216-4b57c99cdc65?w=400&h=300&fit=crop', category: 'Portfolio', categoryId: '2', status: 'inactive', isPremium: false, usageCount: 67, createdAt: '2024-06-12' }
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Business', slug: 'business', templatesCount: 24, order: 1, status: 'active' },
  { id: '2', name: 'Portfolio', slug: 'portfolio', templatesCount: 18, order: 2, status: 'active' },
  { id: '3', name: 'Blog', slug: 'blog', templatesCount: 12, order: 3, status: 'active' },
  { id: '4', name: 'E-commerce', slug: 'ecommerce', templatesCount: 15, order: 4, status: 'active' },
  { id: '5', name: 'Landing Page', slug: 'landing-page', templatesCount: 21, order: 5, status: 'active' },
  { id: '6', name: 'Restaurant', slug: 'restaurant', templatesCount: 8, order: 6, status: 'inactive' }
];

export const mockSubscriptions: Subscription[] = [
  { id: '1', userId: '1', userEmail: 'john@example.com', userName: 'John Doe', plan: 'pro', status: 'active', renewalDate: '2025-01-15', amount: 29, createdAt: '2024-01-15' },
  { id: '2', userId: '2', userEmail: 'sarah@example.com', userName: 'Sarah Miller', plan: 'starter', status: 'active', renewalDate: '2025-02-20', amount: 12, createdAt: '2024-02-20' },
  { id: '3', userId: '4', userEmail: 'emma@example.com', userName: 'Emma Wilson', plan: 'enterprise', status: 'active', renewalDate: '2025-04-05', amount: 99, createdAt: '2024-04-05' },
  { id: '4', userId: '6', userEmail: 'lisa@example.com', userName: 'Lisa Anderson', plan: 'pro', status: 'past_due', renewalDate: '2024-12-18', amount: 29, createdAt: '2024-06-18' },
  { id: '5', userId: '7', userEmail: 'james@example.com', userName: 'James Taylor', plan: 'starter', status: 'cancelled', renewalDate: '2024-11-22', amount: 12, createdAt: '2024-07-22' },
  { id: '6', userId: '8', userEmail: 'olivia@example.com', userName: 'Olivia Martinez', plan: 'pro', status: 'trialing', renewalDate: '2025-01-30', amount: 29, createdAt: '2024-08-30' }
];

export const mockActivities: Activity[] = [
  { id: '1', type: 'user_signup', description: 'New user registered', timestamp: '2024-12-20T14:30:00Z', userName: 'Alex Thompson' },
  { id: '2', type: 'website_published', description: 'Website published', timestamp: '2024-12-20T13:15:00Z', userName: 'John Doe' },
  { id: '3', type: 'subscription_created', description: 'New Pro subscription', timestamp: '2024-12-20T11:45:00Z', userName: 'Sarah Miller' },
  { id: '4', type: 'template_created', description: 'New template added', timestamp: '2024-12-19T16:20:00Z', userName: 'Admin' },
  { id: '5', type: 'user_suspended', description: 'User account suspended', timestamp: '2024-12-19T10:00:00Z', userName: 'Mike Johnson' }
];

export const dashboardStats = {
  totalUsers: 1248,
  activeSubscriptions: 892,
  publishedWebsites: 3456,
  monthlyRevenue: 24780,
  userGrowth: 12.5,
  revenueGrowth: 8.3
};

export const chartData = {
  userGrowth: [
    { month: 'Jul', users: 850 },
    { month: 'Aug', users: 920 },
    { month: 'Sep', users: 980 },
    { month: 'Oct', users: 1050 },
    { month: 'Nov', users: 1150 },
    { month: 'Dec', users: 1248 }
  ],
  revenue: [
    { month: 'Jul', revenue: 18500 },
    { month: 'Aug', revenue: 19200 },
    { month: 'Sep', revenue: 20800 },
    { month: 'Oct', revenue: 22100 },
    { month: 'Nov', revenue: 23400 },
    { month: 'Dec', revenue: 24780 }
  ]
};
