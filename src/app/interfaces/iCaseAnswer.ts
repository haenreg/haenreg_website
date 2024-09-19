import { AnswerChoice } from "./iAnswerChoice";
import { Question } from "./iQuestion";

export interface CaseAnswer {
    id: number;
    answer: string;
    question: Question;
    answerChoices: AnswerChoice[];
}