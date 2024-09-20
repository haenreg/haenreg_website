export interface QuestionChoice {
    id: number;
    choice: string;
    dependent: DependentQuestionChoice[];
}

export interface DependentQuestionChoice {
    id: number;
    choice: string;
}