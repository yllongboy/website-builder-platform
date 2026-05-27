import { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Palette,
  Shield,
  Trash2,
  Camera,
  Save } from
'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Toggle } from '@/components/ui/Toggle';
import { Select } from '@/components/ui/Dropdown';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <AppLayout>
      <div data-ev-id="ev_d566fa43a6" className="max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in">
        {/* Header */}
        <div data-ev-id="ev_281c39a66b" className="flex items-center justify-between">
          <div data-ev-id="ev_e596416ed1">
            <h1 data-ev-id="ev_1dd140422f" className="text-3xl font-bold text-foreground">Settings</h1>
            <p data-ev-id="ev_5f3fa31e7b" className="text-foreground-secondary mt-1">Manage your account and preferences</p>
          </div>
          <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="profile" className="flex flex-col gap-6">
          <TabsList className="w-fit">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card variant="bordered" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal details and profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 mt-4">
                {/* Avatar */}
                <div data-ev-id="ev_bd7bb85f46" className="flex items-center gap-6">
                  <div data-ev-id="ev_0efd380c70" className="relative">
                    <Avatar src="" alt="John Doe" size="xl" />
                    <button data-ev-id="ev_25f0c6bbed" className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white shadow-lg hover:bg-primary-hover transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div data-ev-id="ev_cbd6294e50">
                    <p data-ev-id="ev_575a055454" className="font-medium text-foreground">Profile Photo</p>
                    <p data-ev-id="ev_ec21565515" className="text-sm text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form */}
                <div data-ev-id="ev_04e6ed2f52" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="John" />
                  <Input label="Last Name" defaultValue="Doe" />
                  <Input label="Email" type="email" defaultValue="john@example.com" className="md:col-span-2" />
                  <Input label="Company" placeholder="Your company name" className="md:col-span-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div data-ev-id="ev_c11c8c8ceb" className="flex flex-col gap-6">
              <Card variant="bordered" padding="lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Password
                  </CardTitle>
                  <CardDescription>Change your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 mt-4">
                  <Input label="Current Password" type="password" placeholder="Enter current password" />
                  <Input label="New Password" type="password" placeholder="Enter new password" />
                  <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
                  <Button variant="outline" className="w-fit mt-2">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card variant="bordered" padding="lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <div data-ev-id="ev_c8024059d5" className="flex items-center justify-between">
                    <div data-ev-id="ev_c5ed78182e">
                      <p data-ev-id="ev_701bc6fb3f" className="font-medium text-foreground">Enable 2FA</p>
                      <p data-ev-id="ev_eb2b403301" className="text-sm text-muted-foreground">Use an authenticator app for added security</p>
                    </div>
                    <Toggle />
                  </div>
                </CardContent>
              </Card>

              <Card variant="bordered" padding="lg" className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Trash2 className="w-5 h-5" />
                    Delete Account
                  </CardTitle>
                  <CardDescription>Permanently delete your account and all data</CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <p data-ev-id="ev_affb89fbe3" className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. All your websites, data, and settings will be permanently removed.
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card variant="bordered" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 mt-4">
                {[
                { title: 'Email Notifications', description: 'Receive updates via email', defaultChecked: true },
                { title: 'Website Published', description: 'Get notified when your site goes live', defaultChecked: true },
                { title: 'Weekly Reports', description: 'Receive weekly analytics summary', defaultChecked: false },
                { title: 'Product Updates', description: 'Learn about new features and improvements', defaultChecked: true },
                { title: 'Marketing Emails', description: 'Tips, offers, and promotions', defaultChecked: false }].
                map((item, i) =>
                <div data-ev-id="ev_11d4e4eca5" key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div data-ev-id="ev_a248f5a6a1">
                      <p data-ev-id="ev_c974bcff6d" className="font-medium text-foreground">{item.title}</p>
                      <p data-ev-id="ev_e864ee0f50" className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Toggle defaultChecked={item.defaultChecked} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div data-ev-id="ev_7c7038138a" className="flex flex-col gap-6">
              <Card variant="bordered" padding="lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Language & Region
                  </CardTitle>
                  <CardDescription>Set your preferred language and timezone</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div data-ev-id="ev_c2f9e7c37d">
                    <label data-ev-id="ev_5eeab1c842" className="block text-sm font-medium text-foreground mb-2">Language</label>
                    <Select
                      value="en"
                      onChange={() => {}}
                      options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Español' },
                      { value: 'fr', label: 'Français' },
                      { value: 'de', label: 'Deutsch' }]
                      } />

                  </div>
                  <div data-ev-id="ev_5bcb81a39f">
                    <label data-ev-id="ev_e2781cd305" className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                    <Select
                      value="utc-8"
                      onChange={() => {}}
                      options={[
                      { value: 'utc-8', label: '(UTC-08:00) Pacific Time' },
                      { value: 'utc-5', label: '(UTC-05:00) Eastern Time' },
                      { value: 'utc+0', label: '(UTC+00:00) London' },
                      { value: 'utc+1', label: '(UTC+01:00) Paris' }]
                      } />

                  </div>
                </CardContent>
              </Card>

              <Card variant="bordered" padding="lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>Customize how SiteForge looks for you</CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <div data-ev-id="ev_8ac6796747">
                    <label data-ev-id="ev_70e36ac539" className="block text-sm font-medium text-foreground mb-3">Theme</label>
                    <div data-ev-id="ev_4a15303b3e" className="flex gap-3">
                      {[
                      { id: 'light', label: 'Light', bg: 'bg-white', active: true },
                      { id: 'dark', label: 'Dark', bg: 'bg-gray-900' },
                      { id: 'system', label: 'System', bg: 'bg-gradient-to-r from-white to-gray-900' }].
                      map((theme) =>
                      <button data-ev-id="ev_e314823b6d"
                      key={theme.id}
                      className={`
                            flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${theme.active ? 'border-primary bg-primary/5' : 'border-border hover:border-border-hover'}
                          `}>

                          <div data-ev-id="ev_fee001f646" className={`w-16 h-10 rounded-lg ${theme.bg} border border-border`} />
                          <span data-ev-id="ev_183f0dd9be" className="text-sm font-medium text-foreground">{theme.label}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>);

}