import { Injectable } from '@angular/core';
import { Question } from '../interfaces/iQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private question: Question | null = null;

  setQuestion(question: Question) {
    this.question = question;
  }

  getQuestion(): Question | null {
    return this.question;
  }
}
