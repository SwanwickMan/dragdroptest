import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlsFilteringComponent } from './quality-controls-filtering.component';

describe('QualityControlsFilteringComponent', () => {
  let component: QualityControlsFilteringComponent;
  let fixture: ComponentFixture<QualityControlsFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityControlsFilteringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityControlsFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
