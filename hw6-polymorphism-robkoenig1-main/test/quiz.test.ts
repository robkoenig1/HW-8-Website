import {
    QuizQuestion,
    ShortAnswerQuestion,
    TrueFalseQuestion,
    MultipleChoiceQuestion,
} from "../src/utilities/question";
import { makeQuiz, gradeQuiz } from "../src/quiz";

// Needed a bunch of test data for this one!
const shortAnswer1 = new ShortAnswerQuestion(
    "Delaware",
    "What is the capital of Delaware?",
    "Dover",
);
const shortAnswer2 = new ShortAnswerQuestion(
    "Maryland",
    "What is the capital of Maryland?",
    "Annapolis",
);
const shortAnswer3 = new ShortAnswerQuestion("Math", "What is 2+2?", "4");
const trueFalse1 = new TrueFalseQuestion(
    "HotDogs",
    "A hotdog is a sandwich.",
    "True",
);
const trueFalse2 = new TrueFalseQuestion(
    "PineapplePizza",
    "Pineapple belongs on pizza.",
    "False",
);
const trueFalse3 = new TrueFalseQuestion(
    "DressColor",
    "The dress is blue and black.",
    "True",
);
// If you pass the person in 3rd place, you BECOME the person in 3rd place.

const multipleChoice1 = new MultipleChoiceQuestion(
    "Race",
    "You're 4th place in a race; what place will you be when you pass the person in 3rd place?",
    "3rd",
    ["1st", "2nd", "3rd", "4th"],
);

// All months have 28 days. One month has exactly 28 days, and the rest have more.
const multipleChoice2 = new MultipleChoiceQuestion(
    "Months",
    "How many months have 28 days?",
    "All",
    ["1", "2", "12"],
);
// The LLM generated this one. I guess that's the answer!
const multipleChoice3 = new MultipleChoiceQuestion(
    "Riddles",
    "The more you take, the more you leave behind. What am I?",
    "Footsteps",
    ["Footsteps", "Time", "Money", "Memories"],
);

let ALL_QUESTIONS: QuizQuestion[] = [
    shortAnswer1,
    trueFalse1,
    multipleChoice1,
    shortAnswer2,
    trueFalse2,
    multipleChoice2,
    shortAnswer3,
    trueFalse3,
    multipleChoice3,
];

describe("Quiz", () => {
    describe("makeQuiz Function", () => {
        test("(1 pts) handle empty case", () => {
            expect(makeQuiz([])).toBe("");
        });
        test("(2 pts) a basic quiz", () => {
            let questions: QuizQuestion[] = [
                shortAnswer1,
                trueFalse1,
                multipleChoice1,
            ];
            expect(makeQuiz(questions)).toBe(
                "What is the capital of Delaware?\n> \n" +
                    "A hotdog is a sandwich.\n" +
                    "> True or False?\n" +
                    "You're 4th place in a race; what place will you be when you pass the person in 3rd place?" +
                    "\n1. 1st\n2. 2nd\n3. 3rd\n4. 4th\n> ",
            );
        });
        test("(3 pts) a more complex quiz", () => {
            expect(makeQuiz(ALL_QUESTIONS)).toBe(
                "What is the capital of Delaware?\n> \n" +
                    "A hotdog is a sandwich.\n" +
                    "> True or False?\n" +
                    "You're 4th place in a race; what place will you be when you pass the person in 3rd place?" +
                    "\n1. 1st\n2. 2nd\n3. 3rd\n4. 4th\n> \n" +
                    "What is the capital of Maryland?\n> \n" +
                    "Pineapple belongs on pizza.\n" +
                    "> True or False?\n" +
                    "How many months have 28 days?\n" +
                    "1. 1\n2. 2\n3. 12\n> \n" +
                    "What is 2+2?\n> \n" +
                    "The dress is blue and black.\n" +
                    "> True or False?\n" +
                    "The more you take, the more you leave behind." +
                    " What am I?\n1. Footsteps\n2. Time\n3. Money\n4. Memories\n> ",
            );
        });
    });
    describe("gradeQuiz Function", () => {
        test("(1 pts) handle empty case", () => {
            expect(gradeQuiz([], [])).toBe(0);
        });
        test("(1 pts) a basic quiz (all correct)", () => {
            let questions: QuizQuestion[] = [
                shortAnswer1,
                trueFalse1,
                multipleChoice1,
            ];
            expect(gradeQuiz(questions, ["Dover", "True", "3rd"])).toBe(3);
        });
        test("(1 pts) a basic quiz (all wrong)", () => {
            let questions: QuizQuestion[] = [
                shortAnswer1,
                trueFalse1,
                multipleChoice1,
            ];
            expect(gradeQuiz(questions, ["Wilmington", "false", "4th"])).toBe(
                0,
            );
        });
        test("(1 pts) a basic quiz (some right)", () => {
            let questions: QuizQuestion[] = [
                shortAnswer1,
                trueFalse1,
                multipleChoice1,
            ];
            expect(gradeQuiz(questions, ["Dover", "false", "3rd"])).toBe(2);
        });
        test("(1 pts) a more complex quiz (all correct)", () => {
            expect(
                gradeQuiz(ALL_QUESTIONS, [
                    "Dover",
                    "True",
                    "3rd",
                    "Annapolis",
                    "False",
                    "All",
                    "4",
                    "True",
                    "Footsteps",
                ]),
            ).toBe(9);
        });
        test("(1 pts) a more complex quiz (all wrong)", () => {
            expect(
                gradeQuiz(ALL_QUESTIONS, [
                    "Wilmington",
                    "false",
                    "4th",
                    "Baltimore",
                    "true",
                    "1",
                    "5",
                    "False",
                    "Time",
                ]),
            ).toBe(0);
        });
        test("(1 pts) a more complex quiz (some right)", () => {
            expect(
                gradeQuiz(ALL_QUESTIONS, [
                    "Dover",
                    "false",
                    "3rd",
                    "Annapolis",
                    "False",
                    "All",
                    "4",
                    "True",
                    "Money",
                ]),
            ).toBe(7);
        });
    });
});
