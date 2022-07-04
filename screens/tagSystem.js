//important modules
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, } from 'react-native';
import { useState } from 'react';
import ColorPicker from 'react-native-wheel-color-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
// import 'react-native-reanimated';
import Modal from "react-native-modal";
//import icons
import Diskette from '../assets/icons/diskette.png';


export default function TagSystem({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [tagName, setTagName] = useState(null);
  const [showAlert, setShowalert] = useState(false);

  const saveTag = () => {
    if (color === null || tagName === null) {
      setShowalert(true);
    } else {
      navigation.navigate("Tareas")
    }
  }

  const handleCancel = () => {
    setTagName(null);
    setColor(null);
    navigation.navigate("Tareas");
  }

  return (
    <View style={styles.container}>

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
          <Text style={styles.buttonText}>Cancelar</Text>
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

      <Text style={styles.textLabel}>Nombre de la etiqueta</Text>
      <TextInput
        onChangeText={(text) => setTagName(text)}
        style={styles.input}
        placeholder='Etiqueta'
        defaultValue={tagName}
      />
      <View style={styles.colors}>
        <TouchableOpacity
          style={styles.colorPickerBtn}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.buttonText}>Selecciona el color</Text>
        </TouchableOpacity>
        {/*colores recientes*/}
        <View style={[{ backgroundColor: color }, styles.colorPickedSquare]}>
          <Text style={color ? styles.tagName : { color: '#000' }} >{tagName}</Text>
        </View>
      </View>


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
        {/* <View syltes={styles.modalContainer}> */}
        {/* <View styles={styles.modalColorPicker}> */}
        <ColorPicker
          thumbSize={30}
          sliderSize={20}
          gapSize={60}
          onColorChangeComplete={(color) => setColor(color)}
          row={false}
        />
        {/* </View> */}

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
    backgroundColor: '#ffffff',
    padding: 15,
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
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    backgroundColor: '#f2f2f2'
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
    color: '#fff',
    textAlign: 'center',
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
  colorPickedSquare: {
    width: 100,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
});
