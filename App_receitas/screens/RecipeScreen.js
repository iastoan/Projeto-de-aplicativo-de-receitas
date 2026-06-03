import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function RecipeScreen({ route }) {

  const receita = route?.params?.receita;

  if (!receita) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Receita não encontrada.
        </Text>
      </View>
    );
  }

  return (

    <ScrollView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.title}>
          {receita.titulo}
        </Text>

        <Text style={styles.subtitle}>
          Descrição
        </Text>

        <Text style={styles.text}>
          {receita.descricao}
        </Text>

        <Text style={styles.subtitle}>
          Tempo de preparo
        </Text>

        <Text style={styles.text}>
          {receita.tempo_preparo} minutos
        </Text>

        <Text style={styles.subtitle}>
          Modo de preparo
        </Text>

        <Text style={styles.text}>
          {receita.modo_preparo}
        </Text>

      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#ff6600',
  },

  text: {
    fontSize: 17,
    lineHeight: 28,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    fontSize: 18,
  },

});