// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { WorkspaceComponent } from './workspace.component';

// describe('WorkspaceComponent', () => {
//   let component: WorkspaceComponent;
//   let fixture: ComponentFixture<WorkspaceComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [WorkspaceComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(WorkspaceComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceComponent } from './workspace.component';
import { BlockComponent } from '../block/block.component';

describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceComponent, BlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new block', () => {
    const initialLength = component.blocks.length;
    component.addBlock();
    expect(component.blocks.length).toBe(initialLength + 1);
  });
});
