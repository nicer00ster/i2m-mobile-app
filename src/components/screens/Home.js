import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';


export default class Home extends React.Component {
  static navigationOptions = {
     title: 'HOME',
     headerStyle: {
       backgroundColor: '#2980b9',
     },
     headerTitleStyle: {
       color: '#FFF'
     }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{uri: 'https://s3.us-east-2.amazonaws.com/i2m-photos/logos/i2m-white.png'}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 185,
    height: 85,
    resizeMode: 'stretch'
  },
})
