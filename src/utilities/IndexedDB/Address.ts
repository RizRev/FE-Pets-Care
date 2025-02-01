/* eslint-disable @typescript-eslint/no-explicit-any */
import { openDB } from 'idb';

const dbPromise = openDB('address-db', 1, {
  upgrade(db) {
    db.createObjectStore('address');
  },
});

export const saveAddressToIndexedDB = async (address: any) => {
  const db = await dbPromise;
  await db.put('address', address, 'address');
};

export const getAddressFromIndexedDB = async () => {
  const db = await dbPromise;
  const cart = await db.get('address', 'address');
  return cart || [];
};

// export const getCartLengthFromIndexedDB = async () => {
//   const db = await dbPromise;
//   const cart = await db.get('cart', 'cart');
//   return cart ? cart.length : 0;
// }

// export const removeItemFromCartInIndexedDB = async (itemId: string) => {
//     const db = await dbPromise;
//     const cart = await db.get('cart', 'cart');
//     if (cart) {
//         const updatedCart = cart.filter((item: { id: string }) => item.id !== itemId);
//         await db.put('cart', updatedCart, 'cart');
//     }
// };

// export const addItemToCartInIndexedDB = async (item: { id: string; [key: string]: any }) => {
//   const db = await dbPromise;
//   const cart = await db.get('cart', 'cart') || [];
//   cart.push(item);
//   await db.put('cart', cart, 'cart');
// };