import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneStoreItemComponent } from './gestione-store-item.component';

describe('GestioneStoreItemComponent', () => {
  let component: GestioneStoreItemComponent;
  let fixture: ComponentFixture<GestioneStoreItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneStoreItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneStoreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
