import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

export default function RecipeScreen() {
  return (

    <ScrollView style={styles.container}>

      <Image
        source={require('../assets/photos/hamburguer.jpg')}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text style={styles.title}>
          Hambúrguer Artesanal
        </Text>

        <Text style={styles.subtitle}>
          Ingredientes
        </Text>

        <Text style={styles.text}>
          • 1 pão brioche{"\n"}
          • 1 carne de hambúrguer{"\n"}
          • queijo cheddar{"\n"}
          • alface{"\n"}
          • tomate{"\n"}
          • molho especial
        </Text>

        <Text style={styles.subtitle}>
          Modo de preparo 
        </Text>

        <Text style={styles.text}>
          Grelhe a carne, monte o hambúrguer
          e coloque bastante queijo porque
          felicidade também é derivado de lactose.
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

  image: {
    width: '100%',
    height: 250,
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

});