import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaxmayorComponent } from './ventaxmayor.component';

describe('VentaxmayorComponent', () => {
  let component: VentaxmayorComponent;
  let fixture: ComponentFixture<VentaxmayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaxmayorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaxmayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
