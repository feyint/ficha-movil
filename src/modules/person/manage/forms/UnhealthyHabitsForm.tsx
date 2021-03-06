/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BMultiSelect, BPicker, ButtonAction} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {QuestionPersonCodes} from '../../../../core/utils/PersonTypes';
import {theme} from '../../../../core/style/theme';
import {useFNCCONSAL} from '../../../../hooks/useFNCCONSAL';
import {useFNBINFSAL_FNCCONSAL, useSGCSISPAR} from '../../../../hooks';
import {FNCCONSAL, FNCPERSON} from '../../../../types';
import moment from 'moment';
import { SystemParameterEnum } from '../../../../core/utils/SystemParameters';

const questionscodes = [
  QuestionPersonCodes.Fuma,
  QuestionPersonCodes.ConsumeBebidasAlcoholicas,
  QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas,
  QuestionPersonCodes.EvidenciaViolencia,
];

const schemaForm = yup.object().shape({
  Fuma: yup.number().required(),
  ConsumeBebidasAlcoholicas: yup.number().required(),
  EvidenciaConsumoSustanciasPsicoactivas: yup.number().required(),
  EvidenciaViolencia: yup.array().required(),
});

const _UnhealthyHabitsForm = (props: any) => {
  const {
    getQuestionsOptions,
    getMultiselect,
    getPicker,
    getLabel,
    listFNCCONSAL,
  } = useFNCCONSAL();
  const {saveAnswer, getAnswerquestion} = useFNBINFSAL_FNCCONSAL();
  const {getByCode} = useSGCSISPAR();
  const [enableFuma, setenableFuma] = useState<boolean>(false);
  const [enableBebidas, setenableBebidas] = useState<boolean>(false);
  const [enableEvidencia, setenableEvidencia] = useState<boolean>(false);

  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  useEffect(() => {
    getQuestionsOptions(questionscodes);
  }, []);
  useEffect(() => {
    if (listFNCCONSAL) {
      fetchQuestions();
    }
  }, [listFNCCONSAL]);

  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNBINFSAL;
      let ans = await getAnswerquestion(ID, question.FNCELESAL_ID, type);
      if (ans) {
        if (type == 1) {
          setValue(prop, '' + ans);
        } else {
          setValue(prop, ans);
        }
      }
      return ans;
    }
  }
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
    personid = 0,
  ) {
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      let ID = props.FNBINFSAL.ID;
      if (personid > 0) {
        ID = personid;
      }
      saveAnswer(type, answer, ID, question.FNCELESAL_ID);
    }
  }

  function onSubmit(data: any) {
    SaveAnswers(QuestionPersonCodes.Fuma, data.Fuma);
    SaveAnswers(
      QuestionPersonCodes.ConsumeBebidasAlcoholicas,
      data.ConsumeBebidasAlcoholicas,
    );
    SaveAnswers(
      QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas,
      data.EvidenciaConsumoSustanciasPsicoactivas,
    );
    SaveAnswers(
      QuestionPersonCodes.EvidenciaViolencia,
      data.EvidenciaViolencia,
      2,
    );
    navigation.goBack();
  }

  async function fetchQuestions() {
    const {FECHA_NACIMIENTO} = props.FNCPERSON as FNCPERSON;
    if (FECHA_NACIMIENTO) {
      let birthDate = moment(FECHA_NACIMIENTO).toDate();
      var years = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years');
      var days = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'days');
      let edadMinima = await getByCode(SystemParameterEnum.PRM012);
      if (days <= Number(edadMinima.VALOR)) {
        setenableFuma(false);
        setenableBebidas(false);
        setenableEvidencia(false);
        for (let i = 0; i < listFNCCONSAL.length; i++) {
          const element = listFNCCONSAL[i];
          if (
            element.QUESTIONCODE == QuestionPersonCodes.Fuma &&
            element.NOMBRE.includes('No aplica')
          ) {
            setValue('Fuma', '' + element.ID);
          }
          if (
            element.QUESTIONCODE == QuestionPersonCodes.ConsumeBebidasAlcoholicas &&
            element.NOMBRE.includes('No aplica')
          ) {
            setValue('ConsumeBebidasAlcoholicas', '' + element.ID);
          }
          if (
            element.QUESTIONCODE == QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas &&
            element.NOMBRE.includes('No aplica')
          ) {
            setValue('EvidenciaConsumoSustanciasPsicoactivas', '' + element.ID);
          }
        }
      } else {
        setenableFuma(true);
        setenableBebidas(true);
        setenableEvidencia(true);
        getAnswers(QuestionPersonCodes.Fuma, 'Fuma');
        getAnswers(
          QuestionPersonCodes.ConsumeBebidasAlcoholicas,
          'ConsumeBebidasAlcoholicas',
        );
        getAnswers(
          QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas,
          'EvidenciaConsumoSustanciasPsicoactivas',
        );
      }
    }
    getAnswers(QuestionPersonCodes.EvidenciaViolencia, 'EvidenciaViolencia', 2);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              enabled={enableFuma}
              label={getLabel(QuestionPersonCodes.Fuma)}
              onBlur={onBlur}
              error={errors.Fuma}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.Fuma)}
            />
          )}
          name="Fuma"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              enabled={enableBebidas}
              label={getLabel(QuestionPersonCodes.ConsumeBebidasAlcoholicas)}
              onBlur={onBlur}
              error={errors.ConsumeBebidasAlcoholicas}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.ConsumeBebidasAlcoholicas)}
            />
          )}
          name="ConsumeBebidasAlcoholicas"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              enabled={enableEvidencia}
              label={getLabel(
                QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas,
              )}
              onBlur={onBlur}
              error={errors.EvidenciaConsumoSustanciasPsicoactivas}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(
                QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas,
              )}
            />
          )}
          name="EvidenciaConsumoSustanciasPsicoactivas"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(QuestionPersonCodes.EvidenciaViolencia)}
              onBlur={onBlur}
              error={errors.EvidenciaViolencia}
              onChange={(values: any) => {
                onChange(values);
              }}
              selectedItems={value}
              items={getMultiselect(QuestionPersonCodes.EvidenciaViolencia)}
            />
          )}
          name="EvidenciaViolencia"
        />
        <ButtonAction
          onAccept={handleSubmit(onSubmit)}
          onCancel={() => navigation.goBack()}
        />
      </View>
      <View style={styles.spacer} />
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
  spacer: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  aceptButon: {
    backgroundColor: 'white',
    color: 'white',
    width: '25%',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  cancelButon: {
    //left: 500,
    //position: 'relative',
    //marginTop: -60,
    backgroundColor: theme.colors.primary,
    width: '25%',
    color: 'red',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: theme.colors.primary,
  },
});
const mapStateToProps = (store: any) => {
  return {
    FNBINFSAL: store.person.FNBINFSAL,
    FNCPERSON: store.person.FNCPERSON,
  };
};
export default connect(mapStateToProps, null)(_UnhealthyHabitsForm);
