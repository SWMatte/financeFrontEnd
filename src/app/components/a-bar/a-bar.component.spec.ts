import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABarComponent } from './a-bar.component';

describe('ABarComponent', () => {
  let component: ABarComponent;
  let fixture: ComponentFixture<ABarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ABarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
