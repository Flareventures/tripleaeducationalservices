import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import SessionTimer from '../../components/SessionTimer';
import { ACTIVE_BACKEND } from '../../config/backend';
import { initBackend, Active } from '../../backend';

export default function TherapistLiveView(){
  const [studentId, setStudentId] = React.useState('S12345');
  const [notes, setNotes] = React.useState('');
  const [artifacts, setArtifacts] = React.useState<any[]>([]);
  React.useEffect(()=>{ initBackend(ACTIVE_BACKEND).then(()=> Active.getArtifactsByStudent(studentId).then(setArtifacts)); },[studentId]);
  const snap = async ()=>{
    await backend.saveArtifact({ id:String(Date.now()), ts:Date.now(), studentId, payload:{ type:'snapshot', notes } });
    Alert.alert('Snapshot saved');
    const list = await backend.getArtifactsByStudent(studentId);
    setArtifacts(list);
  };
  return (<ScrollView contentContainerStyle={{padding:16}}>
    <Text style={s.h}>Therapist Live View</Text>
    <SessionTimer storageKey={`ther:live:${studentId}`} />
    <TextInput style={s.in} value={studentId} onChangeText={setStudentId} placeholder='Student ID' />
    <TextInput style={[s.in,{height:80}]} value={notes} onChangeText={setNotes} placeholder='Live notes' multiline />
    <Pressable style={s.btn} onPress={snap}><Text style={s.bt}>📸 Snapshot</Text></Pressable>
    <Text style={{marginTop:10,fontWeight:'900'}}>Recent artifacts</Text>
    {artifacts.map((a,i)=>(<View key={i} style={s.row}><Text>{new Date(a.ts).toLocaleString()}</Text><Text numberOfLines={1}> — {JSON.stringify(a.payload)}</Text></View>))}
  </ScrollView>);
}
const s=StyleSheet.create({ h:{fontSize:22,fontWeight:'900'}, in:{borderWidth:1,borderRadius:10,padding:8,marginTop:8}, btn:{borderWidth:1,borderRadius:10,padding:10,marginTop:8,alignSelf:'flex-start'}, bt:{fontWeight:'900'}, row:{flexDirection:'row', gap:6, alignItems:'center', flexWrap:'wrap', marginTop:6} });
