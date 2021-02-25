/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Checkbox, Searchbar, Text} from 'react-native-paper';
import {connect} from 'react-redux';
import {setFUBUBIVIV, clearFUBUBIVIV} from '../../../state/house/actions';
import {theme} from '../../../core/style/theme';
import BFabButton from '../../../core/components/BFabButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFUBUBIVIV} from '../../../hooks';

import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = (props: any) => {
  
  // TODO ajustar el filtro por queries y grupos, agregar fecha de creacion a ficha
  const [houses, setHouses] = useState<any[]>([]);
  const [filteredHouses, setfilteredHouses] = useState<any[]>([]);
  const [wordHouse, setWordHouse] = useState('');
  const [checked, setChecked] = useState(false);
  const {
    listFUBUBIVIV,
    getAllFUBUBIVIV,
    itemsFilter,
    search,
    filterFUBUBIVIV,
  } = useFUBUBIVIV();
  const navigation = useNavigation();

  useEffect(() => {
    setHouses(listFUBUBIVIV);
  }, [listFUBUBIVIV]);
  useEffect(() => {
    if (checked) {
      search('', true);
    } else {
      search('');
    }
  }, [checked]);
  useEffect(() => {
    search('');
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHouses();
    });
    return unsubscribe;
  }, [navigation]);
  async function fetchHouses() {
    getAllFUBUBIVIV();
  }
  function searchHouse(textToSearch: any) {
    setWordHouse(textToSearch);
    if (checked) {
      search(textToSearch, true);
    } else {
      search(textToSearch);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Appbar.Header>
        <Appbar.Content title="SIPSALUD" />
        <Appbar.Action icon="cellphone-erase" onPress={_cerrarSesion} />
      </Appbar.Header>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={styles.label}>Busqueda por documento de identidad?</Text>
      </View>
      <View style={styles.searchbar}>
        <Text style={styles.title}>
          {checked
            ? 'Ingresa número de cédula a buscar'
            : 'Ingresa el codigo de vivienda'}
        </Text>
        <Searchbar
          placeholder=""
          onChangeText={(text: any) => {
            searchHouse(text);
          }}
          value={wordHouse}
        />
      </View>
      <View>
        <Text style={styles.textred}>Registros existentes</Text>
        <KeyboardAwareScrollView>
          {checked ? renderPerson(itemsFilter) : renderHouse(itemsFilter)}
          <View style={styles.spacer} />
        </KeyboardAwareScrollView>
      </View>
      <BFabButton onPress={() => createNew()} />
    </View>
  );

  function renderHouse(items) {
    return (
      <View style={styles.container}>
        {items.map((house: any, i: number) => {
          return (
            <CardView
              key={i}
              cardElevation={8}
              cardMaxElevation={10}
              cornerRadius={6}
              style={styles.cardView1}>
              <TouchableOpacity onPress={() => goToHouse(house)}>
                <View style={{flex: 1, padding: 20}}>
                  <CardItem title="Codigo" value={`${house.CODIGO}`} />
                  <CardItem title="Dirección" value={house.DIRECCION} />
                  <CardItem title="Barrio - Vereda" value={house.barver} />
                  <CardItem
                    title="Ciudad - dep"
                    value={('' + house.Muni, ' - ', house.Dept)}
                  />
                </View>
              </TouchableOpacity>
            </CardView>
          );
        })}
      </View>
    );
  }
  function renderPerson(items: any) {
    return (
      <View style={styles.container}>
        {items.map((house: any, i: number) => {
          return (
            <CardView
              key={i}
              cardElevation={8}
              cardMaxElevation={10}
              cornerRadius={6}
              style={styles.cardView1}>
              <TouchableOpacity onPress={() => goToHouse(house)}>
                <View style={{flex: 1, padding: 20}}>
                  <CardItem
                    title="Nombre"
                    value={`${house.PRIMER_NOMBRE} ${house.SEGUNDO_NOMBRE} ${house.PRIMER_APELLIDO} ${house.SEGUNDO_APELLIDO}`}
                  />
                  <CardItem title="Dirección" value={house.DIRECCION} />
                  <CardItem
                    title="Barrio - Vereda"
                    value={house.BARRIO_VEREDA}
                  />
                  <CardItem
                    title="Zona de cuidado"
                    value={house.ZONA_CUIDADO}
                  />
                </View>
              </TouchableOpacity>
            </CardView>
          );
        })}
      </View>
    );
  }
  function createNew() {
    props.clearFUBUBIVIV();
    navigation.navigate('ManageHousingScreen');
  }

  function _cerrarSesion() {  
    AsyncStorage.clear();
    navigation.navigate('Iniciar Sesión');
  }
  async function goToHouse(value: any) {
    let vi = await filterFUBUBIVIV(value.ID, true);
    await props.setFUBUBIVIV(vi);
    navigation.navigate('ManageHousingScreen');
  }
};
const mapDispatchToProps = {
  setFUBUBIVIV,
  clearFUBUBIVIV,
};

const CardItem = (data: any) => {
  return (
    <Text style={{fontSize: 17, color: theme.colors.gray}}>
      <Text style={{fontWeight: 'bold'}}>{data.title}:</Text> {data.value}
    </Text>
  );
};



const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    marginLeft: 20,
    marginTop: 5,
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  spacer: {
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  searchbar: {
    marginLeft: 20,
    marginRight: 20,
  },
  cardView1: {
    margin: 15,
    backgroundColor: '#ffffff',
  },
  textTouchable: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.gray,
  },
  title: {
    margin: 20,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  textred: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.accent,
  },
  viewCardItem: {
    height: 1,
    backgroundColor: theme.colors.light,
    marginVertical: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 80,
    width: 80,
    resizeMode: 'stretch',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: '42%',
    opacity: 0.7,
  },
  noResultsText: {
    resizeMode: 'stretch',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: '38%',
    fontSize: 20,
  },
});

export default connect(null, mapDispatchToProps)(HomeScreen);
