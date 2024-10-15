import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmaLasPalabrasComponent } from './arma-las-palabras.component';

describe('ArmaLasPalabrasComponent', () => {
  let component: ArmaLasPalabrasComponent;
  let fixture: ComponentFixture<ArmaLasPalabrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmaLasPalabrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmaLasPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
