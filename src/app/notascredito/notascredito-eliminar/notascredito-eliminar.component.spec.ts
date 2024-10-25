import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotasCreditoEliminarComponent } from './notascredito-eliminar.component';

describe('NotasCreditoEliminarComponent', () => {
  let component: NotasCreditoEliminarComponent;
  let fixture: ComponentFixture<NotasCreditoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotasCreditoEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasCreditoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
