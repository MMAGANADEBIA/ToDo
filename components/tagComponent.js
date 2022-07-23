//important modules
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SQLite from 'expo-sqlite';
//import icons

//open sqlite database
const db = SQLite.openDatabase('todo.db');

export default function TagComponent(props) {
  const [tags, setTags] = useState(props.tags);

  useEffect(() => {
    setTags(props.tags)
  }, [props.tags])

  useEffect(() => {
    setTags(tags)
  }, [tags])

  const deleteTag = (tag_id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'delete from tags where tag_id = ?;',
        [tag_id]
      )
    })
    update();
  }

  const update = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from tags;',
        [],
        (_, { rows: { _array } }) => setTags(_array),
        (_, error) => console.log`Error: ${error}`
      )
    });
  }

  return (
    <View>
      {
        tags ? tags.map((tag) => {
          return (
            <View key={tag.tag_id} style={styles.component}>
              <Icon name='tag' size={30} color={tag.color} />
              <View>
                <Text style={styles.tagText}>{tag.tag_name}</Text>
                <Text style={styles.tagText}>{tag.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTag(tag.tag_id)}
              >
                <Icon name="trash" size={30} color={'red'} />
              </TouchableOpacity>
            </View>
          )
        })
          : <Text>Sin etiquetas.</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    // borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
  },
  tagText: {
    marginLeft: 10,
  },
  deleteButton: {
    position: 'absolute',
    marginLeft: '80%',
    marginTop: '3%',
    alignItems: 'center',
    // backgroundColor: 'red',
    // borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
});
