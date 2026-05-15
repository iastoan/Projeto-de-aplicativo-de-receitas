import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function CategoryRecipesScreen({ route }) {

  const { categoria } = route.params;

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        {categoria}
      </Text>

      <View style={styles.recipeCard}>
        <Text style={styles.recipeText}>
         Receitas de exemplo
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#d97706",
    marginBottom: 25,
  },

  recipeCard: {
    backgroundColor: "#f3f3f3",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,

    elevation: 4,
  },

  recipeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

});