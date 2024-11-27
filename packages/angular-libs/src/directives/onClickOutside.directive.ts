import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Input,
} from '@angular/core';

@Directive({
  selector: '[onClickOutside]',
  standalone: true,
})
export class OnClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();
  @Input() ignoreRefs: (ElementRef | HTMLElement)[] = [];

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: EventTarget | null) {
    if (!(target instanceof Node)) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(target);
    const clickedOnIgnored = this.ignoreRefs.some((ref) => {
      if (ref instanceof ElementRef) {
        return ref.nativeElement.contains(target);
      } else {
        return ref.contains(target);
      }
    });

    if (!clickedInside && !clickedOnIgnored) {
      this.clickOutside.emit();
    }
  }
}
