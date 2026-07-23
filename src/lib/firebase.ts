import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  getDocs
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import config from '../../firebase-applet-config.json';
import { Product, Category, Coupon, Order, StoreSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COUPONS, INITIAL_SETTINGS } from '../data/initialData';

// Initialize Firebase App
const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});

// Initialize Firestore with custom database ID
export const db = getFirestore(app, config.firestoreDatabaseId);
export const auth = getAuth(app);

// Seed Initial Data if collections are empty
export async function seedInitialFirestoreData() {
  try {
    const productsSnap = await getDocs(collection(db, 'products'));
    if (productsSnap.empty) {
      console.log('Seeding initial products to Firestore...');
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
    }

    const categoriesSnap = await getDocs(collection(db, 'categories'));
    if (categoriesSnap.empty) {
      console.log('Seeding initial categories to Firestore...');
      for (const cat of INITIAL_CATEGORIES) {
        await setDoc(doc(db, 'categories', cat.id), cat);
      }
    }

    const couponsSnap = await getDocs(collection(db, 'coupons'));
    if (couponsSnap.empty) {
      console.log('Seeding initial coupons to Firestore...');
      for (const coup of INITIAL_COUPONS) {
        await setDoc(doc(db, 'coupons', coup.id), coup);
      }
    }

    const settingsSnap = await getDocs(collection(db, 'settings'));
    if (settingsSnap.empty) {
      console.log('Seeding initial settings to Firestore...');
      await setDoc(doc(db, 'settings', 'store_config'), INITIAL_SETTINGS);
    }
  } catch (err) {
    console.warn('Firestore seeding notice:', err);
  }
}

// Real-time Subscriptions
export function subscribeProducts(callback: (products: Product[]) => void) {
  return onSnapshot(collection(db, 'products'), (snapshot) => {
    const items: Product[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });
    // Sort by createdAt descending
    items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    callback(items);
  }, (error) => {
    console.error('Products Firestore error:', error);
  });
}

export function subscribeCategories(callback: (categories: Category[]) => void) {
  return onSnapshot(collection(db, 'categories'), (snapshot) => {
    const items: Category[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as Category);
    });
    callback(items);
  });
}

export function subscribeCoupons(callback: (coupons: Coupon[]) => void) {
  return onSnapshot(collection(db, 'coupons'), (snapshot) => {
    const items: Coupon[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as Coupon);
    });
    callback(items);
  });
}

export function subscribeOrders(callback: (orders: Order[]) => void) {
  return onSnapshot(collection(db, 'orders'), (snapshot) => {
    const items: Order[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as Order);
    });
    items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    callback(items);
  });
}

export function subscribeSettings(callback: (settings: StoreSettings) => void) {
  return onSnapshot(doc(db, 'settings', 'store_config'), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as StoreSettings);
    } else {
      callback(INITIAL_SETTINGS);
    }
  });
}

// Write API helpers
export async function saveProduct(product: Partial<Product>) {
  if (product.id) {
    await setDoc(doc(db, 'products', product.id), product, { merge: true });
  } else {
    const newDoc = doc(collection(db, 'products'));
    await setDoc(newDoc, { ...product, id: newDoc.id, createdAt: Date.now() });
  }
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, 'products', id));
}

export async function saveCategory(category: Partial<Category>) {
  if (category.id) {
    await setDoc(doc(db, 'categories', category.id), category, { merge: true });
  } else {
    const newDoc = doc(collection(db, 'categories'));
    await setDoc(newDoc, { ...category, id: newDoc.id });
  }
}

export async function deleteCategory(id: string) {
  await deleteDoc(doc(db, 'categories', id));
}

export async function saveCoupon(coupon: Partial<Coupon>) {
  if (coupon.id) {
    await setDoc(doc(db, 'coupons', coupon.id), coupon, { merge: true });
  } else {
    const newDoc = doc(collection(db, 'coupons'));
    await setDoc(newDoc, { ...coupon, id: newDoc.id, usedCount: 0 });
  }
}

export async function deleteCoupon(id: string) {
  await deleteDoc(doc(db, 'coupons', id));
}

export async function createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Promise<Order> {
  const generatedId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const orderNumber = `DUA-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder: Order = {
    ...orderData,
    id: generatedId,
    orderNumber,
    createdAt: Date.now()
  };

  try {
    const orderRef = doc(db, 'orders', generatedId);
    await setDoc(orderRef, newOrder);

    // Deduct stock for ordered items in Firestore safely
    for (const item of orderData.items) {
      try {
        const prodDocRef = doc(db, 'products', item.productId);
        const prodSnap = await getDocs(query(collection(db, 'products')));
        const targetProd = prodSnap.docs.find(d => d.id === item.productId);
        if (targetProd && targetProd.exists()) {
          const currentStock = targetProd.data().stock || 0;
          await updateDoc(prodDocRef, {
            stock: Math.max(0, currentStock - item.quantity)
          });
        }
      } catch (e) {
        console.warn('Stock update warning:', e);
      }
    }
  } catch (err) {
    console.warn('Firestore order save warning (order processed locally):', err);
  }

  return newOrder;
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  await updateDoc(doc(db, 'orders', orderId), { status });
}

export async function saveSettings(settings: StoreSettings) {
  await setDoc(doc(db, 'settings', 'store_config'), settings, { merge: true });
}
