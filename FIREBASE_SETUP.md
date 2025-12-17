# Firebase Setup Guide

This guide will help you set up Firebase for your portfolio contact form.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name (e.g., "portfolio-website")
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Set up Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location close to your users
5. Click "Done"

## 3. Get Your Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the configuration object

Your config will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyExample...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXXX" // Only if Analytics is enabled
};
```

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Optional: Only add if you enabled Analytics
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Note:** 
- `databaseURL` is NOT needed for Firestore (only for Realtime Database)
- `measurementId` is only needed if you enabled Google Analytics

## 5. Install Firebase SDK

```bash
npm install firebase
```

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Open browser console to see Firebase connection status
3. Navigate to the contact section
4. Fill out and submit the form
5. Check your Firestore console for the new document in the `contacts` collection

## 7. Security Rules (Production)

Update your Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create contact submissions
    match /contacts/{document} {
      allow create: if true;
      allow read, update, delete: if false; // Only allow through admin
    }
  }
}
```

## 8. Viewing Submissions

Contact form submissions will be stored in the `contacts` collection with:
- **User Data**: name, email, subject, message
- **Metadata**: timestamp, status, source
- **Analytics**: userAgent for insights

You can view these in the Firebase Console under Firestore Database > contacts collection.

## Troubleshooting

### Common Issues:

1. **"Firebase not configured"** - Check that all required env vars are set
2. **"Permission denied"** - Update Firestore security rules
3. **"Project not found"** - Verify PROJECT_ID is correct
4. **Console errors** - Check browser console for detailed error messages

### Required vs Optional Variables:

**Required:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Optional:**
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (only if using Analytics)
