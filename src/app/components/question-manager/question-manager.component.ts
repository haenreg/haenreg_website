import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuestionChoice } from '../../interfaces/iQuestionChoice';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionType } from '../../interfaces/iQuestion';

@Component({
  selector: 'app-question-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './question-manager.component.html',
  styleUrl: './question-manager.component.scss'
})
export class QuestionManagerComponent implements OnInit, OnChanges {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() type: string = QuestionType.Text;
  @Input() questionChoices: QuestionChoice[] = [];

  public formGroup: FormGroup;
  public types: string[];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: new FormControl(this.title),
      description: new FormControl(this.description),
      type: new FormControl(this.type),
      questionChoices: new FormControl(this.questionChoices)
    });

    this.types = Object.values(QuestionType); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formGroup) {
      this.formGroup.patchValue({
        title: this.title,
        description: this.description,
        type: this.type,
        questionChoices: this.questionChoices
      });
    }
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
