import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet, View } from 'react-native';
import { auth } from '../../auth/firebaseAuth';
import { Active, initBackend } from '../../backend';
import { ACTIVE_BACKEND } from '../../config/backend';
const theme = require('../../config/tameTheme').TameTheme;

function genCodes(n:number=10){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const codes:string[] = [];
  for(let i=0;i<n;i++){
    let c='';
    for(let j=0;j<10;j++){ c += chars[Math.floor(Math.random()*chars.length)]; }
    codes.push(c);
  }
  return codes;
}

export default function RecoveryCodes(){
  const [codes, setCodes] = React.useState<string[]|null>(null);
  const [saved, setSaved] = React.useState(false);

  const generate = ()=>{
    setCodes(genCodes());
    setSaved(false);
  };

  const save = async ()=>{
    const u = auth().currentUser;
    if(!u){ alert('Sign in first.'); return; }
    await initBackend(ACTIVE_BACKEND);
    await Active.saveArtifact({ id:String(Date.now()), ts:Date.now(), studentId: u.uid, payload:{ type:'recovery-codes', codes } });
    setSaved(true);
    alert('Recovery codes saved to your record. Store them in a safe place.');
  };

  return (<ScrollView contentContainerStyle={{padding:16}}>
    <Text style={[s.h,{color:theme.colors.primary}]}>MFA Recovery Codes</Text>
    <Text style={s.note}>Generate one-time recovery codes to regain access if you lose your authenticator.</Text>
    <Pressable style={[s.btn,{borderColor:theme.colors.primary}]} onPress={generate}><Text style={[s.bt,{color:theme.colors.primary}]}>Generate codes</Text></Pressable>
    {codes && (<View style={s.card}>
      {codes.map((c,i)=>(<Text key={i} style={s.code}>{c}</Text>))}
      <Text style={s.warn}>These are shown once. Save/print them now.</Text>
      <Pressable style={[s.btn,{borderColor:theme.colors.secondary}]} onPress={save}><Text style={[s.bt,{color:theme.colors.secondary}]}>Save a copy to account</Text></Pressable>
      {saved && <Text style={{marginTop:6, color:'green'}}>Saved.</Text>}
    </View>)}
  </ScrollView>);
}
const s=StyleSheet.create({
  h:{fontSize:22,fontWeight:'900'},
  note:{opacity:0.8, marginTop:4},
  btn:{borderWidth:2,borderRadius:10,padding:10,marginTop:10,alignSelf:'flex-start'},
  bt:{fontWeight:'900'},
  card:{borderWidth:1,borderRadius:12,padding:12,marginTop:10},
  code:{fontFamily:'monospace',fontSize:18,letterSpacing:1,marginVertical:2},
  warn:{marginTop:8, color:'#7c2d12'}
});
