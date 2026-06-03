import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const API = "http://10.148.190.138:3001";

export default function HomeScreen({ navigation, usuarioId }) {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarReceitas() {
    try {
      setLoading(true);
      const response = await fetch(`${API}/receitas`);
      const data = await response.json();
      setReceitas(data);
    } catch (err) {
      console.log("ERRO AO CARREGAR:", err);
    } finally {
      setLoading(false);
    }
  }

  async function curtirReceita(id) {
    try {
      const response = await fetch(`${API}/receitas/${id}/curtir`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuarioId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      carregarReceitas();
    } catch (error) {
      console.log("ERRO AO CURTIR:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarReceitas();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>RECEITAS JÁ 🍝</Text>

        {loading && (
          <ActivityIndicator size="large" color="#ff6600" style={styles.loader} />
        )}

        {!loading &&
          receitas.map((receita) => {
            // 🛠️ CORREÇÃO: Permite tanto links HTTP/HTTPS quanto imagens locais em Base64
            const imageUri =
              receita.image &&
              (receita.image.startsWith("http") || receita.image.startsWith("data:image"))
                ? receita.image
                : null;

            return (
              <View key={receita.id} style={styles.card}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                  <View style={styles.noImagePlaceholder}>
                    <Text style={styles.noImageText}>Sem Imagem</Text>
                  </View>
                )}

                <View style={styles.cardContent}>
                  {/* Trata a diferença entre o que foi salvo no banco (titulo ou title) */}
                  <Text style={styles.recipeTitle}>
                    {receita.titulo || receita.title}
                  </Text>

                  <Text style={styles.author}>
                    Por {receita.nome_usuario || "Anônimo"}
                  </Text>

                  <Text style={styles.category}>
                    📂 {receita.categoria || "Sem categoria"}
                  </Text>

                  <Text style={styles.recipeDescription}>
                    {receita.descricao || receita.description}
                  </Text>

                  <Text style={styles.time}>
                    ⏱ {receita.tempo_preparo || receita.tempoPreparo} min
                  </Text>

                  <Text style={styles.likes}>
                    ❤️ {receita.curtidas || 0}
                  </Text>

                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => curtirReceita(receita.id)}
                  >
                    <Text style={styles.likeText}>❤️ Curtir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Recipe", { receita })}
                  >
                    <Text style={styles.buttonText}>Ver Receita</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddRecipe", { usuarioId })}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ==================== ESTILOS ====================
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#ff6600",
  },
  loader: {
    marginTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 25,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  noImagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#888",
    fontSize: 16,
  },
  cardContent: {
    padding: 15,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  author: {
    fontSize: 14,
    color: "#888",
    marginBottom: 6,
  },
  category: {
    fontSize: 13,
    color: "#ff6600",
    fontWeight: "bold",
    marginBottom: 10,
  },
  recipeDescription: {
    color: "#666",
    fontSize: 15,
    marginBottom: 12,
    lineHeight: 20,
  },
  time: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 4,
  },
  likes: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 15,
  },
  likeButton: {
    backgroundColor: "#ffd6d6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  likeText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#cc0000",
  },
  button: {
    backgroundColor: "#ff6600",
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#ff6600",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  plus: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
});