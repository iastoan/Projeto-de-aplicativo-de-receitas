import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (

    <SafeAreaView style={styles.safeContainer}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>
          RECEITAS JÁ
        </Text>

        {/* CARD 1 */}

        <View style={styles.card}>

          <Image
            source={require('../assets/photos/hamburguer.jpg')}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.cardContent}>

            <Text style={styles.recipeTitle}>
              Hambúrguer Artesanal
            </Text>

            <Text style={styles.recipeDescription}>
              melhor que o BIG MAC
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Recipe')}
            >
              <Text style={styles.buttonText}>
                Ver Receita
              </Text>
            </TouchableOpacity>

          </View>

        </View>

        {/* CARD 2 */}

        <View style={styles.card}>

          <Image
            source={require('../assets/photos/Pizza-de-calabresa.jpg')}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.cardContent}>

            <Text style={styles.recipeTitle}>
              Pizza Caseira
            </Text>

            <Text style={styles.recipeDescription}>
              massa italiana que nao pode colocar ketchup perto deles
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Recipe')}
            >
              <Text style={styles.buttonText}>
                Ver Receita
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 25,
  },

  scrollContent: {
    paddingTop: 25,
    paddingBottom: 120,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff6600',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
    elevation: 5,
  },

  image: {
    width: '100%',
    height: 200,
  },

  cardContent: {
    padding: 15,
  },

  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  recipeDescription: {
    color: '#777',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#ff6600',
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

});