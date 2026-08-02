import { db } from "@/lib/firebase";
import { Collection } from "@/types/collection";
import {
  collection as firestoreCollection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getAllProducts(): Promise<Collection[]> {
  const productsRef = firestoreCollection(db, "products");
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Collection[];
}

export async function getProductsByCollection(
  collection: string,
): Promise<Collection[]> {
  const productsRef = firestoreCollection(db, "products");
  const q = query(productsRef, where("collection", "==", collection));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Collection[];
}

export async function getProductsByNewCollection(
  collection: string,
): Promise<Collection[]> {
  const productsRef = firestoreCollection(db, "products");
  const q = query(
    productsRef,
    where("collection", "==", collection),
    where("isNew", "==", true),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Collection[];
}

export async function getPopularProducts(): Promise<Collection[]> {
  const productsRef = firestoreCollection(db, "products");
  const q = query(productsRef, where("popular", "==", true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Collection[];
}

export async function getProductById(id: string): Promise<Collection | null> {
  const productRef = doc(db, "products", id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() } as Collection;
}
