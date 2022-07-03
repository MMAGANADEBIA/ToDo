//importan modules
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

export default function SideMenu(props) {

  return (
    <View style={styles.container} >
      <TouchableOpacity
      // onPress={() => navigation.navigate(props.navigation)}
      >
        <Text>press</Text>
      </TouchableOpacity>
      <Text>Mas texto</Text>
      <Text>Mas mucho</Text>
      <Text>texto</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgorundColor: '#000',
  },
  text: {
    color: '#05d'
  }
})
