import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const API_URL = "http://10.148.190.138:3001";

export default function SearchScreen({ navigation }) {

  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  async function buscar(text) {

    setQuery(text);

    if (text.length < 2) {
      setResultados([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/receitas/pesquisa?q=${text}`
      );

      const data = await response.json();
      setResultados(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Pesquisa</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={22} color="#d97706" />

          <TextInput
            placeholder="Pesquisar por receitas"
            placeholderTextColor="#999"
            style={styles.input}
            value={query}
            onChangeText={buscar}
          />

          <Ionicons name="mic" size={22} color="#d97706" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {resultados.length === 0 ? (

          <View style={styles.textArea}>

            <Text style={styles.bigText}>
              Precisa de inspiração?
            </Text>

            <Text style={styles.smallText}>
              Pesquise suas receitas favoritas!
            </Text>

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

          </View>

        ) : (

          <View style={styles.resultContainer}>

            {resultados.map((item) => (

              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("Recipe", { receita: item })
                }
              >

                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                  />
                )}

                <Text style={styles.name}>
                  {item.titulo}
                </Text>

                <Text style={styles.desc}>
                  {item.descricao}
                </Text>

              </TouchableOpacity>

            ))}

          </View>

        )}

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
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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

  resultContainer: {
    padding: 20,
  },

  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  desc: {
    color: "#666",
    marginTop: 5,
  },
});