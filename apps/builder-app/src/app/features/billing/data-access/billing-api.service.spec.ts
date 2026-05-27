import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { BillingApiService } from './billing-api.service';

describe('BillingApiService', () => {
  let service: BillingApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BillingApiService],
    });

    service = TestBed.inject(BillingApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getStatus should call GET /billing/status', () => {
    service.getStatus().subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/billing/status`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('createCheckoutSession should POST to /billing/checkout with planCode', () => {
    const planCode = 'pro';

    service.createCheckoutSession(planCode).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/billing/checkout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ planCode });
    req.flush({});
  });

  it('createPortalSession should POST to /billing/portal', () => {
    service.createPortalSession().subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/billing/portal`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
