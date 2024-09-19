import { QuestionChoice } from './iQuestionChoice';

export interface Question {
  id: number;
  title: string;
  description: string;
  type: QuestionType;
  questionChoices: QuestionChoice[];
}

export enum QuestionType {
  Date = 'DATE',
  Text = 'TEXT',
  SelectOne = 'SELECT_ONE',
  MultiSelect = 'MULTI_SELECT',
  Scale = 'SCALE',
  YesNo = 'YES_NO',
}
