import { CompletedForm } from '@/types/forms';
import { KeyedQuestionSet, QuestionSet, QuestionType } from '@/types/questions';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';

const generic_questions_index_id = 'generic_questions_index';
const generic_questions_id = 'generic_questions';

export async function createQuestionSet(
  db: Firestore,
  form: QuestionSet
): Promise<void> {
  const questionsIndexCollection = collection(db, 'generic_questions_index');
  const questionsIndexDoc = await addDoc(questionsIndexCollection, {
    name: form.name
  });

  const questionsCollection = collection(db, 'generic_questions');
  setDoc(doc(questionsCollection, questionsIndexDoc.id), form);
}

export async function getGenericQuestionTypes(
  db: Firestore
): Promise<QuestionType[]> {
  const question_collection_index = collection(db, generic_questions_index_id);
  const all_docs = await getDocs(question_collection_index);
  const question_types = all_docs.docs.map((snapshot) => {
    return {
      id: snapshot.id,
      name: snapshot.data()['name']
    };
  });
  return question_types;
}

export async function getQuestionSet(
  db: Firestore,
  id: string
): Promise<KeyedQuestionSet> {
  const question_collection = collection(db, generic_questions_id);

  const querySnapshot = await getDoc(doc(question_collection, id));
  const value: KeyedQuestionSet = {
    key: querySnapshot.id,
    name: querySnapshot.get('name'),
    prompt: querySnapshot.get('prompt'),
    questions: querySnapshot.get('questions')
  };
  return value;
}

export async function createAnswerDocument(
  db: Firestore,
  providerId: string,
  questionId: string,
  formId: string,
  answerMap: { id: string; answer: string }[]
) {
  const formsDocument = doc(db, `completedForms/${formId}`);
  // There are very limited permissions
  // A user can create a completedForm but cannot update one
  // Can only create a completedForm for an existing formId
  setDoc(formsDocument, {
    providerId: providerId,
    answerMap: answerMap,
    questionId: questionId,
    timeCompleted: Timestamp.now()
  });
}

async function createOutstandingForm(
  db: Firestore,
  patientId: string,
  providerId: string,
  formId: string
): Promise<void> {
  // Create top level reference
  const userDocument = doc(db, `users/${providerId}`);
  updateDoc(userDocument, {
    outstandingForms: arrayUnion(formId)
  });

  // create patient level reference
  const patientInfoCollection = collection(userDocument, `patient_info`);
  const patientInfoDocument = doc(patientInfoCollection, patientId);

  setDoc(
    patientInfoDocument,
    { outstandingForms: arrayUnion(formId) },
    { merge: true }
  );

  // Create reference inside patient data
  const patientDocument = doc(db, `patients/${patientId}`);

  updateDoc(patientDocument, { outstandingForms: arrayUnion(formId) });
}

export async function getQuestionName(
  db: Firestore,
  id: string
): Promise<string> {
  const question_collection_index = collection(db, generic_questions_index_id);
  const question = await getDoc(doc(question_collection_index, id));
  return question.data().name;
}

export async function getForms(
  db: Firestore,
  formIds: string[]
): Promise<CompletedForm[]> {
  // Create top level reference
  const userDocument = collection(db, `forms`);
  const formSnapshots: Promise<DocumentSnapshot<DocumentData>>[] = [];
  for (const formId of formIds) {
    formSnapshots.push(getDoc(doc(userDocument, formId)));
  }

  const snapshots = await Promise.all(formSnapshots);
  const forms: Promise<CompletedForm>[] = snapshots.map(async (snapshot) => ({
    patientId: snapshot.data().patientId,
    providerId: snapshot.data().providerId,
    questionId: snapshot.data().questionId,
    questionName: await getQuestionName(db, snapshot.data().questionId),
    timeCreated: snapshot.data().timeCreated,
    timeCompleted: snapshot.data().timeCompleted,
    answerMap: snapshot.data().answerMap,
    id: snapshot.id
  }));

  return await Promise.all(forms);
}

export async function generateQuestionForm(
  db: Firestore,
  patientId: string,
  providerId: string,
  questionId: string
): Promise<string> {
  const formCollection = collection(db, 'forms');
  const form = await addDoc(formCollection, {
    patientId: patientId,
    providerId: providerId,
    questionId: questionId,
    timeCreated: Timestamp.now()
  });
  // do not wait for this result!
  createOutstandingForm(db, patientId, providerId, form.id);
  return form.id;
}

export async function generateQuestionLink(
  db: Firestore,
  patientId: string,
  providerId: string,
  questionId: string,
  baseUrl: string
) {
  const id = await generateQuestionForm(db, patientId, providerId, questionId);
  return `${baseUrl}/forms/${id}`;
}

export async function getUserForm(db: Firestore, formId: string) {
  const formCollection = collection(db, 'forms');
  return await getDoc(doc(formCollection, formId));
}
