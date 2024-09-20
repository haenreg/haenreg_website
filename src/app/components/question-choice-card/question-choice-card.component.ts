import { Component, Input, OnInit } from '@angular/core';
import { DependentQuestionChoice, QuestionChoice } from '../../interfaces/iQuestionChoice';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildChoiceCardComponent } from "../child-choice-card/child-choice-card.component";

@Component({
  selector: 'app-question-choice-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ChildChoiceCardComponent],
  templateUrl: './question-choice-card.component.html',
  styleUrl: './question-choice-card.component.scss'
})
export class QuestionChoiceCardComponent implements OnInit{
  @Input() choice: QuestionChoice;

  public formGroup: FormGroup;
  public children: DependentQuestionChoice[] = [];

    constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      choice: new FormControl(this.choice.choice)
    });
  }

  addChild() {
    const newChild: DependentQuestionChoice = {
      id: -1,
      choice: '321'
    }
    this.children.push(newChild);
  }
}
