import { CaseAnswer } from "./iCaseAnswer";
import { iUser } from "./iUser";

export interface Case {
    id: number;
    approved: string;
    answers: CaseAnswer[];
    user: iUser;
}