import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEliminarComponent } from './cliente-eliminar.component';

describe('ClienteEliminarComponent', () => {
  let component: ClienteEliminarComponent;
  let fixture: ComponentFixture<ClienteEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
