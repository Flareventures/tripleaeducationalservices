import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { multiFactor } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
const theme = require('../config/tameTheme').TameTheme;

export default function MFAGate({ children }: { children: React.ReactNode }){
  const nav:any = useNavigation();
  const [ok, setOk] = React.useState<boolean | null>(null);

  React.useEffect(()=>{
    const a = auth();
    const u = a.currentUser;
    if(!u){ setOk(false); return; }
    const factors = multiFactor(u).enrolledFactors || [];
    if(factors.length === 0){
      setOk(false);
    }else{
      setOk(true);
    }
  }, []);

  if(ok === null){
    return <View style={s.wrap}><Text>Checking MFA…</Text></View>;
  }
  if(!ok){
    return (
      <View style={s.block}>
        <Text style={s.h}>MFA required</Text>
        <Text style={s.note}>For security, you must set up Multi‑Factor Authentication before using TAME.</Text>
        <Pressable style={s.btn} onPress={()=>nav.navigate('MFASetup')}><Text style={s.bt}>Set up MFA now</Text></Pressable>
      </View>
    );
  }
  return <>{children}</>;
}
const s=StyleSheet.create({
  wrap:{flex:1,alignItems:'center',justifyContent:'center'},
  block:{flex:1,alignItems:'flex-start',justifyContent:'center',padding:16},
  h:{fontSize:20,fontWeight:'900',color:theme.colors.primary},
  note:{opacity:0.8,marginTop:6},
  btn:{borderWidth:2,borderRadius:10,padding:10,marginTop:12,borderColor:theme.colors.primary},
  bt:{fontWeight:'900',color:theme.colors.primary}
});
