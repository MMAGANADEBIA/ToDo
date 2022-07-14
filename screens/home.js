//important modules
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';
import ContentLoader, { Rect, Circle, BulletList, List } from 'react-content-loader/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
//images imports
import Plus from '../assets/icons/plus.png';
//import components
import TaskComponent from '../components/taskComponent.js';

//open sqlite database
const db = SQLite.openDatabase('todo.db');

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState();
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();
  const [pressedDelete, setPressedDelete] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState();
  const [filteredTags, setFilteredTags] = useState();
  const [filteredCategories, setFilteredCategories] = useState();

  const isFocused = useIsFocused()

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists tasks(task_id integer primary key autoincrement, task text not null, description text, tag_id text, priority text, category_id number);',
      )
    });
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists tags(tag_id integer primary key autoincrement, tag_name text not null, description text, color text not null);'
      )
    });
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists category_lists(category_id integer primary key autoincrement, category_name text not null, description text);'
      )
    });
    db.transaction((tx) => {
      tx.executeSql('select * from tasks;',
        [],
        (_, { rows: { _array } }) => setTasks(_array),
        (_, error) => console.log`Error: ${error}`
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
    db.transaction((tx) => {
      tx.executeSql('select * from category_lists;',
        [],
        (_, { rows: { _array } }) => setCategories(_array),
        (_, error) => console.log`Error: ${error}`
      );
    });
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'drop table tasks'
    //   )
    // })
  }, [isFocused]);


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from tasks;',
        [],
        (_, { rows: { _array } }) => setTasks(_array),
        (_, error) => console.log`Error: ${error}`
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
    db.transaction((tx) => {
      tx.executeSql('select * from category_lists;',
        [],
        (_, { rows: { _array } }) => setCategories(_array),
        (_, error) => console.log`Error: ${error}`
      );
    });
  }, [isFocused])

  useEffect(() => {
    setTasks(tasks);
    setTags(tags);
    setCategories(categories);
  }, [tasks, tags, categories])

  useEffect(() => {
    setPressedDelete(pressedDelete);
    afterClean();
  }, [pressedDelete])

  const cleanTasks = () => {
    setPressedDelete(true);
  }
  const afterClean = () => {
    setPressedDelete(false);
  }

  filters = ["Sin filtro", "Tags", "Categories", "Priority"];

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <View style={styles.firstRowContainer}>
        <View style={styles.filterRow}>
          <Icon name="filter" color={'#000'} size={20} style={styles.icon} />
          <SelectDropdown
            data={filters}
            onSelect={(selectedItem, index) => {
              // setSelectedFilter(selectedItem.substring(selectedItem.indexOf(":") + 2))
              setSelectedFilter(selectedItem);
            }}
            buttonTextAfterSelection={(selectedITem, index) => {
              return selectedITem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultButtonText={"Filtrar"}
            buttonStyle={styles.filter}
          />
        </View>
        <TouchableOpacity
          style={styles.clean}
          onPress={cleanTasks}
        >
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.newTask}
        onPress={() => navigation.navigate('Nueva Tarea')}
      >
        <Icon name="plus" size={60} color={'#00f'} />
      </TouchableOpacity>

      {
        //task && tags && categories
        tasks ?
          isFocused ?
            <SafeAreaView>
              <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 15 }} >
                <TaskComponent
                  tasks={tasks}
                  tags={tags}
                  categories={categories}
                  delete={pressedDelete}
                />
              </ScrollView>
            </SafeAreaView>
            :
            <List backgroundColor='#fff' foregroundColor='#dff' style={styles.loader} />
          :
          <List backgroundColor='#fff' foregroundColor='#dff' style={styles.loader} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    // backgroundColor: '#fff',
  },
  newTask: {
    position: 'absolute',
    marginLeft: '85%',
    marginTop: '190%',
    elevation: 6,
    zIndex: 6,
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
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  clean: {
    borderRadius: 10,
    height: 40,
    width: '20%',
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    // elevation: 5,
    // alignSelf: 'flex-end',
  },
  icon: {
    // width: 60,
    // height: 60,
    backgroundColor: '#fff',
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // paddingTop: 8,
    // elevation: 8,
    // paddingLeft: 5,
    padding: 8,
  },
  filter: {
    backgroundColor: '#fff',
    // elevation: 5,
    width: '75%',
    height: 40,
    // borderRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  filterRow: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center'
  },
  firstRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  loader: {
    position: 'absolute',
    marginTop: '18%',
    marginLeft: 15,
  },
  scrollView: {
    height: '92%',
    // padding: 15,
    // backgroundColor: 'red',
    // borderRadius: 10,
    // clipToPadding: 'false',
    // zIndex: 1,
    // elevation: 1,
  }
});
