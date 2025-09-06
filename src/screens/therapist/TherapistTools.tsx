import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthCtx } from '../../auth/roles';

export default function TherapistTools(){
  const nav:any = useNavigation();
  const { user } = React.useContext(AuthCtx);
  if(!user || (user.role!=='therapist' && user.role!=='admin')){
    return <ScrollView contentContainerStyle={{padding:16}}><Text style={{color:'crimson'}}>Therapist/Admin only.</Text></ScrollView>;
  }
  return (<ScrollView contentContainerStyle={{padding:16}}>
    <Text style={s.h}>Therapist Tools</Text>
    <Pressable style={s.btn} onPress={()=>nav.navigate('TherapistLiveView')}><Text style={s.bt}>Therapist Live View (📸 Snapshot)</Text></Pressable>
    <Pressable style={s.btn} onPress={()=>nav.navigate('MFASetup')}><Text style={s.bt}>🔐 Set up MFA (Authenticator)</Text></Pressable>
    <Pressable style={s.btn} onPress={()=>nav.navigate('RecoveryCodes')}><Text style={s.bt}>🧩 Recovery Codes</Text></Pressable>
    <Text style={s.sec}>Assessments</Text>
    <Pressable style={s.btn} onPress={()=>nav.navigate('BenchmarkRunner')}><Text style={s.bt}>Benchmark Assessment (Pre/Post)</Text></Pressable>
    <Pressable style={s.btn} onPress={()=>nav.navigate('PhonoAwarenessForm')}><Text style={s.bt}>Phonological Awareness Form</Text></Pressable>
  </ScrollView>);
}
const s=StyleSheet.create({ h:{fontSize:22,fontWeight:'900'}, sec:{marginTop:12,fontWeight:'900'}, btn:{borderWidth:1,borderRadius:10,padding:10,marginTop:8}, bt:{fontWeight:'900'} });
