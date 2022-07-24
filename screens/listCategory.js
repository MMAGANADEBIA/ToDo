//important modules
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from 'expo-sqlite';
import ContentLoader, { Rect, Circle, List } from 'react-content-loader/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTheme } from '@react-navigation/native';
//import images
import Diskette from '../assets/icons/diskette.png';
import { useState, useRef, useEffect } from 'react';
//import components
import CategoryComponent from '../components/categoryComponent.js';

//open the sqlite database
const db = SQLite.openDatabase('todo.db');

export default function ListCategorySystem({ navigation }) {
  const [category, setCategory] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState(null);
  const [categories, setCategories] = useState();
  const [showAlert, setShowalert] = useState(false);

  const descriptionRef = useRef();

  //colors from the theme selected
  const { colors } = useTheme();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from category_lists;',
        [],
        (_, { rows: { _array } }) => setCategories(_array),
        (_, error) => console.log`Error: ${error}`
      );
    });
  }, [])

  useEffect(() => {
    setCategories(categories);
  }, [categories])

  const handleCancel = () => {
    navigation.navigate("Tareas");
  }

  const handleSave = () => {
    if (category) {
      db.transaction((tx) => {
        tx.executeSql(
          'create table if not exists category_lists(category_id integer primary key autoincrement, category_name text not null, description text);'
        )
      })
      db.transaction((tx) => {
        tx.executeSql('insert into category_lists(category_name, description) values(?, ?);',
          [category, categoryDescription]
        );
      })
      db.transaction((tx) => {
        tx.executeSql('select * from category_lists;',
          [],
          (_, { rows: { _array } }) => setCategories(_array),
          (_, error) => console.log`Error: ${error}`
        );
      });
      // update();
    } else {
      setShowalert(true);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <StatusBar style={`${colors.card == 'rgb(255, 255, 255)' ? 'dark' : 'light'}`} />

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
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>

      </View>

      <Text style={[styles.textLabel, { color: colors.text }]}>Nombre de categoría</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
        selectionColor={'#00000050'}
        returnKeyLabel='next'
        onSubmitEditing={() => descriptionRef.current.focus()}
        placeholder='Categoria'
        editable={true}
        onChangeText={(text) => setCategory(text)}
      />

      <Text style={[styles.textLabel, { color: colors.text }]}>Descripción de categoría (opcional)</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border }]}
        selectionColor={'#00000050'}
        returnKeyLabel='done'
        editable={category ? true : false}
        placeholder='Descripción'
        onChangeText={(text) => setCategoryDescription(text)}
        ref={descriptionRef}
      />

      {
        categories ?
          <SafeAreaView>
            <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 15 }} >
              <CategoryComponent categories={categories} />
            </ScrollView>
          </SafeAreaView>
          :
          <List backgroundColor={colors.background} foregroundColor={colors.card} style={styles.loader} />
      }
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Categoría vacía"
        message="La categoría está vacía, escriba un nombre."
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
  firstRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    padding: 15,
    // backgroundColor: '#f9f9fa',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  icon: {
    width: 30,
    height: 30
  },
  redButton: {
    backgroundColor: 'red',
    height: 40,
    width: 80,
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
    // borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    // backgroundColor: '#f2f2f2'
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'row',
  },
  scroll: {
    height: '90%'
  },
  loader: {
    marginTop: 20,
  }
})
