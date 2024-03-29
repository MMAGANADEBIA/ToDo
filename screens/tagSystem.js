//important modules
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import ColorPicker from 'react-native-wheel-color-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import 'react-native-reanimated';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SQLite from 'expo-sqlite';
import { List } from 'react-content-loader/native';
import { useTheme } from '@react-navigation/native';
//import components
import TagComponent from '../components/tagComponent.js';
//import icons
import Diskette from '../assets/icons/diskette.png';

//open sqlite database
const db = SQLite.openDatabase('todo.db');

export default function TagSystem({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [tagName, setTagName] = useState(null);
  const [description, setDescription] = useState(null);
  const [showAlert, setShowalert] = useState(false);
  const [tags, setTags] = useState();

  //colors from the theme selected
  const { colors } = useTheme();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists tags(tag_id integer primary key autoincrement, tag_name text not null, description text, color text not null);'
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        'select * from tags;',
        [],
        (_, { rows: { _array } }) => setTags(_array),
        (_, error) => console.log`Error: ${error}`
      )
    });
  }, [])

  useEffect(() => {
    setTags(tags);
  }, [tags])

  const saveTag = () => {
    if (color && tagName) {
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO tags(tag_name, description, color) values(?, ?, ?);',
          [tagName, description, color]
        );
      })
      db.transaction((tx) => {
        tx.executeSql(
          'select * from tags;',
          [],
          (_, { rows: { _array } }) => setTags(_array),
          (_, error) => console.log`Error: ${error}`
        )
      });
    } else {
      setShowalert(true);
    }
  }

  const handleCancel = () => {
    setTagName(null);
    setColor(null);
    navigation.navigate("Tareas");
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <StatusBar style={`${colors.card == 'rgb(255, 255, 255)' ? 'dark' : 'light'}`} />

      <View style={styles.firstRow}>
        <TouchableOpacity
          onPress={saveTag}
        >
          <Image source={Diskette} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCancel}
          style={styles.cancelTag}
        >
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Etiqueta vacía"
          message="La etiqueta está vacía, escriba un nombre y color."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Aceptar"
          confirmButtonColor='#DD5B55'
          onConfirmPressed={() => setShowalert(false)}
        />
      </View>

      <Text style={[styles.textLabel, { color: colors.text }]}>Nombre de la etiqueta</Text>
      <TextInput
        onChangeText={(text) => setTagName(text)}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
        placeholder='Etiqueta'
        defaultValue={tagName}
      />
      <Text style={[styles.textLabel, { color: colors.text }]}>Descripción (opcional)</Text>
      <TextInput
        placeholder='Descripción'
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.colors}>
        <TouchableOpacity
          style={styles.colorPickerBtn}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.buttonText}>Selecciona el color</Text>
        </TouchableOpacity>
        {/*colores recientes*/}
        <View style={styles.tagContainer}>
          <Icon name='tag' size={30} color={color ? color : colors.text} />
          <Text style={styles.tagName} >{tagName}</Text>
        </View>
      </View>

      {
        tags ?
          <SafeAreaView>
            <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 15 }} >
              <TagComponent tags={tags} />
            </ScrollView>
          </SafeAreaView>
          :
          <List backgroundColor={colors.background} foregroundColor={colors.card} style={styles.loader} />
      }

      <Modal
        // animationType='slide'
        // transparent={false}
        isVisible={modalOpen}
        // onRequestClose={() => setModalOpen(false)}
        onBackButtonPress={() => {
          setModalOpen(false)
          setColor(null);
        }
        }
        style={styles.modal}
      >
        <ColorPicker
          thumbSize={30}
          sliderSize={20}
          gapSize={60}
          onColorChangeComplete={(color) => setColor(color)}
          row={false}
        />

        <View style={styles.modalButtons}>
          <TouchableOpacity
            onPress={() => {
              setModalOpen(false)
              setColor(null);
            }
            }
            style={styles.cancelButton}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalOpen(false)}
            style={styles.acceptButton}
          >
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  firstRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modal: {
    backgroundColor: '#fff',
    padding: 50,
    borderRadius: 10,
  },
  modalText: {
    color: '#000',
  },
  container: {
    padding: 15,
    // backgroundColor: '#f9f9fa',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
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
    // borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    // backgroundColor: '#f2f2f2'
  },
  colorPickerBtn: {
    backgroundColor: 'green',
    width: 150,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  cancelButton: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  cancelTag: {
    width: 80,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  acceptButton: {
    width: 100,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  tagName: {
    color: '#000',
    textAlign: 'center',
    marginLeft: 10,
  },
  colors: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  tagContainer: {
    marginRight: 30,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  scroll: {
    height: '90%'
  },
  loader: {
    marginTop: 20,
  }
});
