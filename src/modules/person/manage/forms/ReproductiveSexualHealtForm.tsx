import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BButton} from '../../../../core/components';
import BNumberInput from '../../../../core/components/BNumberInput';
import {FNCPERSON} from '../../../../state/person/types';
import {saveFNCPERSON, updateFNCPERSON} from '../../../../state/person/actions';
const schemaForm = yup.object().shape({
  agemenstruation: yup.number().integer().min(1),
  pregnancynumber: yup.number().integer(),
  parideznumber: yup.number().integer(),
  abortionnumber: yup.number().integer(),
  cesariannumber: yup.number().integer(),
  bornnumber: yup.number().integer(),
  bornnumberdeath: yup.number().integer(),
});
const _ReproductiveSexualHealtForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [agemenstruation, setagemenstruation] = useState<number>();
  const [pregnancynumber, setpregnancynumber] = useState<number>(0);
  const [parideznumber, setparideznumber] = useState<number>(0);
  const [abortionnumber, setabortionnumber] = useState<number>(0);
  const [cesariannumber, setcesariannumber] = useState<number>(0);
  const [bornnumber, setbornnumber] = useState<number>(0);
  const [bornnumberdeath, setbornnumberdeath] = useState<number>(0);
  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    if (props.FNCPERSON.ID) {
    }
  };
  const onSubmit = async (data: any) => {
    validatepregnancynumber()
      ? null
      : Alert.alert(
          'Acción no permitida',
          'La suma de los campos Número paridez, Número abortos, Número cesárea debe ser igual al Número de gravidez',
        );
    valideateBornPregnancy()
      ? navigation.goBack()
      : Alert.alert(
          'Acción no permitida',
          'La suma de los campos Número de nacidos vivos y  Número de nacidos muertos debe ser mayor o igual al Número de gravidez',
        );
    // let person: FNCPERSON = props.FNCPERSON;
    // let item: any = {};
    // item.TEL_CELULAR = data.phonenumber;
    // item.TEL_ALTERNO = data.phonenumber2;
    // item.CORREO_ELECTRONICO = data.email;
    // let inserted = await props.updateFNCPERSON(item);
    // navigation.goBack();
  };
  const validateField = (value: any) => {
    if (value > pregnancynumber) {
      return false;
    } else {
      return true;
    }
  };
  const validatepregnancynumber = () => {
    let isValid = false;
    //console.error(typeof pregnancynumber);
    if (pregnancynumber > 0) {
      let sum = parideznumber + abortionnumber + cesariannumber;
      if (sum == pregnancynumber) {
        isValid = true;
      }
    }
    return isValid;
  };
  const valideateBornPregnancy = () => {
    let isValid = false;
    if (pregnancynumber > 0) {
      let suma = bornnumber + bornnumberdeath;
      //console.warn(`${suma}`);
      if (suma >= pregnancynumber) {
        isValid = true;
      }
    }
    return isValid;
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              label="Edad de la primera menstruación"
              error={errors.agemenstruation}
              onChange={(value) => {
                onChange(value);
                setagemenstruation(parseInt(value, 10));
              }}
              value={agemenstruation ? '' + agemenstruation : ''}
            />
          )}
          name="agemenstruation"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              disabled={agemenstruation && agemenstruation > 0 ? false : true}
              label="Número de gravidez"
              error={errors.pregnancynumber}
              onChange={(value) => {
                onChange(value);
                if (!isNaN(value)) {
                  setpregnancynumber(parseInt(value, 10));
                }
              }}
              value={!isNaN(pregnancynumber) ? '' + pregnancynumber : ''}
            />
          )}
          name="pregnancynumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              label="Número paridez"
              disabled={!pregnancynumber || pregnancynumber == 0}
              error={errors.parideznumber}
              onChange={(value) => {
                onChange(value);
                //if (validatepregnancynumber(parseInt(value, 10))) {
                validateField(parseInt(value, 10))
                  ? setparideznumber(parseInt(value, 10))
                  : Alert.alert(
                      'Valor mayor al de gravidez',
                      'Ingrese un valor correcto',
                    );

                //}
              }}
              value={parideznumber ? ' ' + parideznumber : '0'}
            />
          )}
          name="parideznumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              disabled={!pregnancynumber || pregnancynumber == 0}
              label="Número de abortos"
              error={errors.abortionnumber}
              onChange={(value) => {
                onChange(value);
                //if (validatepregnancynumber(parseInt(value, 10))) {
                validateField(parseInt(value, 10))
                  ? setabortionnumber(parseInt(value, 10))
                  : Alert.alert(
                      'Valor mayor al de gravidez',
                      'Ingrese un valor correcto',
                    );

                //}
              }}
              value={abortionnumber ? ' ' + abortionnumber : '0'}
            />
          )}
          name="abortionnumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              disabled={!pregnancynumber || pregnancynumber == 0}
              label="Número cesárea"
              error={errors.cesariannumber}
              onChange={(value) => {
                onChange(value);
                //if (validatepregnancynumber(parseInt(value, 10))) {
                validateField(parseInt(value, 10))
                  ? setcesariannumber(parseInt(value, 10))
                  : Alert.alert(
                      'Valor mayor al de gravidez',
                      'Ingrese un valor correcto',
                    );

                //}
              }}
              value={cesariannumber ? ' ' + cesariannumber : '0'}
            />
          )}
          name="cesariannumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              disabled={!pregnancynumber || pregnancynumber == 0}
              label="Número de nacidos vivos"
              error={errors.bornnumber}
              onChange={(value) => {
                onChange(value);
                validateField(parseInt(value, 10))
                  ? setbornnumber(parseInt(value, 10))
                  : Alert.alert(
                      'Valor mayor al de gravidez',
                      'Ingrese un valor correcto',
                    );
              }}
              value={bornnumber ? ' ' + bornnumber : '0'}
            />
          )}
          name="bornnumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              disabled={!pregnancynumber || pregnancynumber == 0}
              label="Número de nacidos muertos"
              error={errors.bornnumberdeath}
              onChange={(value) => {
                onChange(value);
                validateField(parseInt(value, 10))
                  ? setbornnumberdeath(parseInt(value, 10))
                  : Alert.alert(
                      'Valor mayor al de gravidez',
                      'Ingrese un valor correcto',
                    );
              }}
              value={bornnumberdeath ? ' ' + bornnumberdeath : '0'}
            />
          )}
          name="bornnumberdeath"
        />
        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});
const mapStateToProps = (person: any) => {
  return {
    FNCPERSON: person.person.FNCPERSON,
  };
};
const mapDispatchToProps = {
  updateFNCPERSON,
  saveFNCPERSON,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ReproductiveSexualHealtForm);
