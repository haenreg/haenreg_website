import { CaseAnswer } from "./iCaseAnswer";

export interface Case {
    id: number;
    approved: string;
    answers: CaseAnswer[];
}