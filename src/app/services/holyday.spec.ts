import { TestBed } from '@angular/core/testing';

import { Holyday } from './holyday';

describe('Holyday', () => {
  let service: Holyday;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Holyday);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
