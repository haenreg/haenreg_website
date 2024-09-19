import { QuestionChoice } from './iQuestionChoice';

export interface Question {
  id: number;
  title: string;
  description: string;
  type: string;
  questionChoices: QuestionChoice[];
}
