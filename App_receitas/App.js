import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

// SCREENS
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecipeScreen from "./screens/RecipeScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import CadastroScreen from "./screens/CadastroScreen";
import CategoryRecipesScreen from "./screens/CategoryRecipesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ==================== TABS ====================
function Tabs({ route, theme, setTheme }) {

  const usuarioId = route?.params?.usuarioId;
  const userName = route?.params?.userName;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#111" : "#fff",
        },
        tabBarActiveTintColor: "#ff6600",
        tabBarIcon: ({ color, size }) => {
          let icon = "home-outline";

          if (route.name === "Início") icon = "home-outline";
          if (route.name === "Categorias") icon = "restaurant-outline";
          if (route.name === "Pesquisa") icon = "search-outline";
          if (route.name === "Perfil") icon = "person-outline";

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >

      <Tab.Screen name="Início">
        {(props) => (
          <HomeScreen {...props} usuarioId={usuarioId} theme={theme} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Categorias" component={CategoriesScreen} />
      <Tab.Screen name="Pesquisa" component={SearchScreen} />

      {/* PERFIL COM BOTÃO DE TEMA */}
      <Tab.Screen name="Perfil">
        {(props) => (
          <ProfileScreen
            {...props}
            usuarioId={usuarioId}
            userName={userName}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

// ==================== APP ====================
export default function App() {

  const [theme, setTheme] = useState("light");

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Tabs">
          {(props) => (
            <Tabs
              {...props}
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="CategoryRecipes" component={CategoryRecipesScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}