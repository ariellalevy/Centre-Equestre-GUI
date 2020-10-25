import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPlanningComponent } from './panel-planning.component';

describe('PanelPlanningComponent', () => {
  let component: PanelPlanningComponent;
  let fixture: ComponentFixture<PanelPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
