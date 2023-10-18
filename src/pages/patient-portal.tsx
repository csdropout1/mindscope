import * as React from 'react';
import { TextField, Box, ListItemButton } from '@mui/material/';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import Header from '@/components/subpages/Header';
import { addPatientId, subscribeToUser } from '@/data/user';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { createPatient, getPatientsData } from '@/data/patients';
import NewPatientFormDialog from '@/components/subpages/NewPatient';
import { KeyedPatient, Patient } from '@/types/users';
import { useFirestore, useUser } from 'reactfire';
import { useRouter } from 'next/router';
import GuardedPage from '@/components/subpages/GuardedPage';

function Portal() {
  const router = useRouter();
  const db = useFirestore();
  const { data: userData, status: userStatus } = useUser();
  const [patientsState, setPatients] = useState([] as KeyedPatient[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDocument, setUserDocument] = useState(null);

  const addPatient = React.useCallback<(patient: Patient) => Promise<void>>(
    async (patient) => {
      if (userStatus === 'success') {
        const uid = await createPatient(db, patient);
        addPatientId(db, userData.uid, uid);
      }
    },
    [db, userData, userStatus]
  );

  const filterData = (query: string, data: KeyedPatient[]) => {
    if (!query) {
      return data;
    } else {
      return data.filter((el) =>
        el.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  };
  const dataFiltered = filterData(searchQuery, patientsState);

  const documentSubscriber = (snapshot: DocumentSnapshot<DocumentData>) => {
    setUserDocument(snapshot.data());
  };

  useEffect(() => {
    if (userStatus === 'success') {
      const unsubscriber = subscribeToUser(
        db,
        documentSubscriber,
        userData.uid
      );
      return unsubscriber;
    }
  }, [db, userData, userStatus]);

  useEffect(() => {
    if (userDocument !== null) {
      getPatientsData(db, userDocument.patients).then((patients) => {
        setPatients(patients);
      });
    }
  }, [db, userDocument]);

  const onClickPatient = (patientId: string) => {
    router.push(`/patient/${patientId}`);
  };

  return (
    <div>
      <Box sx={{ ml: '5%', mt: '2%', mr: '5%' }}>
        <Box sx={{ mt: '1%' }}></Box>
        <h1 className={styles.mainheading}>Dashboard</h1>
        <Box sx={{ mt: '0.5%', mb: '1%' }}>
          <NewPatientFormDialog callback={addPatient} />
        </Box>
        <TextField
          variant="filled"
          sx={{ backgroundColor: 'white', borderRadius: 5 }}
          label="Search for Patients"
          placeholder="Enter Patient Name"
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
        <Box sx={{ mb: '2%' }}></Box>
        <ul>
          {dataFiltered.map((patient: KeyedPatient) => (
            <Box key={patient.name}>
              <ListItemButton
                sx={{
                  backgroundColor: '#34497980',
                  borderRadius: 50,
                  mt: '1%'
                }}
                onClick={() => onClickPatient(patient.id)}
              >
                {patient.name}
              </ListItemButton>
            </Box>
          )) ?? 'No patients'}
        </ul>
      </Box>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <GuardedPage inverted={false} destination={'/'}>
        <>
          <Header />
          <Portal />
        </>
      </GuardedPage>
    </>
  );
}

export default Dashboard;
