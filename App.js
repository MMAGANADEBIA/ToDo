//important modules
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View, Header, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import Drawer from 'react-native-drawer';
import { useState } from 'react';
//Import screens
import Home from './screens/home.js';
import Task from './screens/task.js';
import TagSystem from './screens/tagSystem.js';
//import components
import SideMenu from './components/sideMenu.js';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Tareas'
          component={Home}
          options={{
            headerTitle: "Tareas",
            headerRight: () => (
              <Button
                title='menu'
                color='#000'
                onPress={() => setIsOpen(true)}
              />
            ),
          }}
        />
        <Stack.Screen name='Nueva Tarea' component={Task} />
        <Stack.Screen name='Tags' component={TagSystem} />
      </Stack.Navigator>

      {/* <Drawer */}
      {/*   type='overlay' */}
      {/*   open={true} */}
      {/*   tapToClose={true} */}
      {/*   openDrawerOffset={0.5} */}
      {/*   closedDrawerOffset={0} */}
      {/*   panCloseMask={0.2} */}
      {/*   panOpenMask={0.2} */}
      {/*   negotiatePan */}
      {/*   panThreshold={0.05} */}
      {/*   tweenDuration={0.08} */}
      {/*   useInteractionManager={true} */}
      {/*   content={<SideMenu navigation={'Nueva Tarea'} />} */}
      {/*   onClose={() => setIsOpen(false)} */}
      {/*   side="right" */}
      {/*   styles={styles.drawerStyle} */}
      {/* > */}
      {/* </Drawer> */}

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
