import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function CategoryRecipesScreen({ route }) {

  const { categoria } = route.params;
  const navigation = useNavigation();

  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  function carregarReceitas() {
    setLoading(true);

    fetch(
      `http://10.148.190.138:3001/receitas/categoria?categoria=${categoria}` // ✔️ IP OK
    )
      .then((res) => res.json())
      .then((data) => {
        setReceitas(data);
      })
      .catch((err) => console.log("ERRO:", err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    carregarReceitas();
  }, [categoria]); // ✔️ melhora quando mudar categoria

  return (
    <View style={styles.container}>

      {/* TOPO */}
      <Text style={styles.title}>{categoria}</Text>

      {/* LOADING */}
      {loading && (
        <ActivityIndicator size="large" color="#ff8800" />
      )}

      {/* LISTA */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {receitas.map((receita) => (
          <TouchableOpacity
            key={receita.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Recipe", {
                receita,
              })
            }
          >

            {receita.image && (
              <Image
                source={{ uri: receita.image }}
                style={styles.image}
              />
            )}

            <Text style={styles.name}>
              {receita.titulo}
            </Text>

            <Text style={styles.desc}>
              {receita.descricao}
            </Text>

          </TouchableOpacity>
        ))}

        {!loading && receitas.length === 0 && (
          <Text style={styles.empty}>
            Nenhuma receita encontrada nessa categoria 🍽️
          </Text>
        )}

      </ScrollView>

    </View>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff8800",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: 160,
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

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 16,
  },
});