import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipleComponentAnalysisComponent } from './principle-component-analysis.component';

describe('PrincipleComponentAnalysisComponent', () => {
  let component: PrincipleComponentAnalysisComponent;
  let fixture: ComponentFixture<PrincipleComponentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipleComponentAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipleComponentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
