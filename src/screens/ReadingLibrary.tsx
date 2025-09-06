import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const MANIFEST = require('../data/books/decodables/short_o_pdf_manifest.json');

export default function ReadingLibrary(){
  const navigation:any = useNavigation();
  return (
    <ScrollView contentContainerStyle={{padding:16}}>
      <Text style={s.h}>Reading Library</Text>

      <Text style={s.sec}>Schedule 2A — Short o</Text>
      <Pressable style={s.btn} onPress={()=>navigation.navigate('DecodablePDFShortO')}>
        <Text style={s.bt}>Decodable (PDF) — Dan's Hot Dogs</Text>
      </Pressable>
      <Pressable style={s.btn} onPress={()=>navigation.navigate('DecodableReaderShortO')}>
        <Text style={s.bt}>Decodable (text) — Short o</Text>
      </Pressable>

      <View style={s.card}>
        <Text style={{fontWeight:'900', marginBottom:6}}>PDF Files</Text>
        {MANIFEST.files.map((f:string)=>(
          <View key={f} style={s.row}>
            <Text>• {f}</Text>
            <Text style={{opacity:0.6}}>(included in bundle)</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const s=StyleSheet.create({ h:{fontSize:22,fontWeight:'900'}, sec:{marginTop:12,fontWeight:'900'}, btn:{borderWidth:1,borderRadius:10,padding:10,marginTop:8}, bt:{fontWeight:'900'}, card:{borderWidth:1,borderRadius:10,padding:12, marginTop:10}, row:{flexDirection:'row', gap:8, alignItems:'center', flexWrap:'wrap'} });
