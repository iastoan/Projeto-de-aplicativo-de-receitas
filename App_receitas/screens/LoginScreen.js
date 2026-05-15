import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function LoginScreen({ navigation }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        app de receitas
      </Text>

      <Text style={styles.subtitle}>
        Entre na sua conta
      </Text>

      <TextInput
        placeholder="nome de usuario"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />

      <TouchableOpacity

        style={styles.button}

        onPress={() =>
          navigation.navigate('Profile', {
            userName: name,
          })
        }
      >

        <Text style={styles.buttonText}>
          Entrar
        </Text>

      </TouchableOpacity>

      <Text style={styles.registerText}>
        Não possui conta? Cadastre-se
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 25,
  },

  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#ff6600',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 22,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 40,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    fontSize: 18,
  },

  button: {
    backgroundColor: '#ff6600',
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },

  registerText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 30,
    fontSize: 18,
  },

});