import { createQuestionSet } from '@/data/questions';
import { QuestionSet } from '@/types/questions';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useFirestore } from 'reactfire';

const phq9Responses = [
  '0 - Not at all',
  '1 - Several days',
  '2 - More than half',
  '3 - Nearly everyday'
];

const phq9Questions = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
  'Trouble concentrating on things, such as reading the newspaper or watching television',
  'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
  'Thoughts that you would be better off dead or of hurting yourself in some way'
];

function createQuestion(key: string, question: string, responses: string[]) {
  return {
    key: key,
    question: question,
    responses: responses
  };
}

function PHQ9(): QuestionSet {
  return {
    name: 'PHQ-9',
    prompt:
      'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    questions: phq9Questions.map((question, index) =>
      createQuestion(index.toString(), question, phq9Responses)
    )
  };
}

export default function CreateForm() {
  const db = useFirestore();
  const createPHQ9 = useCallback(() => {
    const form = PHQ9();
    createQuestionSet(db, form);
  }, [db]);
  return <Button onClick={createPHQ9}>Create PHQ9 Questions</Button>;
}
