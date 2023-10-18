import * as React from 'react';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';

import { ListItemButton, List, Box, Typography } from '@mui/material/';
import Header from '@/components/subpages/Header';
import { Patient } from '@/types/users';
import { collection, doc } from 'firebase/firestore';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  generateQuestionLink,
  getForms,
  getGenericQuestionTypes
} from '@/data/questions';
import { QuestionType } from '@/types/questions';
import { useRouter } from 'next/router';
import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreDocDataOnce,
  useUser
} from 'reactfire';
import { CompletedForm } from '@/types/forms';
import { FormDialog } from '@/components/subpages/FormDialog';
import GuardedPage, { Loading } from '@/components/subpages/GuardedPage';
import {
  completedFormExists,
  generateCompletedFormReferences,
  getCompletedForms,
  removeOutstandingForm
} from '@/data/form';

function CompletedForms({
  completedForms
}: {
  completedForms: CompletedForm[];
}) {
  const router = useRouter();
  const handleClick = (formId: string) => {
    router.push(`/completed-form/${formId}`);
  };

  return (
    <>
      {completedForms.length > 0 && (
        <>
          <Typography variant="h4">Completed Forms</Typography>
          <List>
            {completedForms.map((completedForm) => {
              return (
                <Box key={completedForm.id}>
                  <ListItemButton
                    sx={{
                      backgroundColor: '#34497980',
                      borderRadius: 50,
                      mt: '1%'
                    }}
                    onClick={() => handleClick(completedForm.id)}
                  >
                    {`${
                      completedForm.questionName
                    } form completed ${completedForm.timeCompleted
                      .toDate()
                      .toLocaleString()}`}
                  </ListItemButton>
                </Box>
              );
            })}
          </List>
        </>
      )}
    </>
  );
}

function OutstandingForms({
  host,
  outstandingForms
}: {
  host: string;
  outstandingForms: CompletedForm[];
}) {
  const [open, setOpen] = React.useState(false);
  const [formId, setFormId] = useState<string>('');

  const handleClickOpen = (formId: string) => {
    setFormId(`${host}/forms/${formId}`);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {outstandingForms.length > 0 && (
        <>
          <FormDialog
            title={'Resend Form'}
            open={open}
            handleClose={handleClose}
            formId={formId}
          />
          <>
            <Typography variant="h4">Sent Forms</Typography>
            <List>
              {outstandingForms.map((outstandingForm) => (
                <Box key={outstandingForm.id}>
                  <ListItemButton
                    sx={{
                      backgroundColor: '#34497980',
                      borderRadius: 50,
                      mt: '1%'
                    }}
                    onClick={() => handleClickOpen(outstandingForm.id)}
                  >
                    {`${
                      outstandingForm.questionName
                    } form created ${outstandingForm.timeCreated
                      .toDate()
                      .toLocaleString()}`}
                  </ListItemButton>
                </Box>
              ))}
            </List>
          </>
        </>
      )}
    </>
  );
}

function PatientForms({
  host,
  patientId,
  userId
}: {
  host: string;
  patientId: string;
  userId: string;
}) {
  const db = useFirestore();
  const [outstandingForms, setOutstandingForms] = useState(
    [] as CompletedForm[]
  );
  const [completedForms, setCompletedForms] = useState([] as CompletedForm[]);
  const { status, data } = useFirestoreDocData(
    doc(db, `users/${userId}/patient_info/${patientId}`)
  );

  React.useEffect(() => {
    if (status === 'success') {
      if (data != undefined) {
        if (data.outstandingForms) {
          getForms(db, data.outstandingForms).then((form) =>
            setOutstandingForms(form)
          );
        }
        if (data.completedForms) {
          getCompletedForms(db, data.completedForms).then((form) => {
            setCompletedForms(form);
          });
        }
      }
    }
  }, [db, status, data]);

  // Check for completed forms
  React.useEffect(() => {
    outstandingForms.forEach((form) => {
      completedFormExists(db, form.id).then((exists) => {
        if (exists) {
          generateCompletedFormReferences(
            db,
            form.patientId,
            form.providerId,
            form.id
          );
          removeOutstandingForm(db, form.patientId, form.providerId, form.id);
        }
      });
    });
  }, [db, outstandingForms]);

  return (
    <>
      <OutstandingForms host={host} outstandingForms={outstandingForms} />
      <Box sx={{ mb: '2%' }} />
      <CompletedForms completedForms={completedForms} />
    </>
  );
}

export function PatientId({ host }: { host: string }) {
  const db = useFirestore();
  const router = useRouter();
  const patientId = router.query['patientId'] as string;

  const { data: userData, status: userStatus } = useUser();

  const [questionTypes, updateQuestionTypes] = useState([] as QuestionType[]);

  React.useEffect(() => {
    getGenericQuestionTypes(db).then((question_types) => {
      return updateQuestionTypes(question_types);
    });
  }, [db]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formId, setFormId] = useState<string>('');

  const onClickForm = async (questionType: QuestionType) => {
    if (userStatus === 'success') {
      setFormId(
        await generateQuestionLink(
          db,
          patientId,
          userData.uid,
          questionType.id,
          host
        )
      );
    }
    handleClickOpen();
  };

  const [patient, setPatient] = useState<Patient>({ name: '' });
  const { status, data } = useFirestoreDocDataOnce(
    doc(collection(db, 'patients'), patientId)
  );

  React.useEffect(() => {
    if (status === 'success') {
      setPatient({ name: data.name });
    }
  }, [data, status]);

  if (userStatus === 'success') {
    return (
      <>
        <Header />
        <FormDialog
          title={'Send New Form'}
          open={open}
          handleClose={handleClose}
          formId={formId}
        />
        <div className={styles.individualpatientboxspacing}>
          <Typography variant="h3" component="h2">
            Patient: {patient.name}
          </Typography>
          <Box sx={{ mt: '1%' }}></Box>
          <List>
            {questionTypes.map((questionType) => (
              <Box key={questionType.id}>
                <ListItemButton
                  sx={{
                    backgroundColor: '#34497980',
                    borderRadius: 50,
                    mt: '1%'
                  }}
                  onClick={() => onClickForm(questionType)}
                >
                  {`Send ${questionType.name} form`}
                </ListItemButton>
              </Box>
            ))}
          </List>
          <Box sx={{ mb: '2%' }}></Box>
          <PatientForms
            host={host}
            patientId={patientId}
            userId={userData.uid}
          />
          <Box sx={{ mb: '2%' }}></Box>
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      host: ctx.req.headers.host
    }
  };
};

export default function Individuals({
  host
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <GuardedPage inverted={false} destination={'/'}>
      <PatientId host={host} />
    </GuardedPage>
  );
}
