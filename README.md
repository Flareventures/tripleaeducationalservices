

## 8) Firebase backend setup
1. Copy `src/config/firebaseConfig.sample.ts` → `src/config/firebaseConfig.ts` and insert your Firebase Web config keys.
2. Install Firebase packages:
```bash
npm i firebase
```
3. Ensure Firestore rules allow reads for your authenticated roles or during testing:
```
// Very open (testing only) — tighten before production!
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
The app will **fallback to Local** backend automatically if Firebase is missing or misconfigured (you'll see a console warning).


## 9) Firebase Auth
This build wires **Firebase Auth (email/password)** in the Login screen.
- Config: `src/config/firebaseConfig.ts` — paste your project keys there.
- Code: `src/auth/firebaseAuth.ts`

Install:
```bash
npm i firebase
```

> 2FA: The UI includes a 6‑digit step. To upgrade to true MFA (SMS or TOTP), we can integrate `PhoneAuthProvider` or the TOTP APIs from Firebase Auth — say the word and I'll wire the full flow.


## 11) MFA Enforcement & Recovery Codes
- The app now **blocks access** to Home content until a factor is enrolled (TOTP).
- **Recovery Codes**: Generate under Therapist Tools → Recovery Codes. Codes are saved to your account record (via active backend) and shown once — store them securely.
