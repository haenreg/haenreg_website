import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Question } from '../../interfaces/iQuestion';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from '../../components/question-card/question-card.component';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-manage-questions-page',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent],
  templateUrl: './manage-questions-page.component.html',
  styleUrl: './manage-questions-page.component.scss',
})
export class ManageQuestionsPageComponent implements OnInit {
  public questions: Question[] = [];

  constructor(
    private httpService: HttpService,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.httpService.getData('questions/get-questions').subscribe((res) => {
      this.questions = res;
    });
  }

  onQuestionClick(question?: Question) {
    this.questionService.setQuestion(question);
    this.router.navigate(['/administrate-question']);
  }
}
