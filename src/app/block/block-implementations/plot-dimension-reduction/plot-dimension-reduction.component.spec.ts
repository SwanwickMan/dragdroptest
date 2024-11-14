import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotDimensionReductionComponent } from './plot-dimension-reduction.component';

describe('PlotDimensionReductionComponent', () => {
  let component: PlotDimensionReductionComponent;
  let fixture: ComponentFixture<PlotDimensionReductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotDimensionReductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotDimensionReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
