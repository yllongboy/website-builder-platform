import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminUserResponse } from '@platform/shared-models';
import { AuthService } from '@platform/auth';
import { UserAdminApiService } from '../data-access/user-admin-api.service';
import { UserAdminListPage } from './user-admin-list.page';

describe('SCRUM-97 - Admin user names', () => {
  let fixture: ComponentFixture<UserAdminListPage>;
  let userApi: jest.Mocked<Pick<UserAdminApiService, 'listAll'>>;
  let authService: jest.Mocked<Pick<AuthService, 'getMe'>>;

  const namedUser: AdminUserResponse = {
    id: 'user-1',
    email: 'ada@example.test',
    firstName: 'Ada',
    lastName: 'Lovelace',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2026-01-01T00:00:00Z',
    subscriptionStatus: null,
    planCode: null,
    websiteCount: 0,
  };

  beforeEach(async () => {
    userApi = { listAll: jest.fn().mockReturnValue(of([namedUser])) };
    authService = { getMe: jest.fn().mockReturnValue(of({ id: 'admin-1' } as never)) };

    await TestBed.configureTestingModule({
      imports: [UserAdminListPage],
      providers: [
        { provide: UserAdminApiService, useValue: userApi },
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAdminListPage);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('SCRUM-97 - renders a user full name and uses its initial', () => {
    const row = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;

    expect(row.textContent).toContain('Ada Lovelace');
    expect(row.querySelector('.rounded-full')?.textContent).toContain('A');
    expect(row.textContent).toContain('ada@example.test');
  });

  it('SCRUM-97 - shows an em dash and falls back to the email initial when names are absent', () => {
    userApi.listAll.mockReturnValue(of([{ ...namedUser, firstName: null, lastName: null }]));
    fixture.componentInstance.loadUsers();
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;
    expect(row.textContent).toContain('—');
    expect(row.querySelector('.rounded-full')?.textContent).toContain('A');
  });
});
