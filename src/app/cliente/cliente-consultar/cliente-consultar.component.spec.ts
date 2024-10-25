import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteConsultarComponent } from './cliente-consultar.component';

describe('ClienteConsultarComponent', () => {
  let component: ClienteConsultarComponent;
  let fixture: ComponentFixture<ClienteConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteConsultarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
