//important modules
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
// import { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
//images imports
import Plus from '../assets/icons/plus.png';

let selectedTask = [];

export default function Home({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedTasks = (value) => {
    setIsChecked(value);
  }

  const editTask = () => {
    navigation.navigate("Nueva Tarea");
  }

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />

      <TouchableOpacity
        style={styles.newTask}
        onPress={() => navigation.navigate('Nueva Tarea')}
      >
        <Image source={Plus} style={styles.icon} />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.checkbox}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={(value) => handleCheckedTasks(value)}
          />
          <TouchableOpacity
            onPress={editTask}
          >
            <Text style={[styles.checkboxText, isChecked ? styles.checkedBoxDecoration : '']}>task example</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Text>Filter by priority, list type, or tags</Text>

      {/* <NavigationContainer> */}
      {/*   <Drawer.Navigator> */}
      {/*     <Drawer.Screen name='Tags' component={TagSystem} /> */}
      {/*   </Drawer.Navigator> */}
      {/* </NavigationContainer> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
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
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row',

  },
  checkboxText: {
    marginLeft: 10,
  },
  checkedBoxDecoration: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    opacity: 0.5,
  }
});
