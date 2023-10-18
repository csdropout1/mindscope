import { KeyedPatient, Patient } from '@/types/users';
import {
  DocumentData,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  documentId,
  getDocs,
  query,
  where
} from 'firebase/firestore';

export async function createPatient(
  db: Firestore,
  patient: Patient
): Promise<string> {
  const patientCollection = collection(db, 'patients');
  const newPatient = addDoc(patientCollection, patient);
  return (await newPatient).id;
}

export async function getPatientsData(
  db: Firestore,
  uids: string[]
): Promise<KeyedPatient[]> {
  const patientCollection = collection(db, 'patients');

  const patientQueries: Promise<QuerySnapshot<DocumentData>>[] = [];

  for (let start = 0; start < uids.length; start += 10) {
    const uidsQuery = query(
      patientCollection,
      where(
        documentId(),
        'in',
        uids.slice(start, start + Math.min(10, uids.length - start))
      )
    );

    patientQueries.push(getDocs(uidsQuery));
  }

  const patients: KeyedPatient[] = [];

  const snapshots = await Promise.all(patientQueries);

  snapshots.forEach((document) =>
    patients.push(
      ...document.docs.map((snapshot) => {
        return { id: snapshot.id, name: snapshot.data().name };
      })
    )
  );

  return patients;
}
