import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunUmapComponent } from './run-umap.component';

describe('RunUmapComponent', () => {
  let component: RunUmapComponent;
  let fixture: ComponentFixture<RunUmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunUmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunUmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
