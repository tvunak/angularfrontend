import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAddressModalComponent } from './delete-address-modal.component';

describe('DeleteAddressModalComponent', () => {
  let component: DeleteAddressModalComponent;
  let fixture: ComponentFixture<DeleteAddressModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAddressModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
