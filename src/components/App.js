import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import Amplify, { Analytics, Auth } from 'aws-amplify';
import aws_exports from '../../aws-exports';

import { DrawerNavigator } from 'react-navigation';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './loginauth/Login';
import Home from './screens/Home';
import ClientTicket from './screens/ClientTicket';
import TheTeam from './screens/TheTeam';
import ContactUs from './screens/ContactUs';
import About from './screens/About';

import { SignOut } from './functions/SignOut';

Amplify.configure(aws_exports);
Analytics.record('_userauth.sign_in');

export default class App extends React.Component {
  render() {
    return (
      <SideNavigator />
    );
  }
}

const DrawerContent = (props) => (
  <React.Fragment>
    <View style={{height: 'auto', alignItems: 'center', justifyContent: 'center', padding: 20}}>
      <Image source={require('../images/i2m-blue.png')}/>
    </View>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={{elevation: 4, margin: 10, borderBottomColor: '#636e72', borderBottomWidth: 1}} />
      <DrawerItems {...props} />
    </SafeAreaView>
  </React.Fragment>
)

const SideNavigator = DrawerNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      drawerIcon: (<Icon name="home" size={21} color="#000" />)
    }
  },
  SubmitTicket: {
    screen: ClientTicket,
    navigationOptions: {
      drawerIcon: (<Icon name="folder-open-o" size={21} color="#000" />)
    }
  },
  Team: {
    screen: TheTeam,
    navigationOptions: {
      drawerIcon: (<Icon name="heart-o" size={21} color="#000"/>)
    }
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: {
      drawerIcon: (<Icon name="connectdevelop" size={21} color="#000"/>)
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      drawerIcon: (<Icon name="globe" size={21} color="#000"/>)
    }
  },
  SignOut: {
    screen: SignOut,
    navigationOptions: {
      drawerIcon: (<Icon name="hand-peace-o" size={21} color="#000"/>),
      title: 'SIGN OUT',
      headerStyle: {
        backgroundColor: '#2980b9',
      },
      headerTitleStyle: {
        color: '#FFF'
      }
    }
  }
}, {
  contentComponent: DrawerContent,
});
