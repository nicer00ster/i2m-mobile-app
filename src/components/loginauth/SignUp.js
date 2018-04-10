import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, ActivityIndicator, Alert } from 'react-native';

import { Auth } from 'aws-amplify';

import { Input } from '../functions/Input';
import { Button } from '../functions/Button';


export default class SignUp extends React.Component {
  static navigationOptions = {
     title: 'SIGNUP',
     headerStyle: {
       backgroundColor: '#2980b9',
     },
     headerTitleStyle: {
       color: '#FFF'
     }
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      indicating: false,
    }
  }

  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  onPressSignUp() {
    const { firstName, lastName, username, email, password } = this.state;
    const domain = email.replace(/.*@/, "");
    const regex = /(@i2m.solutions|@i2mcloud.com|@pacareerlinkphl.org)\s*$/

    if(regex.test(email)) {
      this.setState({ indicating: true })
      Auth.signUp({
        username,
        email,
        password,
        attributes: {
          email,
          'custom:firstName': firstName,
          'custom:lastName': lastName
        },
      })
      .then(() => {
        this.setState({ indicating: false })
        Alert.alert(
          'Almost there!',
          'Just confirm the verification link we sent to your email and you\'ll be good to go.',
          [
            {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
          ],
          { cancelable: false }
        )
      })
      .catch(err => {
        this.setState({ indicating: false })
        alert(err.message);
      })
    } else {
      Alert.alert(
        'Restricted Domain',
        'The email domain you tried to register is not allowed, try using your work email.',
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
        ],
        { cancelable: false }
      )
    }

  }

  renderCurrentState() {
    if (this.state.indicating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={styles.form}>
          <Image
            style={styles.logo}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/i2m-photos/logos/i2m-white.png'}}
          />
          <Input
            placeholder='Username'
            label='Username'
            onChangeText={username => this.setState({ username })}
            returnKeyType="next"
            secureTextEntry={false}
          />
          <View style={styles.row}>
            <Input
              placeholder='First name'
              label='First name'
              onChangeText={firstName => this.setState({ firstName })}
              returnKeyType="next"
              secureTextEntry={false}
            />
            <Input
              placeholder='Last name'
              label='Last name'
              onChangeText={lastName => this.setState({ lastName })}
              returnKeyType="next"
              secureTextEntry={false}
            />
          </View>

          <Input
            placeholder='Email address'
            label='Your email'
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            secureTextEntry={false}
          />
          <Input
            placeholder='Password'
            label='Create a password'
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            returnKeyType="next"
          />
          <Button onPress={() => this.onPressSignUp()}>
            CREATE ACCOUNT
          </Button>
          <Button onPress={() => this.props.navigation.goBack()}>
            CANCEL
          </Button>
        </View>
      </ScrollView>
    )
}

  render() {
    return (
      <View style={styles.formContainer}>
        {this.renderCurrentState()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    alignContent: 'center',
  },
  logo: {
    width: 135,
    height: 65,
    resizeMode: 'stretch'
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flex: 1,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})
