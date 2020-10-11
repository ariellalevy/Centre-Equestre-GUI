import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAcceuilComponent } from './panel-acceuil.component';

describe('PanelAcceuilComponent', () => {
  let component: PanelAcceuilComponent;
  let fixture: ComponentFixture<PanelAcceuilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAcceuilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
