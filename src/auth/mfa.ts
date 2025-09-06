import { auth } from './firebaseAuth';
import {
  PhoneAuthProvider,
  multiFactor,
  getMultiFactorResolver,
  TotpMultiFactorGenerator,
} from 'firebase/auth';

// --- TOTP MFA ---
// Start TOTP enrollment: returns { secret, qrCodeUrl }
export async function startTotpEnrollment(){
  const a = auth();
  const mfUser = multiFactor(a.currentUser!);
  const session = await mfUser.getSession();
  const totpEnrollment = await TotpMultiFactorGenerator.generateSecret(session);
  const secret = totpEnrollment.secretKey;
  const qrCodeUrl = totpEnrollment.qrCodeUrl; // otpauth:// URL
  return { secret, qrCodeUrl, finalize: async (oneTimeCode:string)=>{
    const cred = TotpMultiFactorGenerator.credential({ secretKey: secret, oneTimePassword: oneTimeCode });
    await mfUser.enroll(cred, 'Authenticator app');
  }};
}

// Remove all TOTP factors (safety tool)
export async function unenrollAllFactors(){
  const a = auth();
  const mfUser = multiFactor(a.currentUser!);
  const factors = mfUser.enrolledFactors || [];
  for(const f of factors){
    await mfUser.unenroll({ uid: f.uid });
  }
}

// --- SMS MFA (optional; requires reCAPTCHA) ---
// On React Native, consider using expo-firebase-recaptcha or react-native-firebase for verifier.
export async function startSmsEnrollment(phoneNumber:string, verifier:any){
  const a = auth();
  const mfUser = multiFactor(a.currentUser!);
  const session = await mfUser.getSession();
  const provider = new PhoneAuthProvider(a);
  const verificationId = await provider.verifyPhoneNumber({ phoneNumber, session }, verifier);
  return {
    verificationId,
    finalize: async (code:string)=>{
      const cred = PhoneAuthProvider.credential(verificationId, code);
      await mfUser.enroll(cred, phoneNumber);
    }
  };
}

// --- MFA during sign-in: handle resolver (TOTP or SMS) ---
export async function resolveMfaSignIn(err:any, codeProvider:()=>Promise<{factorId:string, code:string, verificationId?:string}>){
  const a = auth();
  const resolver = getMultiFactorResolver(a, err);
  const hint = resolver.hints[0]; // choose first by default
  const { factorId, code } = await codeProvider();
  if(factorId === 'totp'){
    const cred = TotpMultiFactorGenerator.credential({ oneTimePassword: code, enrollmentId: (hint as any).uid });
    const userCred = await resolver.resolveSignIn(cred as any);
    return userCred;
  }else{
    // SMS flow expects PhoneAuthCredential via verificationId+code; left as placeholder
    throw new Error('SMS factor flow requires verificationId; integrate a verifier and pass it here.');
  }
}
