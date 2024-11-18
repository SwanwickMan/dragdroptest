// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { BlockServiceComponent } from './block-service.component';

// describe('BlockServiceComponent', () => {
//   let component: BlockServiceComponent;
//   let fixture: ComponentFixture<BlockServiceComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [BlockServiceComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BlockServiceComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { BlockServiceComponent } from './block-service.component';

describe('BlockServiceComponent', () => {
  let service: BlockServiceComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockServiceComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return blocks', () => {
    const blocks = service.getBlocks();
    expect(blocks.length).toBeGreaterThan(0);
  });

  it('should add a new block', () => {
    const newBlock = { id: 3, label: 'Block 3', color: 'blue', x: 0, y: 0 };
    service.addBlock(newBlock);
    expect(service.getBlocks().length).toBe(3);
  });
});
