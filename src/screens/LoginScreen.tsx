// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // التحقق من أن رقم الايدي يحتوي على 8 أرقام فقط
    if (idNumber.length !== 12 || !/^\d{12}$/.test(idNumber)) {
      setError('الرجاء إدخال رقم ايدي مكون من 12 أرقام');
      return;
    }
    // إذا كان الرقم صحيح يتم الانتقال للشاشة الرئيسية
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <TextInput
        style={styles.input}
        placeholder="أدخل رقم الايدي (12 أرقام)"
        placeholderTextColor="#aaa"
        keyboardType="number-pad"
        maxLength={12}
        value={idNumber}
        onChangeText={(text) => {
          setIdNumber(text);
          if (error) setError('');
        }}
      />

<TextInput
        style={styles.input}
        placeholder="الرمز السري"
        placeholderTextColor="#aaa"
        
       
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>تسجيل الدخول</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
