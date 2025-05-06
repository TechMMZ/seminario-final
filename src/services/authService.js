import { auth, db } from '../config/firebaseConfig'; // Asegúrate de que firestore está correctamente configurado
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

/**
 * Función para loguear un usuario con email y contraseña
 * @param {string} email - El email del usuario
 * @param {string} password - La contraseña del usuario
 * @returns {Promise} - Promesa que resuelve con el usuario autenticado
 */
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Puedes agregar la función para obtener más datos del usuario desde Firestore si es necesario
        const userData = await getUserFromFirestore(user.uid);
        return { ...user, ...userData }; // Devuelves el usuario con datos adicionales de Firestore
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Función para registrar un nuevo usuario con email y contraseña
 * @param {string} email - El email del usuario
 * @param {string} password - La contraseña del usuario
 * @returns {Promise} - Promesa que resuelve con el usuario creado
 */
export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'usuarios', user.uid), {
            email: user.email,
            createdAt: new Date(),
            photoURL: '', // valor por defecto al registrarse
        });

        return user; // Devuelves el usuario de Firebase Authentication
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Función para cerrar sesión del usuario
 * @returns {Promise} - Promesa que resuelve cuando el usuario se desloguea
 */
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Función para obtener los datos del usuario desde Firestore
 * @param {string} uid - El ID único del usuario
 * @returns {Promise} - Promesa que resuelve con los datos del usuario desde Firestore
 */
export const getUserFromFirestore = async (uid) => {
    const userDoc = await getDoc(doc(db, 'usuarios', uid));
    if (userDoc.exists()) {
        return userDoc.data(); // Devuelves los datos adicionales del usuario almacenados en Firestore
    } else {
        console.log("No se encontró el usuario en Firestore");
        return null;
    }
};

export const updateUserProfile = async (uid, data) => {
    try {
        const userRef = doc(db, 'usuarios', uid);
        await updateDoc(userRef, data);
    } catch (error) {
        throw new Error(error.message);
    }
};