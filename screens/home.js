//important modules
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { useState } from 'react';
// import Drawer from 'react-native-drawer';
import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
//images imports
import Plus from '../assets/icons/plus.png';
//import modules
// import SideMenu from '../components/sideMenu.js';
// import TagSystem from './tagSystem.js';


export default function Home({ navigation }) {
  // const [isOpen, setIsOpen] = useState(false);

  // const Drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />

      {/* <Drawer */}
      {/*   type='overlay' */}
      {/*   open={true} */}
      {/*   tapToClose={true} */}
      {/*   openDrawerOffset={0.3} */}
      {/*   closedDrawerOffset={0} */}
      {/*   content={<SideMenu />} */}
      {/*   onClose={() => { */}
      {/*     setIsOpen(false) */}
      {/*     console.log("is closed") */}
      {/*   } */}
      {/*   } */}
      {/*   onOpen={console.log("is open")} */}
      {/*   side="right" */}
      {/* > */}
      {/* </Drawer> */}

      <TouchableOpacity
        style={styles.newTask}
        onPress={() => navigation.navigate('Nueva Tarea')}
      >
        <Image source={Plus} style={styles.icon} />
      </TouchableOpacity>

      {/* <NavigationContainer> */}
      {/*   <Drawer.Navigator> */}
      {/*     <Drawer.Screen name='Tags' component={TagSystem} /> */}
      {/*   </Drawer.Navigator> */}
      {/* </NavigationContainer> */}

    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  newTask: {
    position: 'absolute',
    marginLeft: '80%',
    marginTop: '180%'
  },
  icon: {
    width: 60,
    height: 60,
  },
  drawerStyle: {
    mainOverlay: {
      backgroundColor: '#000',
      opacity: 0,
    },
    backgroundColor: '#000',
    color: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
  }
});
