import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyHighlyVariableGenesComponent } from './identify-highly-variable-genes.component';

describe('IdentifyHighlyVariableGenesComponent', () => {
  let component: IdentifyHighlyVariableGenesComponent;
  let fixture: ComponentFixture<IdentifyHighlyVariableGenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentifyHighlyVariableGenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentifyHighlyVariableGenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
