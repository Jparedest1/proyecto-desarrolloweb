import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEliminarComponent } from './producto-eliminar.component';

describe('ProductoEliminarComponent', () => {
  let component: ProductoEliminarComponent;
  let fixture: ComponentFixture<ProductoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
