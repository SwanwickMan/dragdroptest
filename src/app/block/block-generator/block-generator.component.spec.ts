import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockGeneratorComponent } from './block-generator.component';

describe('BlockGeneratorComponent', () => {
  let component: BlockGeneratorComponent;
  let fixture: ComponentFixture<BlockGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
