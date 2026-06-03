import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ usuarioId, userName, theme }) {

  const [bio, setBio] = useState("Clique no lápis para editar sua bio");
  const [editing, setEditing] = useState(false);
  const [receitas, setReceitas] = useState([]);

  // ==================== CARREGAR RECEITAS ====================
  function carregarReceitas() {
    fetch("http://10.148.190.138:3001/receitas")
      .then(res => res.json())
      .then(data => setReceitas(data))
      .catch(err => console.log("ERRO:", err));
  }

  useEffect(() => {
    carregarReceitas();
  }, []);

  // ==================== FILTRAR DO USUÁRIO ====================
  const minhasReceitas = receitas.filter((item) => {
    return (
      item.usuario_id === usuarioId ||
      item.usuarioId === usuarioId
    );
  });

  const isDark = theme === "dark";

  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: isDark ? "#111" : "#f5f5f5" }
    ]}>

      {/* PERFIL */}
      <View style={styles.header}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userName?.charAt(0)?.toUpperCase()}
          </Text>
        </View>

        <Text style={[
          styles.name,
          { color: isDark ? "#fff" : "#000" }
        ]}>
          {userName}
        </Text>

        <View style={styles.bioBox}>

          {editing ? (
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={styles.input}
            />
          ) : (
            <Text style={[
              styles.bio,
              { color: isDark ? "#ccc" : "gray" }
            ]}>
              {bio}
            </Text>
          )}

          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <Ionicons name="pencil" size={22} color="#ff6600" />
          </TouchableOpacity>

        </View>

      </View>

      {/* TÍTULO */}
      <Text style={[
        styles.title,
        { color: isDark ? "#fff" : "#000" }
      ]}>
        Minhas Receitas
      </Text>

      {/* LISTA */}
      {minhasReceitas.length === 0 ? (
        <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
          Nenhuma receita encontrada 😅
        </Text>
      ) : (
        minhasReceitas.map((item) => (
          <View key={item.id} style={styles.card}>

            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
            )}

            <Text style={styles.recipeTitle}>
              {item.titulo}
            </Text>

            <Text style={styles.desc}>
              {item.descricao}
            </Text>

          </View>
        ))
      )}

    </ScrollView>
  );
}

// ==================== CSS ====================
const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ff6600",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 15,
  },

  bioBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 20,
  },

  bio: {
    marginRight: 10,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: 250,
    marginRight: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 180,
  },

  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },

  desc: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: "#666",
  },
});