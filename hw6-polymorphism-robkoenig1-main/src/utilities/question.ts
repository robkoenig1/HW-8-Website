/*

*/

export abstract class QuizQuestion {
    constructor(
        protected title: string,
        protected body: string,
        protected expectedAnswer: string,
    ) {}

    check(studentAnswer: string): boolean {
        return this.expectedAnswer === studentAnswer;
    }
    abstract ask(): string;
}

export class ShortAnswerQuestion extends QuizQuestion {
    ask() {
        return this.body + "\n" + "> ";
    }
}

export class TrueFalseQuestion extends QuizQuestion {
    ask() {
        return this.body + "\n> True or False?";
    }
    check(studentAnswer: string): boolean {
        return (
            studentAnswer.toLowerCase() === this.expectedAnswer.toLowerCase()
        );
    }
}

export class MultipleChoiceQuestion extends QuizQuestion {
    constructor(
        title: string,
        body: string,
        expectedAnswer: string,
        protected options: string[],
    ) {
        super(title, body, expectedAnswer);
    }
    ask() {
        let parts = [];
        for (let i = 0; i < this.options.length; i++) {
            parts.push(i + 1 + ". " + this.options[i] + "\n");
        }
        return this.body + "\n" + parts.join("") + "> ";
    }
}
