import { Component, Input } from '@angular/core';
import { CaseAnswer } from '../../interfaces/iCaseAnswer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent {
  @Input() answer: any[] = [];
  @Input() title: string = '';
  @Input() description: string = '';
}
