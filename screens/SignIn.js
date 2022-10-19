import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Context from '../context/Context';
import { useContext } from 'react';
import { useState } from 'react';
import { signIn, signUp } from '../firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signup');

  const handlePress = () => {
    if (mode === 'signup') {
      signUp(email, password);
    } else {
      signIn(email, password);
    }
  };

  const {
    theme: { colors },
  } = useContext(Context);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      }}
    >
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        Bem-Vindo(a) ao Whatsapp
      </Text>
      <Image
        source={require('../assets/welcome-img.png')}
        style={{ width: 180, height: 180 }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 240,
          }}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 240,
            marginTop: 20,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === 'signup' ? 'CADASTRAR' : 'ENTRAR'}
            color={colors.secondary}
            onPress={handlePress}
            disabled={!email || !password}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            mode === 'signup' ? setMode('signin') : setMode('signup')
          }
        >
          <Text style={{ color: colors.secondaryText }}>
            {mode === 'signup'
              ? 'Já possui uma conta? Entre'
              : 'Não possui uma conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

// 50:25
