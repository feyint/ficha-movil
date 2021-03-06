import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {LastPregnancyForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
class LastPregnancyScreen extends Component<Props, any> {
  //TODO añadir el back interceptor
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Finalizacion de la ultima gestacion" />
        </Appbar.Header>
        <LastPregnancyForm />
      </View>
    );
  }
}
export default LastPregnancyScreen;
