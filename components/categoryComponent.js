//important modules
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import ContentLoader, { Rect, Circle, List } from 'react-content-loader/native';
import * as SQLite from 'expo-sqlite';

//open the sqlite database
const db = SQLite.openDatabase('todo.db');

export default function CategoryComponent(props) {
  const [categories, setCategories] = useState(props.categories);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories])

  useEffect(() => {
    setCategories(categories)
  }, [categories])

  const deleteCategory = (category_id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'delete from category_lists where category_id = ?;',
        [category_id]
      )
    })
    update();
  }

  const update = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from category_lists;',
        [],
        (_, { rows: { _array } }) => setCategories(_array),
        (_, error) => console.log`Error: ${error}`
      );
    });
  }

  return (
    <View>
      {
        categories ?
          categories.map((category) => {
            return (
              <View key={category.category_id} style={styles.categoryContainer}>
                <View>
                  <Icon name="list" size={20} color={"blue"} />
                </View>
                <View style={styles.categoryContent}>
                  <Text>{category.category_name}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteCategory(category.category_id)}
                  style={styles.deleteButton}
                >
                  <Icon name="trash" size={30} color={'red'} />
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
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
  },
  categoryContent: {
    marginLeft: 10,
  },
  categoryDescription: {
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
});
