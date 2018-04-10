import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Input = ({ label, value, keyboardType, onChangeText, placeholder, placeholderTextColor, returnKeyType, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ label }</Text>
      <TextInput
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='rgba(255, 255, 255, 0.7)'
        style={styles.input}
        value={value}
        returnKeyType={returnKeyType}
        underlineColorAndroid='transparent'
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderColor: '#FFF',
    borderBottomWidth: 2,
  },
  label: {
    padding: 5,
    paddingBottom: 0,
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
    width: '100%'
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 2,
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10
  }
})

export { Input };
