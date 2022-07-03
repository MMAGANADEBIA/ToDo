//important modules
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useState, useRef } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
//import images
import Diskette from '../assets/icons/diskette.png';

export default function Task({ navigation }) {
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState(null);
  const [showAlert, setShowalert] = useState(false);

  const descriptionRef = useRef();

  const saveTask = () => {
    if (task) {
      console.log(task, description);
    } else {
      setShowalert(true);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={saveTask}
      >
        <Image source={Diskette} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.textLabel}>Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Tarea"
        returnKeyLabel='next'
        selectionColor={'#00000050'}
        onSubmitEditing={() => descriptionRef.current.focus()}
        onChangeText={setTask}
      />
      <Text style={styles.textLabel} >Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        returnKeyLabel='done'
        selectionColor={'#00000050'}
        editable={task ? true : false}
        ref={descriptionRef}
        onChangeText={setDescription}
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Tarea vacía"
        message="La tarea está vacía, llene al menos un campo para continuar."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor='#DD5B55'
        onConfirmPressed={() => setShowalert(false)}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff'
  },
  icon: {
    width: 30,
    height: 30,
  },
  textLabel: {
    marginTop: 10,

  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderRadius: 5,
    // borderWidth: 1,
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    backgroundColor: '#f2f2f2'
  }
})
