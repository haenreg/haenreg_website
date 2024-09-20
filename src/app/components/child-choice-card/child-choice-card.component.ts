import { Component, Input, OnInit } from '@angular/core';
import { DependentQuestionChoice } from '../../interfaces/iQuestionChoice';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-child-choice-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './child-choice-card.component.html',
  styleUrl: './child-choice-card.component.scss'
})
export class ChildChoiceCardComponent implements OnInit{
  public formGroup: FormGroup;

  @Input() child: DependentQuestionChoice;

    constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      choice: new FormControl(this.child.choice)
    });
  }
}
