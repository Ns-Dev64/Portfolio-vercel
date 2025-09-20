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

// Initialize Firebase app and services
let app: FirebaseApp | null = null
let db: Firestore | null = null
let analytics: Analytics | null = null

// Only initialize if we're in the browser and have the required config
if (typeof window !== "undefined") {
  try {
    // Check if we have all required environment variables
    if (missingEnvVars.length === 0) {
      // Check if Firebase is already initialized
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig)
      } else {
        app = getApps()[0]
      }

      // Initialize Firestore only if app is successfully initialized
      if (app) {
        try {
          db = getFirestore(app)
        } catch (firestoreError) {
          console.warn("Firestore initialization failed:", firestoreError)
          db = null
        }

        // Initialize Analytics (only if supported and measurementId is provided)
        if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
          isSupported()
            .then((supported) => {
              if (supported && app) {
                try {
                  analytics = getAnalytics(app)
                } catch (analyticsError) {
                  console.warn("Analytics initialization failed:", analyticsError)
                }
              }
            })
            .catch(() => {
              // Handle error silently
            })
        }
      }
    } else {
      console.warn(`Missing Firebase environment variables: ${missingEnvVars.join(", ")}`)
    }
  } catch (error) {
    console.warn("Firebase initialization error:", error)
    app = null
    db = null
    analytics = null
  }
}

// Export the initialized services with null checks
export { db, analytics }
export default app
