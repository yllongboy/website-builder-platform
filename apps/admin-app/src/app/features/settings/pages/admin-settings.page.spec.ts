import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AdminSettingsResponse, UpdateAdminSettingsRequest } from '@platform/shared-models';
import { AdminSettingsApiService } from '../data-access/admin-settings-api.service';
import { AdminSettingsPage } from './admin-settings.page';

describe('AdminSettingsPage', () => {
  let fixture: ComponentFixture<AdminSettingsPage>;
  let component: AdminSettingsPage;
  let settingsApi: jest.Mocked<Pick<AdminSettingsApiService, 'getSettings' | 'updateSettings'>>;

  const settings: AdminSettingsResponse = {
    siteName: 'SCRUM Studio',
    siteDescription: 'A custom website platform',
    supportEmail: 'help@example.com',
    notifications: {
      emailNotifications: false,
      newUserNotifications: true,
      paymentNotifications: false,
      weeklyReport: true,
    },
    security: {
      twoFactorRequired: true,
      sessionTimeout: 12,
      passwordMinLength: 14,
    },
  };

  beforeEach(async () => {
    settingsApi = {
      getSettings: jest.fn(),
      updateSettings: jest.fn(),
    };
    settingsApi.getSettings.mockReturnValue(of(settings));
    settingsApi.updateSettings.mockReturnValue(of(settings));

    await TestBed.configureTestingModule({
      imports: [AdminSettingsPage],
      providers: [{ provide: AdminSettingsApiService, useValue: settingsApi }],
    })
      .overrideComponent(AdminSettingsPage, { set: { template: '<div></div>' } })
      .compileComponents();

    fixture = TestBed.createComponent(AdminSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SCRUM-107 - loads and applies persisted platform settings', () => {
    expect(settingsApi.getSettings).toHaveBeenCalled();
    expect(component.siteName).toBe(settings.siteName);
    expect(component.siteDescription).toBe(settings.siteDescription);
    expect(component.supportEmail).toBe(settings.supportEmail);
    expect(component.emailNotifications).toBe(false);
    expect(component.newUserNotifications).toBe(true);
    expect(component.paymentNotifications).toBe(false);
    expect(component.weeklyReport).toBe(true);
    expect(component.twoFactorRequired).toBe(true);
    expect(component.sessionTimeout).toBe(12);
    expect(component.passwordMinLength).toBe(14);
    expect(component.settingsLoaded).toBe(true);
    expect(component.loading).toBe(false);
  });

  it('SCRUM-107 - submits current values and shows save success', () => {
    component.siteName = 'Updated Studio';
    component.siteDescription = 'Updated description';
    component.supportEmail = 'updated@example.com';
    component.emailNotifications = true;
    component.newUserNotifications = false;
    component.paymentNotifications = true;
    component.weeklyReport = false;
    component.twoFactorRequired = false;
    component.sessionTimeout = 48;
    component.passwordMinLength = 16;

    const expected: UpdateAdminSettingsRequest = {
      siteName: 'Updated Studio',
      siteDescription: 'Updated description',
      supportEmail: 'updated@example.com',
      notifications: {
        emailNotifications: true,
        newUserNotifications: false,
        paymentNotifications: true,
        weeklyReport: false,
      },
      security: {
        twoFactorRequired: false,
        sessionTimeout: 48,
        passwordMinLength: 16,
      },
    };

    component.save();

    expect(settingsApi.updateSettings).toHaveBeenCalledTimes(1);
    expect(settingsApi.updateSettings).toHaveBeenCalledWith(expected);
    expect(component.saving).toBe(false);
    expect(component.savedSuccess).toBe(true);
    expect(component.saveError).toBeUndefined();
  });

  it('SCRUM-107 - reports load authorization errors and keeps settings unavailable', () => {
    settingsApi.getSettings.mockReturnValue(throwError(() => ({ status: 403 })));
    const failedFixture = TestBed.createComponent(AdminSettingsPage);
    failedFixture.detectChanges();

    expect(failedFixture.componentInstance.loading).toBe(false);
    expect(failedFixture.componentInstance.settingsLoaded).toBe(false);
    expect(failedFixture.componentInstance.loadError).toContain('permission');
    failedFixture.destroy();
  });

  it('SCRUM-107 - reports save validation errors and allows another save attempt', () => {
    settingsApi.updateSettings.mockReturnValue(
      throwError(() => ({ status: 422, error: { message: 'Password length is invalid.' } }))
    );
    component.save();

    expect(component.saving).toBe(false);
    expect(component.savedSuccess).toBe(false);
    expect(component.saveError).toBe('Password length is invalid.');
  });
});
