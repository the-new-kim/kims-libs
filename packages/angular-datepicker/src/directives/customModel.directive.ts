import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[libCustomModel]',
  standalone: true,
})
export class CustomModelDirective {
  @Input() appModel: unknown;
  @Output() appModelChange = new EventEmitter<unknown>();

  // input 이벤트가 발생할 때마다 모델 값을 변경하고 부모 컴포넌트에 알림
  @HostListener('input', ['$event.target.value'])
  onInputChange(newValue: unknown) {
    this.appModelChange.emit(newValue); // 부모 컴포넌트에 변경된 값 알림
  }
}
