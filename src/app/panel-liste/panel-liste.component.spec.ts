import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelListeComponent } from './panel-liste.component';

describe('PanelListeComponent', () => {
  let component: PanelListeComponent;
  let fixture: ComponentFixture<PanelListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
