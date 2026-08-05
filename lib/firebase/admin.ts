import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebasePrivateKey() {
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!rawPrivateKey) {
    return undefined;
  }

  return rawPrivateKey
    .trim()
    .replace(/,$/, "")
    .trim()
    .replace(/^["']/, "")
    .replace(/["']$/, "")
    .replace(/\\n/g, "\n");
}

function getAdminApp() {
  const existingApp = getApps()[0];

  if (existingApp) {
    return existingApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getFirebasePrivateKey();
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  return initializeApp({
    credential: cert({
      clientEmail,
      privateKey,
      projectId,
    }),
  });
}

export function getAdminFirestore() {
  return getFirestore(getAdminApp());
}
