import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDescartesComponent } from './table-descartes.component';

describe('TableDescartesComponent', () => {
  let component: TableDescartesComponent;
  let fixture: ComponentFixture<TableDescartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDescartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDescartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
