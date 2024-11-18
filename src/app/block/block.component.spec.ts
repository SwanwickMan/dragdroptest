// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { BlockComponent } from './block.component';

// describe('BlockComponent', () => {
//   let component: BlockComponent;
//   let fixture: ComponentFixture<BlockComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [BlockComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BlockComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockComponent } from './block.component';

describe('BlockComponent', () => {
  let component: BlockComponent;
  let fixture: ComponentFixture<BlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockComponent);
    component = fixture.componentInstance;
    component.id = 1;
    component.label = 'Test Block';
    component.x = 100;
    component.y = 200;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update position on drag', () => {
    component.onMouseDown({ clientX: 120, clientY: 220 } as MouseEvent);
    component.onMouseMove({ clientX: 150, clientY: 250 } as MouseEvent);
    component.onMouseUp();

    expect(component.x).toBe(150 - 120 + 100);
    expect(component.y).toBe(250 - 220 + 200);
  });
});
