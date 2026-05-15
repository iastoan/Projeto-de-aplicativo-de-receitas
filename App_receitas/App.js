import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryRecipesScreen from './screens/CategoryRecipesScreen';
import RecipeScreen from './screens/RecipeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Tabs() {

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarIcon: ({ color, size }) => {

          let iconName;

          if (route.name === 'Início') {
            iconName = 'home-outline';
          }

          else if (route.name === 'Categorias') {
            iconName = 'restaurant-outline';
          }

          else if (route.name === 'Pesquisa') {
            iconName = 'search-outline';
          }

          else if (route.name === 'Login') {
            iconName = 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#ff8800',

        tabBarInactiveTintColor: 'gray',

        tabBarStyle: {
          height: 100,
          paddingBottom: 10,
          paddingTop: 10,
        },

      })}
    >

      <Tab.Screen
        name="Início"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Categorias"
        component={CategoriesScreen}
      />

      <Tab.Screen
        name="Pesquisa"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Login"
        component={LoginScreen}
      />

    </Tab.Navigator>
  );
}

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator

        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Tabs"
          component={Tabs}
        />

        <Stack.Screen
          name="CategoryRecipes"
          component={CategoryRecipesScreen}
        />

        <Stack.Screen
          name="Recipe"
          component={RecipeScreen}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}