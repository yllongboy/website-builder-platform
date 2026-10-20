export interface AdminNotificationSettings {
  emailNotifications: boolean;
  newUserNotifications: boolean;
  paymentNotifications: boolean;
  weeklyReport: boolean;
}

export interface AdminSecuritySettings {
  twoFactorRequired: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
}

export interface AdminSettingsResponse {
  siteName: string;
  siteDescription: string;
  supportEmail: string;
  notifications: AdminNotificationSettings;
  security: AdminSecuritySettings;
}

export interface UpdateAdminSettingsRequest {
  siteName?: string;
  siteDescription?: string;
  supportEmail?: string;
  notifications?: Partial<AdminNotificationSettings>;
  security?: Partial<AdminSecuritySettings>;
}
