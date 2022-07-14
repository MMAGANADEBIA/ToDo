//importan modules
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SQLite from 'expo-sqlite';
import ContentLoader, { Rect, Circle, List } from 'react-content-loader/native';

//open sqlite database
const db = SQLite.openDatabase('todo.db');

let selectedBoxArray = [];

export default function TaskComponent(props) {
  const [tasks, setTasks] = useState(props.task);
  const [tags, setTags] = useState(props.tags);
  const [categories, setCategories] = useState(props.categories);
  const [checkedList, setCheckedList] = useState([]);
  const [pressedDelete, setPressedDelete] = useState(props.delete);

  useEffect(() => {
    setTasks(props.tasks);
    setTags(props.tags);
    setCategories(props.categories);
    setPressedDelete(props.delete);
  }, [props.tasks, props.delete])

  useEffect(() => {
    setTasks(tasks);
    setTags(tags);
    setCategories(categories);
    setPressedDelete(pressedDelete);
    // console.log(tasks);
    if (pressedDelete) {
      deleteTask();
    }
  }, [tasks, tags, categories, pressedDelete])

  useEffect(() => {
    setCheckedList(checkedList);
  }, [checkedList])
  useEffect(() => {
    setCheckedList(checkedList);
  }, [checkedList])

  const editTask = () => {
    console.log("redirect")
  }

  const handleCheckedTasks = (value, task_id) => {
    value ? setCheckedList(checkedList => [...checkedList, task_id])
      : setCheckedList((checkedList) => checkedList.filter(item => item !== task_id));
  }

  const deleteTask = () => {
    checkedList.map((task_id) => {
      db.transaction((tx) => {
        tx.executeSql(
          'delete from tasks where task_id = ?;',
          [task_id]
        )
      })
    })
    update();
  }

  const update = () => {
    setPressedDelete(false);
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
                <Text style={[styles.description, checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : '']}>{task.priority}</Text>
                {/* <Text style={[styles.description, checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : '']}>{task.category_list}</Text> */}
                <View>
                  {
                    categories.map((category) => {
                      if (category.category_id == task.category_id) {
                        return (
                          <View key={category.category_id}  >
                            <Text style={[styles.description, checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : '']} >{category.category_name}</Text>
                          </View>
                        );
                      }
                    })
                  }
                </View>
                <View >
                  {
                    tags.map((tag) => {
                      if (tag.tag_id == task.tag_id) {
                        return (
                          <View key={tag.tag_id} style={styles.tagContainer}>
                            <Icon name="tag" size={20} color={checkedList.includes(task.task_id) ? '#000' : tag.color} style={checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : ''} />
                            <Text style={[styles.description, checkedList.includes(task.task_id) ? styles.checkedBoxDecoration : '', styles.tagText]} >{tag.tag_name}</Text>
                          </View>
                        );
                      }
                    })
                  }
                </View>
              </TouchableOpacity>
            </View>
          )
        })
          :
          <List backgroundColor='#fff' foregroundColor='#dff' style={styles.loader} />
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
    padding: 15,
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
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
  },
  tagText: {
    marginLeft: 10,
  },
  loader: {
    position: 'absolute',
    marginTop: '18%',
    marginLeft: 15,
  }
});
