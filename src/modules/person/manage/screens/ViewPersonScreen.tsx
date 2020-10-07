import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {FNCPERSON} from '../../../../state/person/types';
import {FNBNUCVIV} from '../../../../state/house/types';
import {GenreService, SexAndRepHealthPersonService} from '../../../../services';
import {setFNCNCSALREP} from '../../../../state/SexAndRepHealthPerson/actions';

interface Props {
  navigation: NavigationProp<any>;
  FNCPERSON: FNCPERSON;
  FNBNUCVIV: FNBNUCVIV;
  setFNCNCSALREP: any;
}
interface State {
  created: boolean;
  enableSexReproductionHealt: boolean;
}

class ViewPersonScreen extends Component<Props, State> {
  state = {
    created: false,
    enableSexReproductionHealt: false,
  };
  private _unsubscribe: any;
  _goBack() {
    this.props.navigation.goBack();
  }
  async UNSAFE_componentWillMount() {}
  async componentDidMount() {
    if (!this.props.FNCPERSON.ID) {
      this.navigate('PersonalInformationScreen');
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        if (this.state.created) {
          if (!this.props.FNCPERSON.ID) {
            this.props.navigation.goBack();
          }
        } else {
          this.setState({
            created: true,
          });
        }
      });
    } else {
      let genreService = new GenreService();
      let Genre = await genreService.get(this.props.FNCPERSON.FNCGENERO_ID);
      if (Genre && Genre.CODIGO == 'F') {
        this.setState({
          enableSexReproductionHealt: true,
        });
      }
      let sxhealtservice = new SexAndRepHealthPersonService();
      let item = await sxhealtservice.getFNCSALREP(this.props.FNCPERSON.ID);
      if (item) {
        this.props.setFNCNCSALREP(item);
      }
    }
  }
  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
  render() {
    return (
      <View>
        <KeyboardAwareScrollView>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => this._goBack()} />
            <Appbar.Content title="Ver persona" />
          </Appbar.Header>
          <Text>
            {this.props.FNCPERSON.PRIMER_NOMBRE}{' '}
            {this.props.FNCPERSON.PRIMER_APELLIDO}
          </Text>
          <Text>Nucleo al que pertenece: {this.props.FNBNUCVIV.CODIGO}</Text>
          <List.Section>
            <List.Item
              onPress={() => this.navigate('PersonalInformationScreen')}
              title="Datos personales"
              left={() => <List.Icon icon="account-box" />}
            />
            <List.Item
              title="Datos de nacimiento"
              left={() => <List.Icon icon="baby-face" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Seguridad social"
              left={() => <List.Icon icon="bottle-tonic-plus" />}
              onPress={() => this.navigate('SocialSecurityScreen')}
            />
            <List.Item
              title="Datos de contacto"
              left={() => <List.Icon icon="card-account-phone" />}
              onPress={() => this.navigate('ContactInformationScreen')}
            />
            <List.Item
              title="Otros datos de identificación"
              left={() => <List.Icon icon="card-account-mail" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Informacion de salud"
              left={() => <List.Icon icon="bottle-tonic-plus-outline" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Estado de salud en la visita"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.navigate('HealthStatusVisitScreen')}
            />
            <List.Item
              title="Hábitos no saludables"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.navigate('UnhealthyHabitsScreen')}
            />
            <List.Item
              title="Salud sexual y reproductiva"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => {
                this.state.enableSexReproductionHealt
                  ? this.navigate('ReproductiveSexualHealtScreen')
                  : Alert.alert(
                      'Acción no permitida',
                      'solo aplica para genero "Femenino"',
                    );
              }}
            />
            <List.Item
              title="Finalización de la última gestación"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.navigate('LastPregnancyScreen')}
            />
            <List.Item
              title="Gestación actual"
              left={() => <List.Icon icon="map-marker" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Otros datos de salud sexual y reproductiva"
              left={() => <List.Icon icon="map-marker" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Mortalidad en los últimos 12 meses"
              left={() => <List.Icon icon="emoticon-dead" />}
              onPress={() => this.navigate('MortalityLast12MonthsScreen')}
            />
          </List.Section>
        </KeyboardAwareScrollView>
      </View>
    );
  }
  navigate(screen: string) {
    this.props.navigation.navigate(screen);
  }
}
const mapDispatchToProps = {
  setFNCNCSALREP,
};
const mapStateToProps = (reducer: any) => {
  return {
    FNCPERSON: reducer.person.FNCPERSON,
    FNBNUCVIV: reducer.housing.FNBNUCVIV,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPersonScreen);
