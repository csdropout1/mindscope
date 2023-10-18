import * as React from 'react';
import Drawers from '@/components/Charlie/_drawer';
import {
  createAnswerDocument,
  getQuestionSet,
  getUserForm
} from '@/data/questions';
import { Firestore } from 'firebase/firestore';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useFirestore } from 'reactfire';
import Header from '@/components/subpages/Header';
import { useRouter } from 'next/router';
import { Form } from '@/types/forms';
import { FormLayout } from '@/components/subpages/Form';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const formId = ctx.params['formId'] as string;

  return {
    props: {
      formId: formId
    }
  };
};

async function uploadResults(
  db: Firestore,
  providerId: string,
  questionId: string,
  formId: string,
  answerMap: { id: string; answer: string }[]
) {
  createAnswerDocument(db, providerId, questionId, formId, answerMap);
}

function PatientForm({
  formId
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentForm, updateCurrentForm] = React.useState(null);
  const [currentQuestionSet, updateQuestionSet] = React.useState(null);
  const db = useFirestore();
  const router = useRouter();

  React.useEffect(() => {
    getUserForm(db, formId).then((value) =>
      updateCurrentForm(value.data() as unknown as Form)
    );
  }, [db, formId]);

  React.useEffect(() => {
    if (currentForm && currentForm.questionId) {
      getQuestionSet(db, currentForm.questionId).then((value) => {
        if (value !== undefined) {
          updateQuestionSet(value);
        }
      });
    }
  }, [db, currentForm]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const answerMap: { id: string; answer: string }[] = [];
    for (const [key, value] of data.entries()) {
      answerMap.push({ id: key, answer: value as string });
    }
    uploadResults(
      db,
      currentForm.providerId,
      currentForm.questionId,
      formId,
      answerMap
    );
    router.push('/submit');
  };

  return (
    <>
      <Header />
      <Drawers />
      <FormLayout
        onSubmit={onSubmit}
        currentQuestionSet={currentQuestionSet}
        answers={[]}
        subtitle=""
      />
    </>
  );
}
export default PatientForm;
