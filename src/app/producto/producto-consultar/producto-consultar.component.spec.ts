import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoConsultarComponent } from './producto-consultar.component';

describe('ProductoConsultarComponent', () => {
  let component: ProductoConsultarComponent;
  let fixture: ComponentFixture<ProductoConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoConsultarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
