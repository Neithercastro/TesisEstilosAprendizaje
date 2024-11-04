import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesDetallesComponent } from './actividades-detalles.component';

describe('ActividadesDetallesComponent', () => {
  let component: ActividadesDetallesComponent;
  let fixture: ComponentFixture<ActividadesDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesDetallesComponent]
    });
    fixture = TestBed.createComponent(ActividadesDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
