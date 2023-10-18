import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { getQuestionName } from './questions';
import { CompletedForm } from '@/types/forms';

export async function completedFormExists(db: Firestore, formId: string) {
  const completedFormDoc = doc(db, `completedForms/${formId}`);
  const completedForm = await getDoc(completedFormDoc);
  return completedForm.exists();
}

export async function generateCompletedFormReferences(
  db: Firestore,
  patientId: string,
  providerId: string,
  formId: string
) {
  // Create top level reference
  const userDocument = doc(db, `users/${providerId}`);
  updateDoc(userDocument, {
    completedForms: arrayUnion(formId)
  });

  // Create patient level reference for the user
  const patientInfoCollection = collection(userDocument, `patient_info`);
  const patientInfoDocument = doc(patientInfoCollection, patientId);

  setDoc(
    patientInfoDocument,
    { completedForms: arrayUnion(formId) },
    { merge: true }
  );

  // Create reference inside patient data
  const patientDocument = doc(db, `patients/${patientId}`);

  updateDoc(patientDocument, { completedForms: arrayUnion(formId) });
}

export async function removeOutstandingForm(
  db: Firestore,
  patientId: string,
  providerId: string,
  formId: string
) {
  // Remove top level reference
  const userDocument = doc(db, `users/${providerId}`);
  updateDoc(userDocument, {
    outstandingForms: arrayRemove(formId)
  });

  // Remove patient level reference
  const patientInfoCollection = collection(userDocument, `patient_info`);
  const patientInfoDocument = doc(patientInfoCollection, patientId);

  updateDoc(patientInfoDocument, { outstandingForms: arrayRemove(formId) });

  // Remove reference inside patient data
  const patientDocument = doc(db, `patients/${patientId}`);

  updateDoc(patientDocument, { outstandingForms: arrayRemove(formId) });
}

export async function getCompletedForms(
  db: Firestore,
  formIds: string[]
): Promise<CompletedForm[]> {
  // Create top level reference
  const userDocument = collection(db, `completedForms`);
  const formSnapshots: Promise<DocumentSnapshot<DocumentData>>[] = [];
  for (const formId of formIds) {
    formSnapshots.push(getDoc(doc(userDocument, formId)));
  }

  const snapshots = await Promise.all(formSnapshots);
  const forms: Promise<CompletedForm>[] = [];

  snapshots.forEach((snapshot) => {
    if (snapshot.exists()) {
      const result = async () => {
        return {
          patientId: snapshot.data().patientId,
          providerId: snapshot.data().providerId,
          questionId: snapshot.data().questionId,
          questionName: await getQuestionName(db, snapshot.data().questionId),
          timeCreated: snapshot.data().timeCreated,
          timeCompleted: snapshot.data().timeCompleted,
          answerMap: snapshot.data().answerMap,
          id: snapshot.id
        };
      };
      forms.push(result());
    }
  });

  return await Promise.all(forms);
}
