//important modules
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
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

  const isFocused = useIsFocused()

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists tasks(task_id integer primary key autoincrement, task text not null, description text, tag_id text, priority text, category_list text);',
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
  }, []);

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
    console.log(tasks);
  }, [isFocused])

  useEffect(() => {
    setTasks(tasks);
    setCategories(categories);
  }, [tasks, tags, categories])

  const cleanTasks = () => {
    console.log("cleaning")
  }

  // const editTask = () => {
  //   navigation.navigate("Nueva Tarea");
  // }

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <View style={styles.firstRowContainer}>
        <TouchableOpacity
          style={styles.clean}
        >
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.newTask}
        onPress={() => navigation.navigate('Nueva Tarea')}
      >
        <Image source={Plus} style={styles.icon} />
      </TouchableOpacity>

      {
        tasks && tags && categories ?
          <TaskComponent
            tasks={tasks}
            tags={tags}
            categories={categories}
          />
          :
          <ContentLoader viewBox="0 0 380 70">
            <Circle cx="30" cy="30" r="30" />
            <Rect x="80" y="17" rx="4" ry="4" width="300" height="30" />
            <Rect x="80" y="17" rx="4" ry="4" width="300" height="30" />
            <Rect x="80" y="17" rx="4" ry="4" width="300" height="30" />
          </ContentLoader>
      }

      <Text>Filter by priority, list type, or tags</Text>
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
  },
  icon: {
    width: 60,
    height: 60,
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
    width: 80,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
    // elevation: 5,
  },
  firstRowContainer: {
    alignItems: 'flex-end'
  }
});
