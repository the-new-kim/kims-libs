import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Input,
  inject,
} from '@angular/core';

@Directive({
  selector: '[onClickOutside]',
  standalone: true,
})
export class OnClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();
  @Input() ignoreRefs: (ElementRef | HTMLElement)[] = [];
  private _elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  public onClick(target: EventTarget | null) {
    if (!(target instanceof Node)) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(target);
    const clickedOnIgnored = this.ignoreRefs.some((ref) => {
      const targetElement = ref instanceof ElementRef ? ref.nativeElement : ref;
      return (
        targetElement instanceof HTMLElement && targetElement.contains(target)
      );
    });

    if (!clickedInside && !clickedOnIgnored) {
      this.clickOutside.emit();
    }
  }
}
