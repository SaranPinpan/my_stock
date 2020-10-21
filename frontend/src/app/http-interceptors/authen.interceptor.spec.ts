import { TestBed } from '@angular/core/testing';

import { AuthenInterceptor } from './authen.interceptor';

describe('AuthenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenInterceptor = TestBed.inject(AuthenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
