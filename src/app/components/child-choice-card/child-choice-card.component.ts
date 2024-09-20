import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() emitChildrenChange: EventEmitter<any> = new EventEmitter();

    constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      choice: new FormControl(this.child.choice)
    });
    this.formGroup.get('choice').valueChanges.subscribe(value => {
      this.child.choice = value;
    });
  }
}
