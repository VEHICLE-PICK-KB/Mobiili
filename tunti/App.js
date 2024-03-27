import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Button, Icon, Input, Header, ListItem } from '@rneui/themed';

const db = SQLite.openDatabase('coursedb.db');

export default function App() {
  const [credit, setCredit] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists course (id integer primary key not null, credits int, title text);');
    }, () => console.error("Error when creating DB"), updateList);  
  }, []);

  // Save course
  const saveItem = () => {
    if (credit && title) {
      db.transaction(tx => {
          tx.executeSql('insert into course (credits, title) values (?, ?);', [parseInt(credit), title]);    
        }, () => console.error("Error in Insert"), updateList
      )
    }
    else {
      Alert.alert('Error', 'Type credit and title first');
    }
  }

  // Update courselist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from course;', [], (_, { rows }) =>
        setCourses(rows._array)
      ); 
      setTitle('');
      setCredit('')
    });
  }

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from course where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header centerComponent={{text: 'MY COURSES', style: {fontSize:18, color: 'red'}}} >
      </Header>
      <Input 
        placeholder='Title' 
        onChangeText={title => setTitle(title)}
        value={title}/>  
      <Input placeholder='Credits' 
        keyboardType="numeric" 
        onChangeText={credit => setCredit(credit)}
        value={credit}/>      
      <Button onPress={saveItem}> 
      Save
      <Icon name="save" color="red">
      </Icon>
      </Button>
      <Text style={{marginTop: 30, fontSize: 20}}>Courses</Text>
      <FlatList 
        style={{width: '90%'}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => 
        <ListItem.Swipeable
        rightContent={(reset) => (
          <Button
            title="Delete"
            onPress={() => deleteItem(item.id)}
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          />
        )}
        >
          <ListItem.Content>
            <ListItem.Title>
            Course: {item.title}
            </ListItem.Title>
            <ListItem.Subtitle>
            Credits: {item.credits} 
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Swipeable>
      
      
      } 
        data={courses} 
        ItemSeparatorComponent={listSeparator} 
      />      
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
});

