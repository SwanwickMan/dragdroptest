import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockServiceComponent } from './block-service.component';

describe('BlockServiceComponent', () => {
  let component: BlockServiceComponent;
  let fixture: ComponentFixture<BlockServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
