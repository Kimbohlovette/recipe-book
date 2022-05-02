import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  'selector': 'app-alert',
  'templateUrl': './alert.component.html'
})

export class AlertComponent {
  @Input() message!: string;
  @Output() close: EventEmitter<void> = new EventEmitter()
  onClose(){
    this.close.emit()
  }
}