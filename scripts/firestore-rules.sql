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
