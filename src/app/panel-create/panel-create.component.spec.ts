import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCreateComponent } from './panel-create.component';

describe('PanelCreateComponent', () => {
  let component: PanelCreateComponent;
  let fixture: ComponentFixture<PanelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
