import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondPagePage } from './second-page.page';

describe('SecondPagePage', () => {
  let component: SecondPagePage;
  let fixture: ComponentFixture<SecondPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
