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
import { QuestionChoice } from '../../interfaces/iQuestionChoice';
import { QuestionChoiceCardComponent } from "../../components/question-choice-card/question-choice-card.component";
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-administrate-question',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, QuestionChoiceCardComponent],
  templateUrl: './administrate-question.component.html',
  styleUrl: './administrate-question.component.scss',
})
export class AdministrateQuestionComponent implements OnInit {
  private question: Question;
  public formGroup: FormGroup;
  public questionTypes = Object.values(QuestionType);
  public questionChoice: QuestionChoice[] = [];

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    private httpService: HttpService,
  ) {}

  ngOnInit() {
    this.question = this.questionService.getQuestion();
    if (this.question) {
      this.questionChoice = this.question.questionChoices;
    }

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

  addChoice() {
    const newChoice: QuestionChoice = {
      choice: '',
      id: -1,
      dependent: [],
    }
    this.questionChoice.push(newChoice);
  }

  removeChoice(index: number) {
    this.questionChoice.splice(index, 1);
  }

  save() {
    const questionReq: QuestionRequest = {
      title: this.formGroup.get('title').value,
      description: this.formGroup.get('description').value,
      type: this.formGroup.get('type').value,
      questionChoices: this.questionChoice
    }
    let url = '';

    console.log(questionReq);

    if (this.question) {
      url = `questions/update-question/${this.question.id}`;
    } else {
      url = 'questions/create-question';
    }
    this.httpService.postData(url, questionReq).subscribe(res => {
      console.log(res);
    })
  }
}


export interface QuestionRequest {
  title: string;
  description: string;
  type: string;
  questionChoices: QuestionChoice[];
}