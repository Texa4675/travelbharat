'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';
import { app, db } from './init';

export const FirebaseClientProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof window !== "undefined") {
        const { getAuth } = await import('firebase/auth');
        setAuth(getAuth(app));
      }
    };
    initAuth();
  }, []);

  if (!auth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <FirebaseProvider
      firebaseApp={app}
      firestore={db}
      auth={auth}
    >
      {children}
    </FirebaseProvider>
  );
};
