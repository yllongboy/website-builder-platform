import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@platform/auth';

describe('SCRUM-126 - AuthService logout teardown', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('SCRUM-126 - allows a new logout after the previous request is unsubscribed', () => {
    service.login({ email: 'admin@example.com', password: 'password' }).subscribe();
    httpMock.expectOne('/api/auth/login').flush({
      accessToken: 'test-token',
      user: { id: 'user-1', email: 'admin@example.com', role: 'ADMIN' },
    });

    const firstLogout = service.logout().subscribe();
    const firstRequest = httpMock.expectOne('/api/auth/logout');
    firstLogout.unsubscribe();
    expect(firstRequest.cancelled).toBe(true);

    service.logout().subscribe();
    const retryRequest = httpMock.expectOne('/api/auth/logout');
    retryRequest.flush(null);

    expect(service.getToken()).toBeNull();
  });
});
