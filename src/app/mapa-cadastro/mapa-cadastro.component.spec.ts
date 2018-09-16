import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaCadastroComponent } from './mapa-cadastro.component';

describe('MapaCadastroComponent', () => {
  let component: MapaCadastroComponent;
  let fixture: ComponentFixture<MapaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
