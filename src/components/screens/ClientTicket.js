import React from 'react';
import axios from 'axios';

import Amplify, { Auth } from 'aws-amplify';

import { StyleSheet, View, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import { Container, Card, Content, Text, Input } from 'native-base';

import { Button } from '../functions/Button';

export default class ClientTicket extends React.Component {
  static navigationOptions = {
     title: 'SUBMIT A TICKET',
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
      indicating: false,
      title: '',
      desc: '',
      company: '',
      userEmail: '',
      firstName: '',
      lastName: ''
    };
  }
  componentDidMount() {
    this.getEmailAndCompany()
  }

  async getEmailAndCompany() {
    // get signed-in users email
    try {
      let user = await Auth.currentUserInfo().then((data) => {
        this.setState({
          userEmail: data.attributes.email,
          firstName: data.attributes['custom:firstName'],
          lastName: data.attributes['custom:lastName']
        })
        Auth.currentUserInfo().then((data) => {
          console.log(data);
        })
      })
      console.log(this.state.userEmail)
      // get signed-in users company
      const domain = this.state.userEmail.replace(/.*@/, "");
      switch (domain) {
        case 'i2m.solutions': this.setState({ company: 'i2m' })
          break;
        case 'i2mcloud.com': this.setState({ company: 'i2mcloud' })
          break;
        case 'impactservices.org': this.setState({ company: 'Impact' })
          break;
        case 'pacareerlinkphl.org': this.setState({ company: 'PWI' })
          break;
        case 'facetofacegermantown.org': this.setState({ company: 'F2F' })
          break;
        case 'equityretailbrokers.com': this.setState({ company: 'ERB' })
          break;
        case 'dlaltg.com': this.setState({ company: 'DLA' })
          break;
        case 'maccapital.net': this.setState({ company: 'MAC' })
          break;
        case 'mercyneighbors.org': this.setState({ company: 'MNM' })
          break;
        case 'sliwinskifloorcovering.com': this.setState({ company: 'Sliwinski' })
          break;
        default: this.setState({ company: 'Catchall' })
      }
      console.log(this.state.company);
    }
    catch(e) {
      alert(e)
    }
  }

  submitTicket = () => {
    const { title, desc, company, userEmail, firstName, lastName } = this.state;
    this.setState({
      indicating: true
    });
    axios({
      method: 'post',
      url: 'https://api-na.myconnectwise.net/v4_6_release/apis/3.0/service/tickets/',
      data: {
          "company": {
            "identifier": company
          },
          "contactName": `${firstName} ${lastName}`,
          "board": {
            "name": "Help Desk"
          },
          "summary": title,
          "initialDescription": desc,
          "contactEmailAddress": userEmail
      },
      headers: {
        'Authorization': '***auth-code-for-connectwise-goes-here***',
        'Accept': 'application/vnd.connectwise.com+json; version=3.0.0',
      },
      validateStatus: (status) => {
        return true;
      },
    })
    .then((response) => {
      if(response.status === 201) {
        this.setState({
          indicating: false
        });
        Alert.alert(
          'Ticket Submitted',
          'Your ticket has been submitted to the I2M team and we\'ll be in touch soon!',
          [
            {text: 'THANKS!', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false}
        )
      } else {
        console.log(response);
        this.setState({
          indicating: false
        });
        Alert.alert(
          'Ticket Submission Failed',
          'Your ticket wasn\'t able to reach our server. We apologize for the inconvenience. Try again soon.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false}
        )
      }
    })
    .catch(error => {
      alert(error)
    })
  }

  renderCurrentState() {
    if (this.state.indicating) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color='#FFF' />
        </View>
      )
    }
    return (
      <View>
        <Container style={styles.ticketContainer}>
          <Image
            style={styles.logo}
            source={{uri: 'https://s3.us-east-2.amazonaws.com/i2m-photos/logos/i2m-white.png'}}
          />
          <Content>
            <Text style={styles.ticketText}>First, enter a title of your ticket...</Text>
            <View>
              <Card>
                <TextInput
                  placeholder="&times;"
                  maxLength={36}
                  editable={true}
                  returnKeyType={'next'}
                  onChangeText={(title) => this.setState({ title })}
                  value={this.state.title}
                />
              </Card>
            </View>
            <Text style={styles.ticketText}>Then, give us a detailed description of your issue...</Text>
            <View>
              <Card>
                <TextInput
                  placeholder="&times;"
                  maxLength={180}
                  editable={true}
                  numberOfLines={4}
                  returnKeyType={'send'}
                  onChangeText={(desc) => this.setState({ desc })}
                  value={this.state.desc}
                />
              </Card>
            </View>
            <Button onPress={() => this.submitTicket()}>SUBMIT TICKET</Button>
          </Content>
        </Container>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  ticketContainer: {
    flex: 4,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 135,
    height: 65,
    resizeMode: 'stretch',
    margin: 15,
  },
  ticketText: {
    padding: 5,
    color: '#fff',
  },
  ticketTextArea: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
})
