//important modules
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import Drawer from 'react-native-drawer';
import { useState } from 'react';
//Import screens
import Home from './screens/home.js';
import Task from './screens/task.js';
import TagSystem from './screens/tagSystem.js';
import ListCategory from './screens/listCategory.js';
//import components
import SideMenu from './components/sideMenu.js';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const Stack = createNativeStackNavigator();

  const Drawer = createDrawerNavigator();

  return (

    <NavigationContainer>

      <Drawer.Navigator>
        <Drawer.Screen name='Tareas' component={Home} />
        <Drawer.Screen
          name='Nueva Tarea'
          component={Task}
        />
        <Drawer.Screen name='Tags' component={TagSystem} />
        <Drawer.Screen name="Lista de Categorias" component={ListCategory} />
      </Drawer.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#000',
    color: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
  }
})
