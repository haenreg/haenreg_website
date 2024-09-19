import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Question } from '../../interfaces/iQuestion';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from '../../components/question-card/question-card.component';

@Component({
  selector: 'app-manage-questions-page',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent],
  templateUrl: './manage-questions-page.component.html',
  styleUrl: './manage-questions-page.component.scss',
})
export class ManageQuestionsPageComponent implements OnInit {
  public questions: Question[] = [];

  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    this.httpService.getData('questions/get-questions').subscribe((res) => {
      this.questions = res;
    });
  }
}
