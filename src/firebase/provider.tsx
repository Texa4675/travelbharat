import React, { type ReactNode } from 'react';

export function FirebaseProvider({
  firebaseApp,
  firestore,
  auth,
  children,
}: {
  firebaseApp: any;
  firestore: any;
  auth: any;
  children: ReactNode;
}) {
  return <>{children}</>;
}
