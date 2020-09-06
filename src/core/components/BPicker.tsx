import React, {Component} from 'react';
import {HelperText, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {withTheme} from 'react-native-paper';
import BError from './BError';

interface Props {
  label?: string;
  prompt?: string;
  value?: string;
  selectedValue?: string;
  items?: {label: string; value: string; item?: any}[];
  errorText?: string;
  error?: boolean;
  onBlur?: any;
  onChange?: any;
  onLoad?: any;
  theme: any;
  enabled?: boolean;
}

class BPicker extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
  UNSAFE_componentWillMount() {
    if (this.props.onLoad) {
      this.props.onLoad(true);
    }
  }
  renderItems() {
    let listItems: any = [];
    if (this.props.items) {
      this.props.items.forEach((item) => {
        listItems.push(
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />,
        );
      });
    }
    return listItems;
  }
  renderLabel() {
    return (
      <View>
        <Text>
          {this.props.label ? this.props.label : 'Seleccione una opción'}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View>
        <Text>{this.renderLabel()}</Text>
        <View
          style={this.props.error ? styles.containerError : styles.container}>
          <Picker
            mode="dropdown"
            prompt={this.props.prompt}
            enabled={this.props.enabled}
            selectedValue={this.props.selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === '-1') {
                this.props.onChange(null);
              } else {
                this.props.onChange(itemValue);
              }
            }}
            style={
              this.props.enabled && !this.props.enabled
                ? styles.pickerdisabled
                : styles.picker
            }
            onBlur={this.props.onBlur}>
            {this.renderItems()}
          </Picker>
        </View>
        <BError text="Campo Invalido" error={this.props.error} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  containerError: {
    color: 'red',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
  },
  picker: {
    color: 'black',
  },
  pickerdisabled: {
    color: 'gray',
  },
});

export default withTheme(BPicker);
