import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

import { Auth } from 'aws-amplify';
import '../../../aws-exports';

import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Home from '../screens/Home';
import ClientTicket from '../screens/ClientTicket';
import TheTeam from '../screens/TheTeam';
import ContactUs from '../screens/ContactUs';
import About from '../screens/About';
import MenuOpen from '../functions/MenuOpen';
import { Input } from '../functions/Input';
import { Button } from '../functions/Button';
import { SignOut } from '../functions/SignOut';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      indicating: false,
      isAuthorized: false,
    }
  }

  componentWillMount() {
    Auth.currentSession()
    .then((user) => {
      if(user) {
        this.setState({
          isAuthorized: true
        })
      } else {
        this.setState({
          isAuthorized: false
        })
      }
    })
  }

  onPressSignIn() {
    const email = this.state.email;
    const password = this.state.password;

    this.setState({
      indicating: true
    });

    Auth.signIn(email, password)
    .catch(err => {
      if(!email) {
        return alert('Username field cannot be empty')
      } else if (!password) {
        return alert('Password field cannot be empty')
      } else {
        alert(err.message)
      }
    })
    .then(user => {
      this.setState({
        indicating: false
      })
      if(user) {
        this.props.navigation.navigate('Home')
      } else {
        return;
      }
    })
  }

  onPressSignOut() {
    Alert.alert(
      'LOGGING OUT',
      'You are about to sign out, are you sure?',
      [
        {text: 'CANCEL', onPress: () => console.log('Cancelled'), style: 'cancel'},
        {text: 'YES', onPress: () => Auth.signOut()
        .then(() => {
          this.setState({ isAuthorized: false })
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
        })}
      ]
    )
  }

  renderCurrentState() {
    if (this.state.indicating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      )
    }
    if(!this.state.isAuthorized) {
      return (
        <View style={styles.form}>
          <Image
            style={styles.logo}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/i2m-photos/logos/i2m-white.png'}}
          />
          <Text style={styles.title}>
            i2m mobile application
          </Text>
          <Input
            placeholder='Email...'
            label='Email'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <Input
            placeholder='Password...'
            label='Password'
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            returnKeyType="go"
          />
          <Button onPress={() => this.onPressSignIn()}>LOGIN</Button>
          <Button onPress={() => this.props.navigation.navigate('SignUp')}>SIGNUP</Button>
        </View>
      )
    } else {
      return (
        <View style={styles.form}>
          <Image
            style={styles.logo}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/i2m-photos/logos/i2m-white.png'}}
          />
          <Text style={styles.authText}>
            {Auth.userPool.getCurrentUser().username}, you're already logged in!
          </Text>
          <Button style={{padding: 20}} onPress={() => this.onPressSignOut()}>LOGOUT</Button>
          <Button style={{padding: 20}} onPress={() => this.props.navigation.navigate('Home')}>GO HOME</Button>
        </View>
      )
    }
  }

    render() {
      return (
        <View style={styles.container}>
          {this.renderCurrentState()}
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
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
    logo: {
      width: 135,
      height: 65,
      resizeMode: 'stretch'
    },
    title: {
      color: '#fff',
      marginTop: 10,
      width: 160,
      textAlign: 'center',
      opacity: 0.6
    },
    authText: {
      color: '#fff',
      marginTop: 10,
      width: 315,
      textAlign: 'center',
      opacity: 0.7,
      fontSize: 25
    }
  });

  const AppNavigator = StackNavigator({
   Login: {
     screen: Login,
     navigationOptions: {
       drawerLockMode: 'locked-closed',
       headerLeft: null
     }
   },
   SignUp: {
     screen: SignUp,
     navigationOptions: {
       drawerLockMode: 'locked-closed'
     }
   },
   Home: {
     screen: Home,
     navigationOptions: ({ navigation }) => ({
       headerLeft: <MenuOpen navigate={navigation.navigate} />
     })
   },
   SubmitTicket: {
     screen: ClientTicket,
     navigationOptions: ({ navigation }) => ({
       headerLeft: <MenuOpen navigate={navigation.navigate} />
     })
   },
   Team: {
     screen: TheTeam,
     navigationOptions: ({ navigation }) => ({
       headerLeft: <MenuOpen navigate={navigation.navigate} />
     })
   },
   ContactUs: {
     screen: ContactUs,
     navigationOptions: ({ navigation }) => ({
       headerLeft: <MenuOpen navigate={navigation.navigate} />
     })
   },
   About: {
     screen: About,
     navigationOptions: ({ navigation }) => ({
       headerLeft: <MenuOpen navigate={navigation.navigate} />
     })
   },
   SignOut: {
     screen: SignOut,
     navigationOptions: ({ navigation }) => ({
       headerLeft: <MenuOpen navigate={navigation.navigate} />,
       drawerLockMode: 'locked-closed'
     })
   },
}, {
  navigationOptions: {
    title: 'I2M',
    headerStyle: {
     backgroundColor: '#2980b9',
    },
    headerTitleStyle: {
     color: '#FFF'
    }
 }
})

export default AppNavigator;
