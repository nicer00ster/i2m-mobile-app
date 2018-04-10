import React from 'react';
import { StyleSheet, View, Image, Text, Linking } from 'react-native';
import { Button } from '../functions/Button';

export default class ContactUs extends React.Component {
  static navigationOptions = {
     title: 'CONTACT US',
     headerStyle: {
       backgroundColor: '#2980b9',
     },
     headerTitleStyle: {
       color: '#FFF'
     }
  }

  onPressCall() {
    const url = 'tel:8889913814';
    Linking.canOpenURL(url)
      .then((supported) => {
        if(!supported) {
          console.error('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url)
            .then((data) => console.error("then", data))
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => console.error('An error occured', err));
  }

  onPressEmail() {
    const email = 'mailto:info@i2m.solutions';
    Linking.canOpenURL(email)
      .then((supported) => {
        if(!supported) {
          console.error('Can\'t handle email: ' + email);
        } else {
          return Linking.openURL(email)
            .then((data) => console.error("then", data))
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => console.error('An error occured', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../images/i2m-blue.png')}/>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 22, fontWeight: '400', textAlign: 'center'}}>If you need further assistance you can contact us through email or give us a call.</Text>
        </View>
          <Button onPress={() => this.onPressEmail()}>EMAIL</Button>
          <Button onPress={() => this.onPressCall()}>PHONE</Button>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
})
