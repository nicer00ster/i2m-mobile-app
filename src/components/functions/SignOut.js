import React from 'react';
import { Auth } from 'aws-amplify';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';


const SignOut = ({ navigation }) => {
    Alert.alert(
      'LOGGING OUT',
      'You are about to sign out, are you sure?',
      [
        {text: 'CANCEL', onPress: () => navigation.navigate('Home'), style: 'cancel'},
        {text: 'YES', onPress: () => Auth.signOut()
        .then(() => {
          navigation.navigate('Login')
        })
        .catch(function(error) {
          Alert.alert(
            'ERROR',
            error,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
      )}
      ]
    )
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      </View>
    );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
}
export { SignOut };
