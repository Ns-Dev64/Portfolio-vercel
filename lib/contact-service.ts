"use client"

import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase"

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

export interface ContactFormResult {
  success: boolean
  error?: {
    code: string
    message: string
  }
}

// Test Firestore connection by attempting to write to contacts collection
export const testFirestoreConnection = async (): Promise<boolean> => {
  try {
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
  // Check if Firebase is properly initialized
  if (!db) {
    return false
  }

  try {
    // Try to get a reference to the contacts collection
    const contactsRef = collection(db, "contacts")
    return true
  } catch (error) {
    console.error("Firebase connection test failed:", error)
    return false
  }
}

// Submit contact form to Firebase with retry logic
export const submitContactForm = async (formData: ContactFormData): Promise<ContactFormResult> => {
  // Check if Firebase is properly initialized
  if (!db) {
    return {
      success: false,
      error: {
        code: "firebase-not-initialized",
        message: "Firebase is not properly configured. Please check your environment variables.",
      },
    }
  }

  try {
    // Add the contact form data to Firestore
    const docRef = await addDoc(collection(db, "contacts"), {
      ...formData,
      timestamp: serverTimestamp(),
      status: "new",
    })

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Error submitting contact form:", error)

    // Handle specific Firebase errors
    let errorCode = "unknown-error"
    let errorMessage = "An unexpected error occurred. Please try again."

    if (error?.code) {
      errorCode = error.code
      switch (error.code) {
        case "permission-denied":
          errorMessage = "Permission denied. Please check Firestore security rules."
          break
        case "unavailable":
          errorMessage = "Service temporarily unavailable. Please try again later."
          break
        case "network-request-failed":
          errorMessage = "Network error. Please check your internet connection."
          break
        default:
          errorMessage = error.message || errorMessage
      }
    }

    return {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
      },
    }
  }
}

// Get all contact submissions (for admin use)
export const getContactSubmissions = async (limitCount = 50): Promise<ContactSubmission[]> => {
  try {
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
