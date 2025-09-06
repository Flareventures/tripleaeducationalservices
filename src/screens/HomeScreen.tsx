import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthCtx } from '../auth/roles';
const theme = require('../config/tameTheme').TameTheme;

import MFAGate from '../auth/MFAGate';

export default function HomeScreen(){
  const nav:any = useNavigation();
  const { user, logout } = React.useContext(AuthCtx);
  return (
    <MFAGate>
    <ScrollView contentContainerStyle={{padding:16, backgroundColor: theme.colors.surface}}>
      <Image source={require('../../assets/brand/tame-logo.jpg')} style={{width:120,height:120,borderRadius:12,alignSelf:'center'}} />
      <Text style={[s.h,{color:theme.colors.primary, alignSelf:'center'}]}>TAME — Triple A Multisensory Education</Text>
      <Text style={[s.note,{alignSelf:'center'}]}>Welcome{user?`, ${user.name} (${user.role})`:''}</Text>
      <View style={s.row}>
        <Pressable style={s.btn} onPress={()=>nav.navigate('GameLibrary')}><Text style={[s.bt,{color:theme.colors.text}]}>🎮 Game Library</Text></Pressable>
        <Pressable style={s.btn} onPress={()=>nav.navigate('ReadingLibrary')}><Text style={[s.bt,{color:theme.colors.text}]}>📚 Reading Library</Text></Pressable>
        <Pressable style={s.btn} onPress={()=>nav.navigate('TherapistTools')}><Text style={[s.bt,{color:theme.colors.text}]}>🛠 Therapist Tools</Text></Pressable>
        <Pressable style={s.btn} onPress={()=>nav.navigate('Login')}><Text style={[s.bt,{color:theme.colors.text}]}>🔐 Sign in</Text></Pressable>
      </View>
      {user && <Pressable style={[s.btn,{marginTop:12,borderColor:theme.colors.secondary}]} onPress={logout}><Text style={[s.bt,{color:theme.colors.secondary}]}>Sign out</Text></Pressable>}
    </ScrollView>
    </MFAGate>
  );
}
const s=StyleSheet.create({
  h:{fontSize:22,fontWeight:'900', marginTop:8},
  note:{opacity:0.8,marginTop:4},
  row:{flexDirection:'row',gap:8,flexWrap:'wrap',marginTop:10},
  btn:{borderWidth:1,borderRadius:10,padding:10,borderColor:'#E5E7EB',backgroundColor:'#fff'},
  bt:{fontWeight:'900'}
});
