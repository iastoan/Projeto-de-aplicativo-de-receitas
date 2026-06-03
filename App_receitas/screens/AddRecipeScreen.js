import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function AddRecipeScreen({ navigation, route }) {
  const usuarioId = route?.params?.usuarioId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [modoPreparo, setModoPreparo] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [categoria, setCategoria] = useState("");

  const categorias = [
    "Massas",
    "Bebidas",
    "Doces e sobremesas",
    "Fitness",
    "Carnes",
  ];

  async function pickImage() {
    // Solicita permissão para acessar a galeria (necessário em sistemas mais novos)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos para escolher uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corrigido para a versão atual do Expo
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      // Define a imagem no estado com o formato Base64 correto para exibição e envio
      setImage(`data:image/jpeg;base64,${img.base64}`);
    }
  }

  async function salvarReceita() {
    if (!categoria) {
      Alert.alert("Erro", "Escolha uma categoria!");
      return;
    }

    if (!usuarioId) {
      Alert.alert("Erro", "Usuário não identificado");
      return;
    }

    try {
      const response = await fetch("http://10.148.190.138:3001/receitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioId,
          title,
          image,
          description,
          modoPreparo,
          tempoPreparo,
          categoria,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Erro ao salvar receita");
        return;
      }

      Alert.alert("Sucesso", "Receita salva com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível salvar a receita.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Receita</Text>

      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.uploadText}>Selecionar Imagem</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Nome da Receita"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <TextInput
        placeholder="Tempo de preparo (minutos)"
        value={tempoPreparo}
        onChangeText={setTempoPreparo}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Categoria</Text>

      <View style={styles.categoriaBox}>
        {categorias.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.catButton,
              categoria === item && styles.catSelected,
            ]}
            onPress={() => setCategoria(item)}
          >
            <Text
              style={[
                styles.catText,
                categoria === item && styles.catTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Modo de preparo"
        value={modoPreparo}
        onChangeText={setModoPreparo}
        multiline
        style={styles.textArea}
      />

      <TouchableOpacity style={styles.button} onPress={salvarReceita}>
        <Text style={styles.buttonText}>Salvar Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6600",
    marginBottom: 20,
    marginTop: 10,
  },
  imageBox: {
    height: 220,
    backgroundColor: "#ddd",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  uploadText: {
    color: "#666",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textArea: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    height: 150,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    fontSize: 16,
  },
  categoriaBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    gap: 10,
  },
  catButton: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  catSelected: {
    backgroundColor: "#ff6600",
    borderColor: "#ff6600",
  },
  catText: {
    color: "#555",
    fontSize: 14,
  },
  catTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    marginBottom: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});