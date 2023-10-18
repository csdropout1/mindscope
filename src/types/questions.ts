export type QuestionRequest = {
  type: QuestionType;
};

export type QuestionResponse = {
  questions: Question[];
};

export type QuestionType = { id: string; name: string };

export type Question = { key: string; question: string; responses: string[] };

export type QuestionSet = {
  name: string;
  prompt: string;
  questions: Question[];
};

export type KeyedQuestionSet = {
  key: string;
  name: string;
  prompt: string;
  questions: Question[];
};
