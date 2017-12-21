import React from 'react';
import {Badge, Button, Container, Content, Header, Text} from 'native-base';

export default class ButtonThemeExample extends React.Component {

  render() {
    console.log(435);
    return (
        <Container>
          <Header>
            <Text>1</Text>
            <Button light><Text> Light </Text></Button>
          </Header>
          <Content>
            <Badge>
              <Text>122</Text>
            </Badge>
            <Text> Dark </Text>
            <Button light><Text> Light </Text></Button>
            <Button primary><Text> Primary </Text></Button>
            <Button success><Text> Success </Text></Button>
            <Button info><Text> Info </Text></Button>
            <Button warning><Text> Warning </Text></Button>
            <Button danger><Text> Danger </Text></Button>
            <Button dark><Text> Dark </Text></Button>
          </Content>
        </Container>
    );
  }
};