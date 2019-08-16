import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './components/Navigation';
import * as firebase from 'firebase';
import firebaseConfig from './components/conexion'

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <Navigation/>
  );
}


