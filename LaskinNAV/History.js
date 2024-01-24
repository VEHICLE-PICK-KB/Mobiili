import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import { useState,} from 'react';





export default function History({ route }) {
    const { historyData } = route.params;




    return (
    <View style={styles.container}>
    <Text style={{ fontSize: 22 }}>History</Text>
    <FlatList data={historyData} renderItem={({item}) => <Text>{item.key}</Text>}
       keyExtractor={(item, index) => index.toString()} />
    </View>
    );
    };
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'flex-start',

          
        }});