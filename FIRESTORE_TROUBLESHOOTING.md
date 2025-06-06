# Firestore Setup Troubleshooting Guide

## Current Error: "Missing or insufficient permissions"

This error occurs because the Firestore security rules are blocking read access. Here's how to fix it:

### Step 1: Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** → **Rules**
4. Replace the existing rules with:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create contact submissions
    match /contacts/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    
    // Allow connection testing with a specific test collection
    match /connection-test/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // Deny all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
\`\`\`

5. Click **Publish**

### Step 2: Verify Environment Variables

Make sure your `.env.local` file has all required variables:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
\`\`\`

### Step 3: Test the Form

1. Restart your development server: `npm run dev`
2. Navigate to the contact section
3. The connection status should show "Ready"
4. Try submitting a test message

### Common Issues & Solutions

**Issue: "Permission denied" on form submission**
- **Solution**: Make sure the security rules allow `create: if true` for the `contacts` collection

**Issue: "Firebase not initialized"**
- **Solution**: Check that all environment variables are set correctly

**Issue: "Project not found"**
- **Solution**: Verify `NEXT_PUBLIC_FIREBASE_PROJECT_ID` matches your Firebase project ID

**Issue: Connection test still fails**
- **Solution**: The connection test now only checks if Firebase is initialized, not Firestore permissions

### What Changed

1. **Simplified connection test** - Now only checks if Firebase is properly initialized
2. **Better error messages** - More specific guidance for different error types
3. **Updated security rules** - Added a test collection for connection testing
4. **Improved UI feedback** - Better status indicators and error handling

### Next Steps

If you're still having issues:

1. Check the browser console for detailed error messages
2. Verify your Firebase project is active and billing is enabled (if required)
3. Make sure your domain is authorized in Firebase project settings
4. Try creating a new Firebase project if the current one has issues

The form should work once the security rules are updated correctly!
