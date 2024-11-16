import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLibraryComponent } from './block-library.component';

describe('BlockLibraryComponent', () => {
  let component: BlockLibraryComponent;
  let fixture: ComponentFixture<BlockLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
