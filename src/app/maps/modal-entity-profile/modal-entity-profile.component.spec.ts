import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEntityProfileComponent } from './modal-entity-profile.component';

describe('ModalEntityProfileComponent', () => {
  let component: ModalEntityProfileComponent;
  let fixture: ComponentFixture<ModalEntityProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEntityProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEntityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
