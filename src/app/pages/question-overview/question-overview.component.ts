import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../interfaces/iQuestion';
import { CommonModule } from '@angular/common';
import { QuestionManagerComponent } from "../../components/question-manager/question-manager.component";

@Component({
  selector: 'app-question-overview',
  standalone: true,
  imports: [CommonModule, QuestionManagerComponent],
  templateUrl: './question-overview.component.html',
  styleUrl: './question-overview.component.scss'
})
export class QuestionOverviewComponent implements OnInit {

  questions: Question[] = [];

  constructor(
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.httpService.getData('questions/get-questions').subscribe((res) => {
      this.questions = res;
    }, (error) => {
      console.error('Error fetching questions!', error);
    });
  }
}
