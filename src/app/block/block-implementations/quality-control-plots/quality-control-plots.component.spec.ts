import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlPlotsComponent } from './quality-control-plots.component';

describe('QualityControlPlotsComponent', () => {
  let component: QualityControlPlotsComponent;
  let fixture: ComponentFixture<QualityControlPlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityControlPlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityControlPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
