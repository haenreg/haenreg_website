import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/iQuestion';

@Component({
  selector: 'app-administrate-question',
  standalone: true,
  imports: [],
  templateUrl: './administrate-question.component.html',
  styleUrl: './administrate-question.component.scss',
})
export class AdministrateQuestionComponent implements OnInit {
  private question: Question;
  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.question = this.questionService.getQuestion();

    console.log(this.question);
  }
}
