export interface QuestionChoice {
    id: number;
    choice: string;
    dependent: QuestionChoice;
}