import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {Alert, Clipboard, StyleSheet, View} from 'react-native';
import BError from './BError';

interface State {
  value: string;
}
interface Props {
  mode?: 'flat' | 'outlined';
  label?: string;
  value?: string;
  error?: any;
  onChange?: any;
  keyboardType?: any;
  secureTextEntry?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  multipleSpace?: boolean;
  isPassword?: boolean;
  onBlur?: any;
  icon?: any;
  contextMenuHidden?: boolean;
  maxLength?: any;
  style?: any;
}
export default class BTextInput extends Component<Props, State> {
  /* handleOnPaste = (content: any) => {
    Alert.alert('No es valido pegar contenido');
    //return true;
  }; */

  handleOnChangeText = async (content: any) => {
    if (content === '') {
      return true;
    }
    const copiedContent = await Clipboard.getString();

    if (copiedContent === '') {
      return true;
    }
    const isPasted = content.includes(copiedContent);
    if (isPasted) {
      Alert.alert('No es valido pegar contenido');
      return false;
    } else {
      return true;
    }
  };
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          style={[styles.input]}
          error={this.props.error}
          secureTextEntry={this.props.isPassword ? true : false}
          mode={this.props.mode ? this.props.mode : 'outline'}
          label={this.props.label}
          onChangeText={async (text) => {
            this.handleOnChangeText(text);
            //(await this.handleOnChangeText(text)) === true ? null : (text = '');
            //this.handleOnPaste(text) ? (text = '') : null;
            if (!/\S/.test(text)) {
              text = text.replace(/\s/g, '');
            }
            if (!this.props.multipleSpace) {
              text = text.replace(/\s/g, '');
            }
            this.props.onChange(text);
          }}
          value={this.props.value}
          disabled={this.props.disabled}
          multiline={this.props.multiline}
          numberOfLines={this.props.numberOfLines}
          contextMenuHidden={false}
          maxLength={50}
          underlineColorAndroid="transparent"
        />
        <BError error={this.props.error} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
  },
  input: {
    borderRadius: 5,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    height: 60,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
  },
});
