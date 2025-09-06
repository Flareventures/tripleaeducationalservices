import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function GameLibrary(){
  const navigation:any = useNavigation();
  return (<ScrollView contentContainerStyle={{padding:16}}>
    <Text style={s.h}>Game Library</Text>
    <Text style={s.sec}>Beginning Sounds / Schedule 1</Text>
    <Pressable style={s.btn} onPress={()=>navigation.navigate('ZooInitialsBoard')}><Text style={s.bt}>Consonants at the Zoo</Text></Pressable>
    <Pressable style={s.btn} onPress={()=>navigation.navigate('HiddenPictureInitials')}><Text style={s.bt}>Hidden Picture — Initials</Text></Pressable>
    <Text style={s.sec}>Syllables & Patterns</Text>
    <Pressable style={s.btn} onPress={()=>navigation.navigate('OpenClosedFoxesStars')}><Text style={s.bt}>Open & Closed — Foxes & Stars</Text></Pressable>
    <Pressable style={s.btn} onPress={()=>navigation.navigate('FlossBoardGame')}><Text style={s.bt}>FLOSS Rule — Board</Text></Pressable>
    <Text style={s.sec}>Suffix & Endings</Text>
    <Pressable style={s.btn} onPress={()=>navigation.navigate('SuffixSActivities')}><Text style={s.bt}>Suffix -s — Activities</Text></Pressable>
    <Pressable style={s.btn} onPress={()=>navigation.navigate('SuffixSBoard')}><Text style={s.bt}>Suffix -s — Board</Text></Pressable>
    <Pressable style={s.btn} onPress={()=>navigation.navigate('FinalSTargets')}><Text style={s.bt}>Final S — /s/ vs /z/ Targets</Text></Pressable>
    <Text style={s.sec}>Phoneme Assembly</Text>
    <Pressable style={s.btn} onPress={()=>navigation.navigate('BowlOfPhonemes')}><Text style={s.bt}>Bowl of PHOnemes</Text></Pressable>
  </ScrollView>);
}
const s=StyleSheet.create({ h:{fontSize:22,fontWeight:'900'}, sec:{marginTop:12,fontWeight:'900'}, btn:{borderWidth:1,borderRadius:10,padding:10,marginTop:8}, bt:{fontWeight:'900'} });
