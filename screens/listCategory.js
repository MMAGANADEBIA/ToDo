//important modules
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
//import images
import Diskette from '../assets/icons/diskette.png';
import { useState, useRef } from 'react';

export default function ListCategorySystem({ navigation }) {
  const [category, setCategory] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState(null);

  const descriptionRef = useRef();

  const handleCancel = () => {
    navigation.navigate("Tareas")
  }

  const handleSave = () => {
    console.log("saving...");
  }



  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.firstRow}>

        <TouchableOpacity
          onPress={handleSave}
        >
          <Image source={Diskette} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCancel}
          style={styles.redButton}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.textLabel}>Nombre de categoría</Text>
      <TextInput
        style={styles.input}
        selectionColor={'#00000050'}
        returnKeyLabel='next'
        onSubmitEditing={() => descriptionRef.current.focus()}
        placeholder='Categoria'
        editable={true}
        onChangeText={(text) => setCategory(text)}
      />

      <Text style={styles.textLabel}>Descripción de categoría</Text>
      <TextInput
        style={styles.input}
        selectionColor={'#00000050'}
        returnKeyLabel='done'
        editable={category ? true : false}
        placeholder='Descripción'
        onChangeText={(text) => setCategoryDescription(text)}
        ref={descriptionRef}
      />

      <View style={styles.categoryList}>
        <Text>Lista de categorias</Text>
        <TouchableOpacity
        >
          <Text>eliminar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  firstRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  icon: {
    width: 30,
    height: 30
  },
  redButton: {
    backgroundColor: 'red',
    height: 50,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  textLabel: {
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    backgroundColor: '#f2f2f2'
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'row',
  },
})
