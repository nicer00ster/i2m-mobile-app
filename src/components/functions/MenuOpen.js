import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuOpen = props => {
  return (
    <View style={{backgroundColor: '#2980b9'}}>
      <TouchableOpacity onPress={() => props.navigate('DrawerOpen')}>
        <Icon style={{padding: 10, marginLeft: 10}} name="bars" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  )
};

export default MenuOpen;
