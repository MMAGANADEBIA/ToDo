//important modules
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { useState } from 'react';
import Drawer from 'react-native-drawer';
import 'react-native-gesture-handler';
//images imports
import Plus from '../assets/icons/plus.png';
//import modules
import SideMenu from '../components/sideMenu.js';


export default function Home({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />

      <Drawer
        type='overlay'
        open={true}
        tapToClose={true}
        openDrawerOffset={0.3}
        closedDrawerOffset={0}
        content={<SideMenu />}
        onClose={() => {
          setIsOpen(false)
          console.log("is closed")
        }
        }
        onOpen={console.log("is open")}
        side="right"
      >
      </Drawer>

      <TouchableOpacity
        style={styles.newTask}
        onPress={() => navigation.navigate('Nueva Tarea')}
      >
        <Image source={Plus} style={styles.icon} />
      </TouchableOpacity>

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
