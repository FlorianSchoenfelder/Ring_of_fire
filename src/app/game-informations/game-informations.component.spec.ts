import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInformationsComponent } from './game-informations.component';

describe('GameInformationsComponent', () => {
  let component: GameInformationsComponent;
  let fixture: ComponentFixture<GameInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
