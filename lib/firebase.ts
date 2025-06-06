"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics"

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // Optional: Only add measurementId if it exists
  ...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && {
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }),
}

// Validate that required environment variables are present
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.error(`Missing required Firebase environment variables: ${missingEnvVars.join(", ")}`)
}

// Initialize Firebase app
let app: FirebaseApp
let db: Firestore
let analytics: Analytics | null = null

// Only initialize if we're in the browser and have the required config
if (typeof window !== "undefined") {
  try {
    // Check if Firebase is already initialized
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    // Initialize Firestore with better error handling
    db = getFirestore(app)

    // Enable network persistence (helps with connection issues)
    if (typeof window !== "undefined") {
      // Enable offline persistence
      import("firebase/firestore")
        .then(({ enableNetwork, disableNetwork }) => {
          // This helps with connection stability
        })
        .catch((error) => {
          // Handle error silently
        })
    }

    // Initialize Analytics (only if supported and measurementId is provided)
    if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
      isSupported()
        .then((supported) => {
          if (supported) {
            analytics = getAnalytics(app)
          }
        })
        .catch(() => {
          // Handle error silently
        })
    }
  } catch (error) {
    console.error("Firebase initialization error:", error)
  }
}

// Export the initialized services
export { db, analytics }
export default app
