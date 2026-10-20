import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AdminSettingsResponse, UpdateAdminSettingsRequest } from '@platform/shared-models';
import { AdminSettingsApiService } from '../data-access/admin-settings-api.service';
import { AdminSettingsPage } from './admin-settings.page';

describe('AdminSettingsPage', () => {
  let fixture: ComponentFixture<AdminSettingsPage>;
  let component: AdminSettingsPage;
  let settingsApi: jasmine.SpyObj<AdminSettingsApiService>;

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
    settingsApi = jasmine.createSpyObj<AdminSettingsApiService>('AdminSettingsApiService', [
      'getSettings',
      'updateSettings',
    ]);
    settingsApi.getSettings.and.returnValue(of(settings));
    settingsApi.updateSettings.and.returnValue(of(settings));

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

  it('loads and applies persisted platform settings', () => {
    expect(settingsApi.getSettings).toHaveBeenCalled();
    expect(component.siteName).toBe(settings.siteName);
    expect(component.siteDescription).toBe(settings.siteDescription);
    expect(component.supportEmail).toBe(settings.supportEmail);
    expect(component.emailNotifications).toBeFalse();
    expect(component.newUserNotifications).toBeTrue();
    expect(component.paymentNotifications).toBeFalse();
    expect(component.weeklyReport).toBeTrue();
    expect(component.twoFactorRequired).toBeTrue();
    expect(component.sessionTimeout).toBe(12);
    expect(component.passwordMinLength).toBe(14);
    expect(component.settingsLoaded).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('submits current values and shows save success', () => {
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

    expect(settingsApi.updateSettings).toHaveBeenCalledOnceWith(expected);
    expect(component.saving).toBeFalse();
    expect(component.savedSuccess).toBeTrue();
    expect(component.saveError).toBeUndefined();
  });

  it('reports load authorization errors and keeps settings unavailable', () => {
    settingsApi.getSettings.and.returnValue(throwError(() => ({ status: 403 })));
    component.loadSettings();

    expect(component.loading).toBeFalse();
    expect(component.settingsLoaded).toBeFalse();
    expect(component.loadError).toContain('permission');
  });

  it('reports save validation errors and allows another save attempt', () => {
    settingsApi.updateSettings.and.returnValue(
      throwError(() => ({ status: 422, error: { message: 'Password length is invalid.' } }))
    );
    component.save();

    expect(component.saving).toBeFalse();
    expect(component.savedSuccess).toBeFalse();
    expect(component.saveError).toBe('Password length is invalid.');
  });
});
