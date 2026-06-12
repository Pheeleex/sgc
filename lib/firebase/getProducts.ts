import {
  addDoc, 
  collection, 
  doc, 
  getDocs, 
  limit, 
  orderBy, 
  query,  
  updateDoc, 
  where } from "firebase/firestore";
  import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "./index";
import { db } from ".";
import { Timestamp } from "firebase/firestore";

export interface Documents {
    id?: string;
    category: string;
    title: string;
    createdAt?: any;
    description: string;
    price?: number;
    url: string;
    slug: string;
    files?: { name: string; url: string }[];
}



const getFilesForDocument = async (docId: string) => {
  const folderRef = ref(storage, `SGC-DOCS/${docId}`);

  try {
    const result = await listAll(folderRef);

    const files = await Promise.all(
      result.items.map(async (item) => ({
        name: item.name,
        url: await getDownloadURL(item),
      }))
    );

    return files;
  } catch (error) {
    console.error(`No files found for ${docId}`);
    return [];
  }
};



export const getDocuments = async (): Promise<Documents[]> => {
  try {
    const documentsRef = collection(db, "SGC-DOCS");
    const documentsQuery = query(
      documentsRef,
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(documentsQuery);

    if (snapshot.empty) {
      return [];
    }

    const documents = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data() as Documents;

        if (!data.id) {
          console.warn("Document missing custom id:", docSnap.id);
          return data;
        }

        const files = await getFilesForDocument(data.id);

        return {
          ...data,
          files,
        };
      })
    );

    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error("Failed to fetch documents");
  }
};



export const getDocumentBySlug = async (
  slug: string
): Promise<Documents | null> => {
  const q = query(
    collection(db, "SGC-DOCS"),
    where("slug", "==", slug),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];
  const data = docSnap.data() as Documents;
  const files = await getFilesForDocument(data.id ?? docSnap.id);

  return {
    ...data,
    files,
    createdAt: data.createdAt instanceof Timestamp
      ? data.createdAt.toDate().toISOString()
      : null,
  };
};
