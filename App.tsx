// App.tsx — TAME fully wired navigator
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/auth/roles';

// Screens
import Login from './src/screens/Login';
import MFASetup from './src/screens/auth/MFASetup';
import MFAVerify from './src/screens/auth/MFAVerify';
import RecoveryCodes from './src/screens/auth/RecoveryCodes';
import HomeScreen from './src/screens/HomeScreen';
import GameLibrary from './src/screens/GameLibrary';
import ReadingLibrary from './src/screens/ReadingLibrary';

// Therapist/Admin
import TherapistTools from './src/screens/therapist/TherapistTools';
import TherapistLiveView from './src/screens/therapist/TherapistLiveView';
import AdminHome from './src/screens/admin/AdminHome';

// Assessments
import BenchmarkRunner from './src/screens/assessments/BenchmarkRunner';
import PhonoAwarenessForm from './src/screens/assessments/PhonoAwarenessForm';

// Games
import SuffixSActivities from './src/screens/games/SuffixSActivities';
import SuffixSBoard from './src/screens/games/SuffixSBoard';
import FinalSTargets from './src/screens/games/FinalSTargets';
import BowlOfPhonemes from './src/screens/games/BowlOfPhonemes';
import HiddenPictureInitials from './src/screens/games/HiddenPictureInitials';
import OpenClosedFoxesStars from './src/screens/games/OpenClosedFoxesStars';
import ZooInitialsBoard from './src/screens/games/ZooInitialsBoard';
import FlossBoardGame from './src/screens/games/FlossBoardGame';

// Readers
import DecodableReaderShortO from './src/screens/reader/DecodableReaderShortO';
import DecodablePDFShortO from './src/screens/reader/DecodablePDFShortO';

const Stack = createNativeStackNavigator();
const theme = require('./src/config/tameTheme').TameTheme;
const themeColors = theme.colors;
const NavTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: themeColors.background, primary: themeColors.primary, text: themeColors.text, border: themeColors.border }
};

export default function App(){
  return (
    <AuthProvider>
      <NavigationContainer theme={NavTheme}>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
            headerStyle: { backgroundColor: themeColors.background },
            headerTitle: () => (
              <img src={require('./assets/brand/tame-logo.jpg')} alt="TAME" style={{height: 28, borderRadius: 6}} />
            ),
            headerTintColor: themeColors.text
          }}>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Sign in' }} />
          <Stack.Screen name="MFASetup" component={MFASetup} options={{ title: 'Set up MFA' }} />
          <Stack.Screen name="MFAVerify" component={MFAVerify} options={{ title: 'Verify MFA' }} />
          <Stack.Screen name="RecoveryCodes" component={RecoveryCodes} options={{ title: 'Recovery Codes' }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'TAME — Home' }} />
          <Stack.Screen name="GameLibrary" component={GameLibrary} options={{ title: 'Game Library' }} />
          <Stack.Screen name="ReadingLibrary" component={ReadingLibrary} options={{ title: 'Reading Library' }} />

          <Stack.Screen name="TherapistTools" component={TherapistTools} options={{ title: 'Therapist Tools' }} />
          <Stack.Screen name="TherapistLiveView" component={TherapistLiveView} options={{ title: 'Live View' }} />
          <Stack.Screen name="AdminHome" component={AdminHome} options={{ title: 'Admin & Therapist' }} />

          <Stack.Screen name="BenchmarkRunner" component={BenchmarkRunner} options={{ title: 'Benchmark Assessment' }} />
          <Stack.Screen name="PhonoAwarenessForm" component={PhonoAwarenessForm} options={{ title: 'Phonological Awareness' }} />

          <Stack.Screen name="SuffixSActivities" component={SuffixSActivities} options={{ title: 'Suffix -s — Activities' }} />
          <Stack.Screen name="SuffixSBoard" component={SuffixSBoard} options={{ title: 'Suffix -s — Board' }} />
          <Stack.Screen name="FinalSTargets" component={FinalSTargets} options={{ title: 'Final S — Targets' }} />
          <Stack.Screen name="BowlOfPhonemes" component={BowlOfPhonemes} options={{ title: 'Bowl of PHOnemes' }} />
          <Stack.Screen name="HiddenPictureInitials" component={HiddenPictureInitials} options={{ title: 'Hidden Picture — Initials' }} />
          <Stack.Screen name="OpenClosedFoxesStars" component={OpenClosedFoxesStars} options={{ title: 'Open & Closed — Foxes & Stars' }} />
          <Stack.Screen name="ZooInitialsBoard" component={ZooInitialsBoard} options={{ title: 'Consonants at the Zoo' }} />
          <Stack.Screen name="FlossBoardGame" component={FlossBoardGame} options={{ title: 'FLOSS Rule — Board' }} />

          <Stack.Screen name="DecodableReaderShortO" component={DecodableReaderShortO} options={{ title: 'Decodable — Short o (text)' }} />
          <Stack.Screen name="DecodablePDFShortO" component={DecodablePDFShortO} options={{ title: "Decodable — Dan's Hot Dogs (PDF)" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
