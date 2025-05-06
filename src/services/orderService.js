// src/services/orderService.js
import { db } from '../config/firebaseConfig';
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where
} from 'firebase/firestore';

/**
 * Guarda un nuevo pedido en la colección "orders"
 * @param {string} userId - ID del usuario autenticado
 * @param {array} products - Lista de productos comprados
 * @param {number} total - Monto total de la compra
 * @returns {Promise<string>} - ID del documento creado
 */
export const saveOrder = async (userId, products, total) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            userId,
            products,
            total,
            date: serverTimestamp(),
            status: 'pendiente'
        });
        console.log("Pedido guardado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al guardar el pedido:", error);
        throw new Error("No se pudo guardar el pedido.");
    }
};

/**
 * Obtiene todos los pedidos realizados por un usuario
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<array>} - Lista de pedidos
 */
export const getOrders = async (userId) => {
    try {
        const q = query(collection(db, 'orders'), where('userId', '==', userId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        throw new Error("No se pudieron obtener los pedidos.");
    }
};
