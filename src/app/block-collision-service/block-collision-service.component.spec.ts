import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCollisionServiceComponent } from './block-collision-service.component';

describe('BlockCollisionServiceComponent', () => {
  let component: BlockCollisionServiceComponent;
  let fixture: ComponentFixture<BlockCollisionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockCollisionServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockCollisionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
