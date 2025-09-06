import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { startTotpEnrollment } from '../../auth/mfa';
const theme = require('../../config/tameTheme').TameTheme;

export default function MFASetup(){
  const [qr, setQr] = React.useState<string|undefined>();
  const [secret, setSecret] = React.useState<string|undefined>();
  const [otp, setOtp] = React.useState('');

  const begin = async ()=>{
    try{
      const { secret, qrCodeUrl, finalize } = await startTotpEnrollment() as any;
      setSecret(secret);
      setQr(qrCodeUrl);
      (globalThis as any).__tameFinalizeTotp = finalize; // stash finalize
    }catch(e:any){
      alert('Failed to start TOTP enrollment: ' + (e?.message||String(e)));
    }
  };

  const complete = async ()=>{
    try{
      const finalize = (globalThis as any).__tameFinalizeTotp;
      if(!finalize) throw new Error('Finalize handle missing — tap "Start TOTP" first.');
      await finalize(otp);
      alert('TOTP enrolled. Save your backup codes if provided.');
    }catch(e:any){
      alert('Finalize failed: ' + (e?.message||String(e)));
    }
  };

  return (<ScrollView contentContainerStyle={{padding:16, backgroundColor: theme.colors.surface}}>
    <Text style={[s.h,{color:theme.colors.primary}]}>Multi‑Factor Authentication (TOTP)</Text>
    <Text style={s.note}>Use an authenticator app (Google Authenticator, 1Password, Authy) to scan and save the code.</Text>
    <Pressable style={[s.btn,{borderColor:theme.colors.primary}]} onPress={begin}><Text style={[s.bt,{color:theme.colors.primary}]}>Start TOTP</Text></Pressable>
    {qr && <View style={s.card}>
      <Text style={{fontWeight:'900'}}>Scan this QR in your authenticator app</Text>
      <Text selectable style={{marginTop:6}}>{qr}</Text>
      <Text selectable style={{marginTop:6}}>Secret: {secret}</Text>
      <TextInput style={s.in} placeholder='Enter 6‑digit code' value={otp} onChangeText={setOtp} keyboardType='number-pad' />
      <Pressable style={[s.btn,{borderColor:theme.colors.primary}]} onPress={complete}><Text style={[s.bt,{color:theme.colors.primary}]}>Verify & Enroll</Text></Pressable>
    </View>}
  </ScrollView>);
}
const s=StyleSheet.create({ h:{fontSize:22,fontWeight:'900'}, note:{opacity:0.75, marginTop:4}, btn:{borderWidth:2,borderRadius:10,padding:10,marginTop:10,alignSelf:'flex-start'}, bt:{fontWeight:'900'}, card:{borderWidth:1,borderRadius:12,padding:12,marginTop:10}, in:{borderWidth:1,borderRadius:10,padding:10,marginTop:8,borderColor:'#CBD5E1',backgroundColor:'#fff'} });
