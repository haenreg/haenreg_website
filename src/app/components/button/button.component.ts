import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() buttonText: string = '';
  @Input() buttonIcon: string = '';
  @Output() onButtonClicked: EventEmitter<void> = new EventEmitter();

  handleClick() {
    this.onButtonClicked.emit();
  }

}
