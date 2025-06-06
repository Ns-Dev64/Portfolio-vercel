"use client"

import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from "firebase/firestore"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactSubmission extends ContactFormData {
  id?: string
  timestamp?: any
  status?: "unread" | "read" | "replied"
  source?: string
  ipAddress?: string
  userAgent?: string
}

// Test Firestore connection by attempting to write to contacts collection
export const testFirestoreConnection = async (): Promise<boolean> => {
  try {
    const { db } = await import("./firebase")

    if (!db) {
      return false
    }

    // Test by attempting to create a test document (this will validate write permissions)
    const testData = {
      name: "Connection Test",
      email: "test@example.com",
      subject: "Connection Test",
      message: "This is a connection test",
      timestamp: serverTimestamp(),
      status: "test" as const,
      source: "connection-test",
      userAgent: "test",
    }

    // Try to add a test document to the contacts collection
    const docRef = await addDoc(collection(db, "contacts"), testData)
    return true
  } catch (error: any) {
    if (error?.code === "permission-denied") {
      return false
    }
    return false
  }
}

// Alternative connection test that doesn't require any permissions
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    const { db } = await import("./firebase")

    if (!db) {
      return false
    }

    // Just check if the db object exists and has the expected properties
    if (db && typeof db === "object" && "app" in db) {
      return true
    }

    return false
  } catch (error) {
    return false
  }
}

// Submit contact form to Firebase with retry logic
export const submitContactForm = async (
  formData: ContactFormData,
): Promise<{ success: boolean; id?: string; error?: any }> => {
  let retryCount = 0
  const maxRetries = 3

  while (retryCount < maxRetries) {
    try {
      // Dynamic import to ensure we're on the client side
      const { db } = await import("./firebase")

      if (!db) {
        throw new Error("Firebase not initialized")
      }

      // Add additional metadata
      const submissionData: Omit<ContactSubmission, "id"> = {
        ...formData,
        timestamp: serverTimestamp(),
        status: "unread",
        source: "portfolio-website",
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
      }

      const docRef = await addDoc(collection(db, "contacts"), submissionData)
      return { success: true, id: docRef.id }
    } catch (error: any) {
      // Provide specific error messages
      if (error?.code === "permission-denied") {
        return {
          success: false,
          error: {
            message: "Permission denied. Please check Firestore security rules.",
            code: error.code,
          },
        }
      } else if (error?.code === "unavailable") {
        retryCount++
        if (retryCount < maxRetries) {
          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount))
          continue
        }
      } else if (error?.message?.includes("network")) {
        retryCount++
        if (retryCount < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          continue
        }
      }

      // If we've exhausted retries or it's a different error
      return { success: false, error }
    }
  }

  return {
    success: false,
    error: {
      message: "Failed to submit after multiple attempts. Please try again later.",
      code: "max-retries-exceeded",
    },
  }
}

// Get all contact submissions (for admin use)
export const getContactSubmissions = async (limitCount = 50): Promise<ContactSubmission[]> => {
  try {
    // Dynamic import to ensure we're on the client side
    const { db } = await import("./firebase")

    if (!db) {
      throw new Error("Firebase not initialized")
    }

    const q = query(collection(db, "contacts"), orderBy("timestamp", "desc"), limit(limitCount))

    const querySnapshot = await getDocs(q)
    const submissions: ContactSubmission[] = []

    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
      } as ContactSubmission)
    })

    return submissions
  } catch (error) {
    return []
  }
}

// Mark a submission as read
export const markAsRead = async (submissionId: string): Promise<boolean> => {
  try {
    const { db } = await import("./firebase")
    const { updateDoc, doc } = await import("firebase/firestore")

    if (!db) {
      throw new Error("Firebase not initialized")
    }

    await updateDoc(doc(db, "contacts", submissionId), {
      status: "read",
      readAt: serverTimestamp(),
    })
    return true
  } catch (error) {
    return false
  }
}
