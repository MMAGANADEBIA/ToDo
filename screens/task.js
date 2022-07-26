//important modules
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { useState, useRef, useEffect } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import ModalSelector from 'react-native-modal-selector';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as SQLite from 'expo-sqlite';
import * as Notifications from 'expo-notifications';
import { useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
//import images
import Diskette from '../assets/icons/diskette.png';

//open the sqlite database
const db = SQLite.openDatabase('todo.db');

export default function Task({ navigation, route }) {
  //New task state constants.
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState(null);
  const [showAlert, setShowalert] = useState(false);
  const [tags, setTags] = useState();
  const [categories, setCategories] = useState();
  const [tagSelected, setTagSelected] = useState(null);
  const [tagSelectedId, setTagSelectedId] = useState(null);
  const [priority, setPriority] = useState(null);
  const [date, setDate] = useState(null);
  const [timeDateOpen, setTimeDateOpen] = useState(false);
  const [categorySelected, setCategorieSelected] = useState(null);
  const [categorySelectedId, setCategorieSelectedId] = useState(null)

  //Check if the screen is focused.
  const isFocused = useIsFocused()

  //Const used to relate the inputs and change to next one with the insert key.
  const descriptionRef = useRef();

  //colors from the theme selected
  const { colors } = useTheme();

  useEffect(() => {
    //Create the tables of tags and list categories if not exists.
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists tags(tag_id integer primary key autoincrement, tag_name text not null, description text, color text not null);'
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists category_lists(category_id integer primary key autoincrement, category_name text not null, description text);'
      )
    });
    //Get the tag and category list data.
    db.transaction((tx) => {
      tx.executeSql(
        'select * from tags;',
        [],
        (_, { rows: { _array } }) => setTags(_array),
        (_, error) => console.log`Error: ${error}`
      )
    });
    db.transaction((tx) => {
      tx.executeSql('select * from category_lists;',
        [],
        (_, { rows: { _array } }) => setCategories(_array),
        (_, error) => console.log`Error: ${error}`
      );
    });

    //If the route comes with a task_id, then get the task of that id.
    if (route.params) {
      db.transaction((tx) => {
        tx.executeSql('select * from tasks where task_id = ?;',
          [route.params.task_id],
          (_, { rows: { _array } }) => {
            setTask(_array[0].task)
            setDescription(_array[0].description)
            setPriority(_array[0].priority)
          },
          (_, error) => console.log`Error: ${error}`
        );
      });
    }

  }, [isFocused, colors])

  let tagIndex = 0;
  let formattedTags = [{ key: tagIndex++, section: true, label: 'Etiquetas:' }];
  let categoryIndex = 0;
  let formattedCategories = [{ key: categoryIndex++, section: true, label: 'Categorias:' }]

  useEffect(() => {
    setTags(tags);
    if (tags) {
      tags.map((tag) => {
        formattedTags.push({ key: tagIndex++, label: tag.tag_name, id: tag.tag_id })
      })
    }
    setCategories(categories);
    if (categories) {
      categories.map((category) => {
        formattedCategories.push({ key: categoryIndex++, label: category.category_name, id: category.category_id })
      })
    }
  }, [tags, categories, tagSelected, priority, categorySelected, task, description])

  const priorityRadioButtons = [
    {
      label: 'Sin prioridad',
    },
    {
      label: 'Normal',
    },
    {
      label: 'Media',
    },
    {
      label: 'Alta',
    }
  ]

  const saveTask = () => {
    if (task) {

      db.transaction((tx) => {
        tx.executeSql(
          'create table if not exists tasks(task_id integer primary key autoincrement, task text not null, description text, tag_id text, priority text, category_id number);'
        )
      })

      if (date) {
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlayShound: true,
            shouldSetBadge: true,
          })
        })

        Notifications.scheduleNotificationAsync({
          content: {
            title: task,
            body: `${description ? description : `Recordatorio : ${task}`}`,
          },
          trigger: date,
        });
      }

      db.transaction((tx) => {
        tx.executeSql('INSERT INTO tasks(task, description, tag_id, priority, category_id) values(?, ?, ?, ?, ?);',
          [task, description, tagSelectedId, priority, categorySelectedId]
        );
      })

      navigateBack();

    } else {
      setShowalert(true);
    }
  }

  const navigateBack = () => {
    setTask(null)
    setDescription(null);
    setTagSelected(null)
    setDate(null);
    setCategorieSelectedId(null);
    setTagSelectedId(null);
    setCategorieSelected(null);
    navigation.navigate("Tareas");
  }

  const handleDateTime = (datetime) => {
    setDate(datetime);
    setTimeDateOpen(false);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>

      <StatusBar style={`${colors.card == 'rgb(255, 255, 255)' ? 'dark' : 'light'}`} />

      {/*SAVE AND CANCEL BUTTONS IN FIRST ROW OF SCREEN*/}
      <View style={styles.firstRowButtons}>
        <TouchableOpacity
          onPress={saveTask}
        >
          <Image source={Diskette} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateBack}
          style={styles.cancelTask}
        >
          <Text style={styles.textButton}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      {/*TASK NAME*/}
      <Text style={[styles.textLabel, { color: colors.text }]}>Tarea</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
        placeholder="Tarea"
        placeholderTextColor={colors.border}
        returnKeyLabel='next'
        selectionColor={{ color: colors.text }}
        onSubmitEditing={() => descriptionRef.current.focus()}
        onChangeText={setTask}
        defaultValue={`${task ? task : ''}`}
      />

      {/*DESCRIPTION INPUT*/}
      <Text style={[styles.textLabel, { color: colors.text }]} >Descripción (opcional)</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
        placeholder="Descripción (opcional)"
        placeholderTextColor={colors.border}
        returnKeyLabel='done'
        selectionColor={'#00000050'}
        editable={task ? true : false}
        ref={descriptionRef}
        onChangeText={setDescription}
        defaultValue={`${description ? description : ''}`}
      />

      {/*TAG SELECTOR MODAL*/}
      <View>
        <Text style={[styles.textLabel, { color: colors.text }]}>Etiqueta (opcional)</Text>
        <ModalSelector
          data={formattedTags}
          supportedOrientations={['portrait']}
          initValue={`${tagSelected ? tagSelected : 'Selecciona una etiqueta (opcional)'}`}
          onChange={(option) => {
            setTagSelected(option.label)
            setTagSelectedId(option.id)
          }
          }
          cancelText="Cancelar"

          selectStyle={{ borderColor: colors.border, color: colors.text, backgroundColor: colors.card }}
          //Text style of the options inside the modal
          optionTextStyle={{ color: colors.text }}
          //Text in the butotn square
          initValueTextStyle={{ color: colors.text }}
          //Modal title section:
          sectionStyle={{ backgroundColor: colors.card, borderRadius: 10 }}
          sectionTextStyle={{ color: colors.text }}
          //Options
          optionStyle={{ backgroundColor: colors.card }}
          optionContainerStyle={{ backgroundColor: colors.card }}
          //Cancel button
          cancelStyle={{ backgroundColor: colors.card }}
          cancelTextStyle={{ color: colors.text }}
        />
      </View>

      {/*PRIORITY RADIO BUTTONS*/}
      <Text style={[styles.textLabel, { color: colors.text }]}>Prioridad (opcional)</Text>
      <RadioButtonRN
        data={priorityRadioButtons}
        selectedBtn={(element) => setPriority(element.label)}
        box={false}
        style={styles.radioButtons}
        boxStyle={styles.boxRadioStyle}
        textStyle={{ color: colors.text, textAlign: 'center' }}
        animationTypes={['pulse']}
        duration={200}
        init={2}
      />

      {/*REMINDER INPUT AND MODAL*/}
      <Text style={[styles.textLabel, { color: colors.text }]}>Recordatorio (opcional)</Text>
      <View style={styles.reminder}>
        <TouchableOpacity
          onPress={() => setTimeDateOpen(true)}
        >
          <TextInput
            defaultValue={`${date ? date.toString().substr(0, 21) : 'Agregar recordatorio...'}`}
            editable={false}
            style={{ color: colors.text }}
          />
        </TouchableOpacity>
        {
          date &&
          <TouchableOpacity style={styles.deleteReminder} onPress={() => {
            setDate(null);
          }}>
            <Text style={styles.textButton}>Eliminar recordatorio</Text>
          </TouchableOpacity>
        }
      </View>
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
          data={formattedCategories}
          initValue={`${categorySelected ? categorySelected : 'Selecciona una categoria de lista (opcional)'}`}
          onChange={(option) => {
            setCategorieSelected(option.label)
            setCategorieSelectedId(option.id)
          }
          }
          cancelText="Cancelar"

          selectStyle={{ borderColor: colors.border, color: colors.text, backgroundColor: colors.card }}
          //Text style of the options inside the modal
          optionTextStyle={{ color: colors.text }}
          //Text in the butotn square
          initValueTextStyle={{ color: colors.text }}
          //Modal title section:
          sectionStyle={{ backgroundColor: colors.card, borderRadius: 10 }}
          sectionTextStyle={{ color: colors.text }}
          //Options
          optionStyle={{ backgroundColor: colors.card }}
          optionContainerStyle={{ backgroundColor: colors.card }}
          //Cancel button
          cancelStyle={{ backgroundColor: colors.card }}
          cancelTextStyle={{ color: colors.text }}
        />
      </View>

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
    // backgroundColor: '#f9f9fa',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
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
    // borderColor: '#000',
    borderRadius: 5,
    // borderWidth: 1,
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    // backgroundColor: '#f2f2f2'
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
    // color: '#000'
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
  optionContainerStyle: {
    backgroundColor: '#fff',
  },
  //modal border color.
  // selectStyle: {
  //   borderColor: '#000',
  //   color: '#000',
  // },
  //modal inside text.
  // selectTextStyle: {
  //   color: '#000',
  // backgroundColor: '#fff',
  // },
  reminder: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteReminder: {
    backgroundColor: 'red',
    width: 150,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
  }
});
