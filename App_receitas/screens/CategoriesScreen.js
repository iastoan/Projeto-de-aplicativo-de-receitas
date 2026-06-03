import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function CategoriesScreen({ navigation }) {

  const categorias = [
    {
      nome: "Massas",
      imagem: require("../assets/photos/macarrao.jpg"),
    },
    {
      nome: "Bebidas",
      imagem: require("../assets/photos/sucos.jpg"),
    },
    {
      nome: "Doces e sobremesas",
      imagem: require("../assets/photos/pudim.jpeg"),
    },
    {
      nome: "Fitness",
      imagem: require("../assets/photos/macarrao-fitness.jpg"),
    },
    {
      nome: "Carnes",
      imagem: require("../assets/photos/carne.jpg"),
    },
  ];

  function abrirCategoria(nome) {
    navigation.navigate("CategoryRecipes", {
      categoria: nome,
    });
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="fast-food" size={50} color="#ff8800" />

        <Text style={styles.logo}>
          ReceitasJá
        </Text>
      </View>

      {/* LISTA */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {categorias.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => abrirCategoria(item.nome)}
          >
            <ImageBackground
              source={item.imagem}
              style={styles.image}
              imageStyle={styles.imageRadius}
            >
              <View style={styles.overlay}>
                <Text style={styles.cardText}>
                  {item.nome}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
}

// ==================== CSS ====================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff8800",
    marginLeft: 10,
  },

  card: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  image: {
    height: 140,
    justifyContent: "center",
  },

  imageRadius: {
    borderRadius: 25,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});