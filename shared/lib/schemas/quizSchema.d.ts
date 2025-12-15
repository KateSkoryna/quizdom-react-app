import * as yup from "yup";
import { QuizCategory, Complexity } from "../types";
export declare const answerSchema: yup.ObjectSchema<{
    answer: string;
    isCorrect: NonNullable<boolean | undefined>;
}, yup.AnyObject, {
    answer: undefined;
    isCorrect: undefined;
}, "">;
export declare const questionSchema: yup.ObjectSchema<{
    questionTitle: string;
    answers: {
        answer: string;
        isCorrect: NonNullable<boolean | undefined>;
    }[];
    hint: string | undefined;
}, yup.AnyObject, {
    questionTitle: undefined;
    answers: "";
    hint: undefined;
}, "">;
export declare const quizSchema: yup.ObjectSchema<{
    title: string;
    description: string;
    complexity: NonNullable<Complexity | undefined>;
    category: NonNullable<QuizCategory | undefined>;
    questions: {
        hint?: string | undefined;
        questionTitle: string;
        answers: {
            answer: string;
            isCorrect: NonNullable<boolean | undefined>;
        }[];
    }[];
}, yup.AnyObject, {
    title: undefined;
    description: undefined;
    complexity: undefined;
    category: undefined;
    questions: "";
}, "">;
export type QuizSchemaType = yup.InferType<typeof quizSchema>;
