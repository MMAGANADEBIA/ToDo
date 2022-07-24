//important modules
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Drawer from 'react-native-drawer';
//Import screens
import Home from './screens/home.js';
import Task from './screens/task.js';
import TagSystem from './screens/tagSystem.js';
import ListCategory from './screens/listCategory.js';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon'
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';

const themes = {
  dark: {
    dark: true,
    colors: {
      primary: DarkTheme.colors.primary,
      background: DarkTheme.colors.background,
      card: DarkTheme.colors.card,
      text: DarkTheme.colors.text,
      border: DarkTheme.colors.border,
      notification: DarkTheme.colors.notification
    }
  },
  light: {
    dark: false,
    colors: {
      primary: DefaultTheme.colors.primary,
      background: DefaultTheme.colors.background,
      card: DefaultTheme.colors.card,
      text: DefaultTheme.colors.text,
      border: DefaultTheme.colors.border,
      notification: DefaultTheme.colors.notification
    }
  }
}

export default function App() {
  const [theme, setTheme] = useState(themes.light);

  const CustomDrawer = (props) => {

    const toggleTheme = () => {
      theme.dark ? setTheme(themes.light) : setTheme(themes.dark)
    }

    return (
      <DrawerContentScrollView {...props} >
        <DrawerItemList {...props} />
        <View style={styles.customContent}>
          <TouchableOpacity
            onPress={toggleTheme}
          >
            {
              theme.dark ?
                <FontAwesomeIcon icon={faSun} color={'#fff'} size={30} />
                :
                <FontAwesomeIcon icon={faMoon} color={'#38434f'} size={30} />
            }
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    );
  }
  //Create Drawer
  const Drawer = createDrawerNavigator();

  return (

    <NavigationContainer theme={theme} >

      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} theme={theme} />} >

        <Drawer.Screen
          name='Tareas'
          component={Home}
          options={{
            title: 'Tareas',
            headerStyle: {
              backgroundColor: theme.card,
            },
            headerTintColor: `${theme.dark ? '#fff' : 'rgb(28, 28, 30)'}`,
          }}
        />
        <Drawer.Screen
          name='Nueva Tarea'
          component={Task}
          options={{
            title: 'Nueva tarea',
            headerStyle: {
              backgroundColor: theme.card,
            },
            headerTintColor: `${theme.dark ? '#fff' : 'rgb(28, 28, 30)'}`,
          }}
        />
        <Drawer.Screen
          name='Tags'
          component={TagSystem}
          options={{
            title: 'Etiquetas',
            headerStyle: {
              backgroundColor: theme.card
            },
            headerTintColor: `${theme.dark ? '#fff' : 'rgb(28, 28, 30)'}`,
          }}
        />
        <Drawer.Screen
          name="Lista de Categorias"
          component={ListCategory}
          options={{
            title: 'Listas',
            headerStyle: {
              backgroundColor: theme.card
            },
            headerTintColor: `${theme.dark ? '#fff' : 'rgb(28, 28, 30)'}`,
          }}
        />

      </Drawer.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  customContent: {
    marginLeft: 20,
    marginTop: 20,
  }
})
