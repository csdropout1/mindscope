import * as admin from 'firebase-admin';

import { credential } from 'firebase-admin';
import { Auth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';

export function getAdminAuth(): Auth {
  // ONLY USE FROM SERVER SIDE
  if (!admin.apps.length) {
    initializeApp({
      credential: credential.cert(
        JSON.parse(process.env.FIREBASE_ADMIN_DATA) as admin.ServiceAccount
      )
    });
  }
  return admin.auth();
}
