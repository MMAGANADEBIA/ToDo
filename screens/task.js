//important modules
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useState, useRef } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import ModalSelector from 'react-native-modal-selector';
import RadioButtonRN from 'radio-buttons-react-native';
// import { LocaleConfig, Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
// import TimePicker from 'react-time-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import images
import Diskette from '../assets/icons/diskette.png';

export default function Task({ navigation }) {
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState(null);
  const [showAlert, setShowalert] = useState(false);
  // const [tags, setTags] = useState(null);
  // const [ categories, setCategories ] = useState(null);
  const [tagSelected, setTagSelected] = useState(null);
  const [priority, setPriority] = useState(null);
  const [date, setDate] = useState(null);
  // const [modalOpen, setModalOpen] = useState(false);
  const [timeDateOpen, setTimeDateOpen] = useState(false);
  const [categorySelected, setCategorieSelected] = useState(null);

  const descriptionRef = useRef();

  let tagIndex = 0;
  let tags = [
    { key: tagIndex++, section: true, label: 'Fruits' },
    { key: tagIndex++, label: 'Red Apples' },
    { key: tagIndex++, label: 'Cherries' },
    { key: tagIndex++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
    { key: tagIndex++, label: 'Vegetable', customKey: 'Not a fruit' }
  ];

  let categoryIndex = 0;
  let categories = [
    { key: categoryIndex++, section: true, label: 'Fruits' },
    { key: categoryIndex++, label: 'Red Apples' },
    { key: categoryIndex++, label: 'Cherries' },
    { key: categoryIndex++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
    { key: categoryIndex++, label: 'Vegetable', customKey: 'Not a fruit' }
  ];

  const priorityRadioButtons = [
    {
      label: 'Sin prioridad',
      deactiveColor: '#e2e2e2',
    },
    {
      label: 'Normal',
      deactiveColor: 'blue',
    },
    {
      label: 'Media',
      deactiveColor: 'orange',
    },
    {
      label: 'Alta',
      deactiveColor: 'red',
    }
  ]

  // LocaleConfig.locales['MX'] = {
  //   monthNames: [
  //     'Enero',
  //     'Febrero',
  //     'Marzo',
  //     'Abril',
  //     'Mayo',
  //     'Junio',
  //     'Julio',
  //     'Agosto',
  //     'Septiembre',
  //     'Octubre',
  //     'Noviembre',
  //     'Diciembre'
  //   ],
  //   monthNamesShort: ['Ene', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  //   dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
  //   dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
  //   today: "Hoy"
  // };
  // LocaleConfig.defaultLocale = 'MX';

  const saveTask = () => {
    if (task) {
      console.log(task, description);
    } else {
      setShowalert(true);
    }
  }

  const handleCancel = () => {
    setTask(null)
    setDescription(null);
    setTagSelected(null)
    setDate(null);
    navigation.navigate("Tareas");
  }

  // const calendarPressed = (day) => {
  //   setDate(day);
  //   setModalOpen(false);
  //   console.log(date);
  // }

  // const calendarModalCancel = () => {
  //   setModalOpen(false)
  //   setDate(null);
  // }

  const handleDateTime = (datetime) => {
    setDate(datetime);
    setTimeDateOpen(false);
  }

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />

      {/*SAVE AND CANCEL BUTTONS IN FIRST ROW OF SCREEN*/}
      <View style={styles.firstRowButtons}>
        <TouchableOpacity
          onPress={saveTask}
        >
          <Image source={Diskette} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          style={styles.cancelTask}
        >
          <Text style={styles.textButton}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      {/*TASK NAME*/}
      <Text style={styles.textLabel}>Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Tarea"
        returnKeyLabel='next'
        selectionColor={'#00000050'}
        onSubmitEditing={() => descriptionRef.current.focus()}
        onChangeText={setTask}
        defaultValue={`${task ? task : ''}`}
      />
      {/*DESCRIPTION INPUT*/}
      <Text style={styles.textLabel} >Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        returnKeyLabel='done'
        selectionColor={'#00000050'}
        editable={task ? true : false}
        ref={descriptionRef}
        onChangeText={setDescription}
        defaultValue={`${description ? description : ''}`}
      />

      {/*TAG SELECTOR MODAL*/}
      <View>
        <Text style={styles.textLabel}>Etiqueta</Text>
        <ModalSelector
          data={tags}
          supportedOrientations={['portrait']}
          initValue={`${tagSelected ? tagSelected : 'Selecciona una etiqueta'}`}
          onChange={(option) => setTagSelected(option.label)}
          cancelText="Cancelar"
          style={styles.modalSelector}
          selectStyle={styles.selectStyle}
          //Text style of the options inside the modal
          optionTextStyle={styles.selectTextStyle}
          //Text in the square
          initValueTextStyle={styles.selectTextStyle}
        />
      </View>

      {/*PRIORITY RADIO BUTTONS*/}
      <Text style={styles.textLabel}>Prioridad</Text>
      <RadioButtonRN
        data={priorityRadioButtons}
        selectedBtn={(element) => setPriority(element.label)}
        box={false}
        style={styles.radioButtons}
        boxStyle={styles.boxRadioStyle}
        textStyle={styles.textRadioStyle}
      />

      {/*REMINDER INPUT AND MODAL*/}
      <Text style={styles.textLabel}>Recordatorio</Text>
      <TouchableOpacity
        // onPress={() => setModalOpen(true)}
        onPress={() => setTimeDateOpen(true)}
      >
        <TextInput
          defaultValue={`${date ? date : 'Agregar recordatorio...'}`}
          editable={false}
          style={styles.datePicker}
        />
      </TouchableOpacity>
      {/*DATE PICKER MODAL*/}
      <DateTimePickerModal
        isVisible={timeDateOpen}
        mode='datetime'
        onConfirm={(datetime) => handleDateTime(datetime)}
        onCancel={() => setTimeDateOpen(false)}
      />

      {/*CATEGORY MODAL SELECTOR*/}
      <View>
        <Text style={styles.textLabel}>Categoria</Text>
        <ModalSelector
          data={categories}
          initValue={`${categorySelected ? categorySelected : 'Selecciona una categoria de lista'}`}
          onChange={(option) => setCategorieSelected(option.label)}
          cancelText="Cancelar"
          style={styles.modalSelector}
          selectStyle={styles.selectStyle}
          //Text style of the options inside the modal
          optionTextStyle={styles.selectTextStyle}
          //Text in the square
          initValueTextStyle={styles.selectTextStyle}
        />
      </View>

      {/* <Modal */}
      {/*   isVisible={modalOpen} */}
      {/*   onBackButtonPress={() => setModalOpen(false)} */}
      {/*   style={styles.modal} */}
      {/* > */}
      {/* <Calendar */}
      {/*   onDayPress={(day) => calendarPressed(day)} */}
      {/* /> */}

      {/*   <Text>Lista de categorias</Text> */}

      {/*   <TouchableOpacity */}
      {/*     onPress={calendarModalCancel} */}
      {/*     style={styles.modalButton} */}
      {/*   > */}
      {/*     <Text style={styles.textButton}>Cancelar</Text> */}
      {/*   </TouchableOpacity> */}
      {/* </Modal> */}

      {/*ALERT IN CASE TASK INFORMATION ARE EMPTY*/}
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
    marginTop: 20,
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
  },
  textButton: {
    color: '#fff',
    textAlign: 'center'
  },
  modalSelector: {
    // marginTop: 20,
  },
  firstRowButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelTask: {
    borderRadius: 10,
    backgroundColor: 'red',
    width: 80,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  modal: {
    borderRadius: 10,
  },
  datePicker: {
    // marginTop: 20,
    // marginBottom: 20,
    color: '#000'
  },
  modalButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 100,
    height: 50,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  boxRadioStyle: {
    width: 100,
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: 'red',
  },
  textRadioStyle: {
    textAlign: 'center',
  },
  optionContainerStyle: {
    backgroundColor: '#fff',
  },
  //modal border color.
  selectStyle: {
    borderColor: '#000',
    color: '#000',
  },
  //modal inside text.
  selectTextStyle: {
    color: '#000',
    // backgroundColor: '#fff',
  }
});
