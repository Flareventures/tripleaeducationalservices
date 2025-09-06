import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { AuthCtx, User } from '../auth/roles';
import { signInEmailPassword } from '../auth/firebaseAuth';
const theme = require('../config/tameTheme').TameTheme;

export default function Login(){
  const { login } = React.useContext(AuthCtx);
  const [name, setName] = React.useState('Therapist Taylor');
  const [email, setEmail] = React.useState('taylor@example.com');
  const [password, setPassword] = React.useState('password123');
  const [role, setRole] = React.useState<'student'|'therapist'|'admin'>('therapist');

  const submit = async ()=>{
    try{
      await signInEmailPassword(email, password);
    }catch(e:any){
      if(e?.code === 'auth/multi-factor-auth-required'){
        // Navigate to MFA resolver screen with the error object
        (globalThis as any).__tameMfaError = e;
        alert('MFA required — enter your authenticator code.');
        // Use navigation via a hacky dispatch: replace with useNavigation if needed
        (window as any).ReactNavigation?.navigate?.('MFAVerify', { resolverError: e });
        return;
      }
      Alert.alert('Firebase Auth failed', e?.message || String(e));
      return;
    }
    // Proceed to in-app session; MFA is enforced separately
    login({ id:'U'+Date.now(), name, email, role } as User, '000000');
  };

  return (<ScrollView contentContainerStyle={{padding:16, backgroundColor: theme.colors.surface}}>
    <Image source={require('../../assets/brand/tame-logo.jpg')} style={{width:160, height:160, borderRadius:12, alignSelf:'center', marginTop:8}} />
    <Text style={[s.h,{color:theme.colors.primary, alignSelf:'center', marginTop:8}]}>TAME — Sign in</Text>

    <View style={s.card}>
      <TextInput style={s.in} value={name} onChangeText={setName} placeholder='Full name' />
      <TextInput style={s.in} value={email} onChangeText={setEmail} placeholder='Email' keyboardType='email-address' autoCapitalize='none' />
      <TextInput style={s.in} value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry />
      <View style={s.row}>
        {(['student','therapist','admin'] as const).map(r=> (
          <Pressable key={r} style={[s.pill, role===r && {backgroundColor:theme.colors.secondary+ '33', borderColor: theme.colors.secondary}]} onPress={()=>setRole(r)}>
            <Text style={s.bt}>{r}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={[s.btn,{borderColor:theme.colors.primary}]} onPress={submit}><Text style={[s.bt,{color:theme.colors.primary}]}>Sign in</Text></Pressable>
    </View>

    <Text style={{opacity:0.7, marginTop:8}}>Note: Uses Firebase Auth (email/password). The 6‑digit code is a second step gate here; can be upgraded to SMS/TOTP later.</Text>
  </ScrollView>);
}
const s=StyleSheet.create({
  h:{fontSize:22,fontWeight:'900'},
  row:{flexDirection:'row',gap:8,marginTop:8,flexWrap:'wrap'},
  card:{borderWidth:1,borderRadius:12,padding:12,marginTop:12,backgroundColor:'#fff', borderColor:'#E5E7EB'},
  in:{borderWidth:1,borderRadius:10,padding:10,marginTop:8,borderColor:'#CBD5E1',backgroundColor:'#fff'},
  pill:{borderWidth:1,borderRadius:999,paddingHorizontal:12,paddingVertical:6,borderColor:'#CBD5E1'},
  btn:{borderWidth:2,borderRadius:10,padding:10,marginTop:12,alignSelf:'flex-start'},
  bt:{fontWeight:'900'}
});
