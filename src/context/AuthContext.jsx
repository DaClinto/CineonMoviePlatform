import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch extra user data (plan, role) from Firestore
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);

                let userData = userDoc.exists() ? userDoc.data() : {};

                // If new user or missing data, ensure defaults
                if (!userDoc.exists()) {
                    userData = {
                        email: firebaseUser.email,
                        role: firebaseUser.email.includes('admin') ? 'admin' : 'user',
                        plan: 'free',
                        watchlist: [],
                        favorites: [],
                        createdAt: new Date().toISOString()
                    };

                    await setDoc(userDocRef, userData);
                }

                setUser({
                    id: firebaseUser.uid,
                    ...userData
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                // For this demo/migration, auto-create user if they don't exist
                // This mimics the "mock" behavior where any new email just worked
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                } catch (createError) {
                    throw createError;
                }
            } else {
                throw error;
            }
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const upgradeToPremium = async () => {
        if (user) {
            const userDocRef = doc(db, 'users', user.id);
            await updateDoc(userDocRef, {
                plan: 'premium'
            });
            setUser(prev => ({ ...prev, plan: 'premium' }));
        }
    };

    const value = {
        user,
        login,
        logout,
        upgradeToPremium,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
