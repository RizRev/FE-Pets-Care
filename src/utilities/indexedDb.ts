/* eslint-disable @typescript-eslint/no-explicit-any */
import { openDB } from 'idb';

const dbPromise = openDB('cart-db', 1, {
  upgrade(db) {
    db.createObjectStore('cart');
  },
});

export const saveCartToIndexedDB = async (cart: any) => {
  const db = await dbPromise;
  await db.put('cart', cart, 'cart');
};

export const getCartFromIndexedDB = async () => {
  const db = await dbPromise;
  const cart = await db.get('cart', 'cart');
  return cart || [];
};

export const removeItemFromCartInIndexedDB = async (itemId: string) => {
    const db = await dbPromise;
    const cart = await db.get('cart', 'cart');
    if (cart) {
        const updatedCart = cart.filter((item: { id: string }) => item.id !== itemId);
        await db.put('cart', updatedCart, 'cart');
    }
};

export const addItemToCartInIndexedDB = async (item: { id: string; [key: string]: any }) => {
  const db = await dbPromise;
  const cart = await db.get('cart', 'cart') || [];
  cart.push(item);
  await db.put('cart', cart, 'cart');
};