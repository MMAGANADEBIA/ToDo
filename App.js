//important modules
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, Appearance } from 'react-native';
import 'react-native-gesture-handler';
import Drawer from 'react-native-drawer';
import { Provider } from 'react-redux';
//Import screens
import Home from './screens/home.js';
import Task from './screens/task.js';
import TagSystem from './screens/tagSystem.js';
import ListCategory from './screens/listCategory.js';
//import components
import CustomDrawer from './components/customDrawerComponent.js';
import configureStore from './redux-store/store.js';

export default function App() {
  const Drawer = createDrawerNavigator();

  //Drawer theme example
  // const activeTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: 'rgb(255, 45, 85)',
  //   },
  // };

  //initialize the store
  const store = configureStore();

  return (

    <Provider store={store} >

      <NavigationContainer theme={DarkTheme} >

        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} theme={DarkTheme} />} >

          <Drawer.Screen
            name='Tareas'
            component={Home}
            options={{
              title: 'Tareas',
              headerStyle: {
                backgroundColor: '#fefefe',
              }
            }}
          />
          <Drawer.Screen
            name='Nueva Tarea'
            component={Task}
            options={{
              title: 'Nueva tarea',
              headerStyle: {
                backgroundColor: '#fefefe'
              },
            }}
          />
          <Drawer.Screen
            name='Tags'
            component={TagSystem}
            options={{
              title: 'Etiquetas',
              headerStyle: {
                backgroundColor: '#fefefe'
              },
            }}
          />
          <Drawer.Screen
            name="Lista de Categorias"
            component={ListCategory}
            options={{
              title: 'Listas',
              headerStyle: {
                backgroundColor: '#fefefe'
              }
            }}
          />

        </Drawer.Navigator>

      </NavigationContainer>

    </Provider>

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
