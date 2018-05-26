import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentDialogComponent } from './dialog-content-dialog.component';

describe('DialogContentDialogComponent', () => {
  let component: DialogContentDialogComponent;
  let fixture: ComponentFixture<DialogContentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
