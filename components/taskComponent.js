//importan modules
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SQLite from 'expo-sqlite';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

//open sqlite database
const db = SQLite.openDatabase('todo.db');

export default function TaskComponent(props) {
  const [tasks, setTasks] = useState(props.task);
  const [tags, setTags] = useState(props.tags);
  const [categories, setCategories] = useState(props.categories);
  const [checkedList, setCheckedList] = useState([]);
  const [colors, setColors] = useState();

  useEffect(() => {
    setTasks(props.tasks);
    setTags(props.tags);
    setCategories(props.categories);
    console.log("props useEffect tasks");
  }, [props.tasks])

  useEffect(() => {
    setTasks(tasks);
    setTags(tags);
    setCategories(categories);
    console.log("set useEffect tasks");
  }, [tasks, tags, categories])

  const editTask = () => {
    console.log("redirect")
  }

  const handleCheckedTasks = (value, task_id) => {
    if (value) {
      setCheckedList(checkedList => [...checkedList, task_id])
    }
    if (!value) {
      for (let i = 0; i < checkedList.length; i++) {
        if (checkedList[i] === task_id) {
          setCheckedList((checkedList) => checkedList.filter((_, index) => index !== 0));
        }
      }
    }
  }

  const deleteTask = (task_id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'delete from tasks where task_id = ?;',
        [task_id]
      )
    })
    update();
  }

  const update = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from tasks;',
        [],
        (_, { rows: { _array } }) => setTasks(_array),
        (_, error) => console.log`Error: ${error}`
      )
    });
  }

  return (
    <View style={styles.container}>

      {
        tasks ? tasks.map((task) => {
          return (
            <View style={styles.checkboxContainer} key={task.task_id}>
              <Checkbox
                style={styles.checkbox}
                // value={isChecked}
                value={checkedList.includes(task.task_id) ? true : false}
                onValueChange={(value) => handleCheckedTasks(value, task.task_id)}
              />
              <TouchableOpacity
                onPress={editTask}
              >
                <Text style={[styles.checkboxText, checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : '']}>{task.task}</Text>
                <Text style={[styles.description, checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : '']}>{task.description}</Text>
                <Text style={[styles.description, checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : '']}>{`${task.priority ? `Prioridad: ${task.priority}` : `${task.category_list ? `Categoría: ${task.category_list}` : ''}`}`}</Text>
                <Text style={[styles.description, checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : '']}>{`${task.category_list ? `Categoría : ${task.category_list}` : ''}`}</Text>
                <View style={styles.description}>
                  <Icon name="tag" size={20} color="#000" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(task.task_id)}
              >
                <Icon name="trash" size={30} color={'red'} />
              </TouchableOpacity>
            </View>
          )
        })
          :
          <ContentLoader viewBox="0 0 380 70">
            <Circle cx="30" cy="30" r="30" />
            <Rect x="80" y="17" rx="4" ry="4" width="300" height="30" />
            <Rect x="80" y="17" rx="4" ry="4" width="300" height="30" />
            <Rect x="80" y="17" rx="4" ry="4" width="300" height="30" />
          </ContentLoader>

      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#fff',
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  checkboxText: {
    marginLeft: 10,
  },
  checkedBoxDecoration: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    opacity: 0.5,
  },
  description: {
    marginLeft: 30,
    // width: '50%',
  },
  delete: {
    // position: 'absolute',
  },
})
