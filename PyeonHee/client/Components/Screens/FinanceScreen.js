import React, { Component, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    Button,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
const FinanceScreen = () => {
    const [userID, setUserID] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
      AsyncStorage.getItem('userID', (err, result) => {
        const tempID = result;
        if(tempID!= null){
          setUserID(tempID);
          setLoading(true);
        }
      });
    })
    if(loading === true){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Finance: {userID}</Text>
        </View>
      )
    }else{
      return (
          <View style={{ flex: 1,}}>
          </View>
      )
    }
}

export default FinanceScreen;