import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPublicViewComponent } from './summary-public-view.component';

describe('SummaryPublicViewComponent', () => {
  let component: SummaryPublicViewComponent;
  let fixture: ComponentFixture<SummaryPublicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryPublicViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPublicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
