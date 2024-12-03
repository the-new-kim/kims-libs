import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OnClickOutsideDirective } from './onClickOutside.directive';

@Component({
  template: `
    <div onClickOutside (clickOutside)="onOutsideClick()">
      <button class="inside-button">Inside Button</button>
    </div>
    <button class="outside-button">Outside Button</button>
    <div class="ignore-button"></div>
  `,
})
class TestHostComponent {
  outsideClickTriggered = false;
  onOutsideClick() {
    this.outsideClickTriggered = true;
  }
}

describe('OnClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [OnClickOutsideDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance of the directive', () => {
    const directiveEl = fixture.debugElement.query(
      By.directive(OnClickOutsideDirective)
    );
    expect(directiveEl).toBeTruthy();
  });

  it('should emit clickOutside when clicked outside of the host element', () => {
    const outsideButton = fixture.debugElement.query(By.css('.outside-button'));
    outsideButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.outsideClickTriggered).toBe(true);
  });

  it('should not emit clickOutside when clicked inside the host element', () => {
    const insideButton = fixture.debugElement.query(By.css('.inside-button'));
    insideButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.outsideClickTriggered).toBe(false);
  });

  it('should not emit clickOutside when clicked on an ignored element', () => {
    const directiveInstance = fixture.debugElement
      .query(By.directive(OnClickOutsideDirective))
      .injector.get(OnClickOutsideDirective);
    const ignoreButton = fixture.debugElement.query(By.css('.ignore-button'));

    // Set the ignoreRefs with correct reference and make sure Angular detects the change
    directiveInstance.ignoreRefs = [ignoreButton.nativeElement];
    fixture.detectChanges();

    // Click on the ignored element
    ignoreButton.nativeElement.click();
    fixture.detectChanges();

    // Verify that clickOutside was not triggered
    expect(component.outsideClickTriggered).toBe(false);
  });
});
