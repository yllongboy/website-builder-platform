import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '@platform/auth';
import { RegisterPage } from './register.page';

describe('SCRUM-97 - Registration names', () => {
  let authService: jest.Mocked<Pick<AuthService, 'register'>>;
  const router = { navigateByUrl: jest.fn() };

  beforeEach(async () => {
    authService = {
      register: jest.fn().mockReturnValue(of({
        accessToken: 'test-token',
        user: { id: 'user-1', email: 'ada@example.test', role: 'USER', firstName: 'Ada', lastName: 'Lovelace' },
      })),
    };

    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService },
      ],
    })
      .overrideComponent(RegisterPage, { set: { template: '<div></div>' } })
      .compileComponents();
  });

  it('SCRUM-97 - includes optional first and last names in the registration request', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const page = fixture.componentInstance;
    page.form.setValue({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.test',
      password: 'safe-password',
    });

    page.onSubmit();

    expect(authService.register).toHaveBeenCalledWith({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.test',
      password: 'safe-password',
    });
    fixture.destroy();
  });
});
