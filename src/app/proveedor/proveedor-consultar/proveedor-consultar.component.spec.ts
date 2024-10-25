import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorConsultarComponent } from './proveedor-consultar.component';

describe('ProveedorConsultarComponent', () => {
  let component: ProveedorConsultarComponent;
  let fixture: ComponentFixture<ProveedorConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorConsultarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
