import React from 'react';
import { Image, StyleSheet, FlatList, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';

import team from '../../../team.json';


export default class TheTeam extends React.Component {
  static navigationOptions = {
     title: 'MEET THE TEAM',
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
      list: [
        team.members.one,
        team.members.two,
        team.members.three,
        team.members.four,
        team.members.five,
        team.members.six,
        team.members.seven,
        team.members.eight,
        team.members.nine,
        team.members.ten,
        team.members.eleven,
        team.members.twelve,
      ]
    }
  }

  render() {
    const contents = this.state.list.map(function(item) {
      return (
        <Card key={item.key}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: item.thumbnail}} />
              <Body>
                <Text>{item.name}</Text>
                <Text note>{item.position}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: item.picture}} style={{flex: 1, alignSelf: 'center', height: 250, width: 150, borderWidth: 1, borderRadius: 5, margin: 15}} />
          </CardItem>
        </Card>
      );
    });
    return (
      <Container>
        <Content>
          {contents}
        </Content>
      </Container>
    )
  }
}
