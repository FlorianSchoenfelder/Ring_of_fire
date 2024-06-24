import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerScreenComponent } from './player-screen.component';

describe('PlayerScreenComponent', () => {
  let component: PlayerScreenComponent;
  let fixture: ComponentFixture<PlayerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
