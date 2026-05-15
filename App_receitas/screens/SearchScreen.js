import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
  return (
    <View style={styles.container}>

      {/* TOPO */}
      <View style={styles.header}>
        <Text style={styles.title}>Pesquisa</Text>

        {/* BARRA PESQUISA */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={22} color="#d97706" />

          <TextInput
            placeholder="Pesquisar por receitas"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Ionicons name="mic" size={22} color="#d97706" />
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.textArea}>
          <Text style={styles.bigText}>
            Precisa de inspiração?
          </Text>

          <Text style={styles.smallText}>
            Pesquise suas receitas favoritas!
          </Text>
        </View>

        {/* LOGO GRANDE */}
        <View style={styles.logoContainer}>
          <Ionicons
            name="restaurant-outline"
            size={140}
            color="rgba(255,136,0,0.15)"
          />

          <Text style={styles.logoText}>
            ReceitasJá
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 3,

    elevation: 5,
  },

  title: {
    fontSize: 34,
    color: "#ff8800",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ececec",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },

  textArea: {
    padding: 20,
  },

  bigText: {
    fontSize: 32,
    color: "#ff8800",
    fontWeight: "bold",
    marginBottom: 10,
  },

  smallText: {
    fontSize: 18,
    color: "#444",
  },

  logoContainer: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    fontSize: 55,
    fontWeight: "bold",
    color: "rgba(255,136,0,0.15)",
    marginTop: 10,
  },

});