import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from ".";
import { Timestamp } from "firebase/firestore";
import { listGuideFiles } from "@/lib/storage/r2";

export interface Documents {
    id?: string;
    category: string;
    title: string;
    createdAt?: any;
    description: string;
    price?: number;
    url: string;
    slug: string;
    files?: { name: string; path: string }[];
}



const getFilesForDocument = async (docId: string) => {
  try {
    return listGuideFiles(docId);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Missing required environment variable")
    ) {
      throw error;
    }

    console.error(`No files found for ${docId}:`, error);
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
