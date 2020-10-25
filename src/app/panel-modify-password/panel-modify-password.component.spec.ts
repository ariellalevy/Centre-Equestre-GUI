import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelModifyPasswordComponent } from './panel-modify-password.component';

describe('PanelModifyPasswordComponent', () => {
  let component: PanelModifyPasswordComponent;
  let fixture: ComponentFixture<PanelModifyPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelModifyPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelModifyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
