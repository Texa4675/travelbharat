import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db as firestore } from '../init';

// Define the UserData type
export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: Timestamp | Date | number;
  updatedAt?: Timestamp | Date | number;
  [key: string]: any; // Allow custom fields
}

/**
 * Creates or overwrites a user document in the 'users' collection
 */
export async function saveUser(uid: string, data: Partial<UserData>) {
  try {
    const userRef = doc(firestore, 'users', uid);
    
    // Check if user already exists to avoid overwriting createdAt
    const userSnap = await getDoc(userRef);
    
    const timestamp = Timestamp.now();
    
    if (!userSnap.exists()) {
      // New user
      await setDoc(userRef, {
        ...data,
        uid,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    } else {
      // Existing user, just update
      await updateDoc(userRef, {
        ...data,
        updatedAt: timestamp,
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
}

/**
 * Retrieves a user document by their UID
 */
export async function getUser(uid: string): Promise<UserData | null> {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}

/**
 * Updates specific fields in a user document
 */
export async function updateUser(uid: string, data: Partial<UserData>) {
  try {
    const userRef = doc(firestore, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}

/**
 * Deletes a user document
 */
export async function deleteUserData(uid: string) {
  try {
    const userRef = doc(firestore, 'users', uid);
    await deleteDoc(userRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
}

/**
 * Retrieves all users (Note: use with caution on large databases)
 */
export async function getAllUsers(): Promise<UserData[]> {
  try {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    
    const users: UserData[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserData);
    });
    
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
}
