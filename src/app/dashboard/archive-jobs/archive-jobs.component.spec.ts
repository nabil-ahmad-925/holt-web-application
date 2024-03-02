import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveJobsComponent } from './archive-jobs.component';

describe('ArchiveJobsComponent', () => {
  let component: ArchiveJobsComponent;
  let fixture: ComponentFixture<ArchiveJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
