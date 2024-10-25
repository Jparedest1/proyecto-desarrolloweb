import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaxmenorComponent } from './ventaxmenor.component';

describe('VentaxmenorComponent', () => {
  let component: VentaxmenorComponent;
  let fixture: ComponentFixture<VentaxmenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaxmenorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaxmenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
