import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFilteringComponent } from './basic-filtering.component';

describe('BasicFilteringComponent', () => {
  let component: BasicFilteringComponent;
  let fixture: ComponentFixture<BasicFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicFilteringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
