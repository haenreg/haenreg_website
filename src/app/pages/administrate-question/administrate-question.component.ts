import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Question, QuestionType } from '../../interfaces/iQuestion';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrate-question',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './administrate-question.component.html',
  styleUrl: './administrate-question.component.scss',
})
export class AdministrateQuestionComponent implements OnInit {
  private question: Question;
  public formGroup: FormGroup;
  questionTypes = Object.values(QuestionType);

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.question = this.questionService.getQuestion();

    this.formGroup = this.fb.group({
      title: new FormControl(this.question ? this.question.title : ''),
      description: new FormControl(
        this.question ? this.question.description : ''
      ),
      type: new FormControl(
        this.question ? this.question.type : QuestionType.Text
      ),
    });
  }
}
