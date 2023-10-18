import { clientCredentials } from '@/firebase/credentials';
import '@/styles/globals.css';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  connectAuthEmulator,
  getAuth,
  initializeAuth
} from 'firebase/auth';
import Head from 'next/head';
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider
} from 'reactfire';
import { useEffect } from 'react';
import nookies from 'nookies';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

function CookieSetter({ children }) {
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        nookies.set(undefined, 'token', '', { path: '/', sameSite: 'strict' });
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, {
          path: '/',
          sameSite: 'strict'
        });
      }
    });
  }, []);

  return <>{children}</>;
}

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(clientCredentials);
} else {
  app = getApp();
}
const auth = initializeAuth(app, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: undefined
});

const EMULATORS_STARTED = 'EMULATORS_STARTED';

const storage = getFirestore(app);
async function setupEmulators(auth) {
  if (!global[EMULATORS_STARTED]) {
    global[EMULATORS_STARTED] = true;
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
      disableWarnings: true
    });
    connectFirestoreEmulator(storage, 'localhost', 8080);
  }
}

if (process.env.NODE_ENV === 'development') {
  setupEmulators(auth);
}

export default function App({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <FirestoreProvider sdk={storage}>
        <AuthProvider sdk={auth}>
          <CookieSetter>
            <Head>
              <title>NPCA</title>
              <meta name="description" content="Generated by create next app" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </CookieSetter>
        </AuthProvider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  );
}
