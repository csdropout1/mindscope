import { useAuth, useFirestore } from 'reactfire';
import { FirebaseError } from 'firebase/app';

import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';

import { useRequestState } from './useRequestState';
import { useCallback } from 'react';
import { create_user_set } from '@/data/user';

export function useSignUpWithEmailAndPassword() {
  const auth = useAuth();
  const db = useFirestore();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        setData(cred);
        create_user_set(db, email, cred.user.uid);
      } catch (error) {
        setError(error as FirebaseError);
      }
    },
    [auth, db, setData, setError, setLoading]
  );

  return [signUp, state] as [typeof signUp, typeof state];
}
