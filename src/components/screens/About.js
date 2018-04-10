import React from 'react';
import { StyleSheet, Text, View, Button, Image, Animated } from 'react-native';
import { Card } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';


class FadeImage extends React.Component {
  state = {
    fade: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(
      this.state.fade,
      {
        toValue: 1,
        delay: this.props.wait,
        duration: 3000
      }
    ).start();
  }

  render() {
    let { fade } = this.state;
    const wait = this.props.wait;
    return (
        <Animated.View
          wait={wait}
          style={{
            ...this.props.style,
            opacity: fade,
          }}
          >
          {this.props.children}
        </Animated.View>
    )
  }
}



export default class About extends React.Component {
  static navigationOptions = {
     title: 'ABOUT US (& YOU)',
     headerStyle: {
       backgroundColor: '#2980b9',
     },
     headerTitleStyle: {
       color: '#FFF'
     }
  }

  render() {
    const url = 'https://s3.us-east-2.amazonaws.com/i2m-photos/logos/';
    return (
      <View style={styles.container}>
      <Grid>
        <Col>
          <FadeImage style={{marginVertical: 20}} wait={1000}>
            <Image
              style={styles.logo}
              source={{uri: url + 'philaworks.png'}}
            />
          </FadeImage>
          <FadeImage style={{marginVertical: 20}} wait={3000}>
            <Image
              style={styles.logo}
              source={{uri: url + 'dla.png'}}
            />
          </FadeImage>
          <FadeImage style={{marginVertical: 20}} wait={5000}>
            <Image
              style={styles.logo}
              source={{uri: url + 'sharp.png'}}
            />
          </FadeImage>
        </Col>
        <Col>
          <FadeImage style={{marginVertical: 20}} wait={2000}>
            <Image
              style={styles.logo}
              source={{uri: url + 'Impact-Services.gif'}}
            />
          </FadeImage>
          <FadeImage style={{marginVertical: 20}} wait={4000}>
            <Image
              style={styles.logo}
              source={{uri: url + 'erb.png'}}
            />
          </FadeImage>
        </Col>
      </Grid>
      <FadeImage style={{flex: 1}} wait={6500}>
        <Card style={styles.container}>
          <Text style={styles.text}>A personal thank you from i2m for the years of trust, partnership, and loyalty. As we watch our clients grow, we as a company grow with you.</Text>
          <Text style={styles.text}>Our goal is to provide expertise in assisting our clients with reliablility & innovation.</Text>
          <Image style={{width: 85, height: 35, alignSelf: 'flex-start', margin: 15}} source={{uri: url + 'i2m-blue.png'}} />
        </Card>
      </FadeImage>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginVertical: 15,
    padding: 20
  },
  logo: {
    width: 135,
    height: 45,
    resizeMode: 'stretch',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '200',
    marginVertical: 15
  }
})
