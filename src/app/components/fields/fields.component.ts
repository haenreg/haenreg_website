import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.scss',
})
export class FieldsComponent {
  @Input() questionTitle: string = 'Titel';
  @Input() description: string = 'description';

  @Input() answer: string = 'Det hentede svar';
}
