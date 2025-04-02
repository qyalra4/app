// screens/IntroScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type IntroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Intro'>;

type Props = {
  navigation: IntroScreenNavigationProp;
};

const IntroScreen: React.FC<Props> = ({ navigation }) => (
  <ImageBackground 
    source={require('../images/p.jpg')}
    style={styles.background}
  >
    <View style={styles.overlay}>
      <Text style={styles.title}>مرحباً بكم في التطبيق</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

export default IntroScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    marginTop: 70,
    margin: 'auto',
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 'auto',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    
  },
});
