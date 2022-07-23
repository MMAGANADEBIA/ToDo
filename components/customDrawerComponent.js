//important modules
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon'
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { useEffect } from 'react';

export default function CustomDrawer(props) {

  const changeTheme = () => {
    console.log("hla");
  }

  return (
    <DrawerContentScrollView {...props} >
      <DrawerItemList {...props} />
      <View style={styles.customContent}>
        <TouchableOpacity
          onPress={changeTheme}
        >
          {
            props.theme.dark ?
              <FontAwesomeIcon icon={faSun} color={'#fff'} size={30} />
              :
              <FontAwesomeIcon icon={faMoon} color={'#38434f'} size={30} />
          }
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  customContent: {
    marginLeft: 20,
    marginTop: 20,
  }
})
