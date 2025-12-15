"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizSchema = exports.questionSchema = exports.answerSchema = void 0;
const yup = __importStar(require("yup"));
const types_1 = require("../types");
// Answer validation schema
exports.answerSchema = yup.object().shape({
    answer: yup
        .string()
        .required("Answer text is required")
        .trim()
        .min(1, "Answer text cannot be empty"),
    isCorrect: yup.boolean().required("isCorrect field is required"),
});
// Question validation schema
exports.questionSchema = yup.object().shape({
    questionTitle: yup
        .string()
        .required("Question title is required")
        .trim()
        .min(4, "Question title must be at least 4 characters long")
        .max(200, "Question title must be at most 200 characters long"),
    answers: yup
        .array()
        .of(exports.answerSchema)
        .min(2, "Each question must have at least 2 answers")
        .max(6, "Each question must have at most 6 answers")
        .required("Answers are required")
        .test("has-correct-answer", "Each question must have at least one correct answer", (answers) => {
        if (!answers)
            return false;
        return answers.some((answer) => answer.isCorrect === true);
    }),
    hint: yup.string().trim().optional(),
});
// Quiz validation schema
exports.quizSchema = yup.object().shape({
    title: yup
        .string()
        .required("Quiz title is required")
        .trim()
        .min(3, "Quiz title must be at least 3 characters long")
        .max(100, "Quiz title must be at most 100 characters long"),
    description: yup
        .string()
        .required("Quiz description is required")
        .trim()
        .min(10, "Quiz description must be at least 10 characters long")
        .max(500, "Quiz description must be at most 500 characters long"),
    complexity: yup
        .mixed()
        .oneOf(Object.values(types_1.Complexity), "Invalid complexity level")
        .required("Complexity is required"),
    category: yup
        .mixed()
        .oneOf(Object.values(types_1.QuizCategory), "Invalid category")
        .required("Category is required"),
    questions: yup
        .array()
        .of(exports.questionSchema)
        .min(1, "Quiz must have at least one question")
        .max(50, "Quiz must have at most 50 questions")
        .required("Questions are required"),
});
