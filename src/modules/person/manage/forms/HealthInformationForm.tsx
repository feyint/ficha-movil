import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BButton,
  BDatePickerModal,
  BMultiSelect,
  BPicker,
  BRadioButton,
  BTextInput,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {SexAndRepHealthPersonService} from '../../../../services';

import {
  logicOption,
  timeOption,
  QuestionSexAndRepHealthPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
  saveFNCSALREPPropiety,
} from '../../../../state/SexAndRepHealthPerson/actions';
import {SexAndRepHealthPersonQuestion} from '../state/types';

const questions = [
  QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
];

const schemaForm = yup.object().shape({
  //FechaUltimaMenstruacion: yup.date().max(new Date()).required(),
  //EdadGestacional: yup.string().required(),
  //FechaProbableParto: yup.date().required(),
  //PracticasCulturalesDuranteLaGestacion: yup.array().required(),
});

const _HealthInformationForm = (props: any) => {
  const syncCatalogService = new SexAndRepHealthPersonService();

  const [state, setState] = useState({
    questions: [] as SexAndRepHealthPersonQuestion[],
  });

  //const [pikerEnable, setPikerEnable] = useState(false);

  const navigation = useNavigation();

  const getItemsForQuestionSelect = (code: string) => {
    return {children: []}; //syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    let result = await props.getQuestionWithOptions(questions);
    if (result) {
      setState({
        ...state,
        questions: result,
      });
    }
    getAnswersFNCSALREP();
  }
  async function getAnswersFNCSALREP() {
    setValue('FechaTerminacionDeLaGestacion', props.FNCSALREP.PARTO_ULTIMO);
  }

  async function getAnswers(type: number, code: string, prop: string) {
    //let question = await props.getQuestionAnswer(type, code);
    setValue(prop, []);
  }

  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, state.questions);
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
    return {}; /*syncCatalogService.getItemsForQuestionMultiSelect(
      code,
      state.questions,
    );*/
  };

  function onSubmit(data: any) {
    navigation.goBack();
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label={'Peso en Kg'}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="PesoEnKg"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label={'Talla en M'}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="TallaEnM"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label={'IMC'}
              keyboardType="number-pad"
              onBlur={onBlur}
              disabled={true}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="IMC"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Factores de riesgo'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              selectedValue={value}
              items={[
                {label: 'Seleccione', value: '0'},
                {label: 'Tiene riesgo', value: '1'},
                {label: 'Sin riesgo', value: '2'},
                {label: 'No aplica', value: '3'},
              ]}
            />
          )}
          name="FactoresDeRiesgo"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label={'Tensión arterial sistólica'}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="TensionArterialSistolica"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label={'Tensión arterial diastólica'}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="TensionArterialDiastólica"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Interpretación tensión arterial'}
              enabled={false}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              selectedValue={value}
              items={[{label: 'Normal', value: '0'}]}
            />
          )}
          name="InterpretacionTensionArterial"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Salud visual'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              selectedValue={value}
              items={[
                {label: 'Seleccione', value: '0'},
                {label: 'SI presenta problemas vicuales', value: '1'},
                {label: 'NO presenta problemas legales', value: '2'},
                {label: 'NO APLICA', value: '3'},
              ]}
            />
          )}
          name="SaludVisual"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Salud auditiva y comunicativa'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              selectedValue={value}
              items={[
                {label: 'Seleccione', value: '0'},
                {label: 'Tiene problemas salud auditiva', value: '1'},
                {label: 'Tiene problemas salud comunicativa', value: '2'},
                {
                  label: 'Tiene problemas salud auditiva y comunicativa',
                  value: '3',
                },
                {
                  label: 'No tiene problemas salud auditiva y comunicativa',
                  value: '4',
                },
              ]}
            />
          )}
          name="SaludAuditivaComunicativa"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={'Salud bucal'}
              onBlur={onBlur}
              onChange={(values: any) => {
                onChange(values);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
                  'PracticasCulturalesDuranteLaGestacion',
                );
              }}
              selectedItems={value}
              items={{
                name: 'Salud bucal',
                id: 1,
                children: [
                  {name: 'Caries', id: 1, item: null},
                  {name: 'Placa bacteriana', id: 2, item: null},
                  {name: 'Cálculos', id: 3, item: null},
                  {name: 'Gingivitis', id: 4, item: null},
                  {name: 'Fluorosis', id: 5, item: null},
                  {name: 'Otras', id: 6, item: null},
                  {name: 'Endéntulo total', id: 7, item: null},
                  {name: 'Sano', id: 8, item: null},
                ],
              }}
            />
          )}
          name="SaludBucal"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="¿Utiliza prótesis?"
              value={value}
              items={logicOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  //props.saveFNBNUCVIVPropiety('HUMO_CASA', JSON.parse(value));
                }
              }}
            />
          )}
          name="UtilizaProtesis"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Tiempo con la prótesis"
              value={value}
              items={timeOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  //props.saveFNBNUCVIVPropiety('HUMO_CASA', JSON.parse(value));
                }
              }}
            />
          )}
          name="TiempoPrótesis"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Riesgo de padecer Diabetes'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              selectedValue={value}
            />
          )}
          name="RiesgoPadecerDiabetes"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Sintomático respiratorio'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                ).children
              }
            />
          )}
          name="SintomaticoRespiratorio"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Sintomático de malaria'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                ).children
              }
            />
          )}
          name="SintomaticoMalaria"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={'Desparasitación interna en el último semestre'}
              onBlur={onBlur}
              onChange={(values: any) => {
                onChange(values);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
                  'PracticasCulturalesDuranteLaGestacion',
                );
              }}
              selectedItems={value}
            />
          )}
          name="DesparasitaciónInternaUltimoSemestre"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Desparasitación Externa en el último semestre'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                ).children
              }
            />
          )}
          name="DesparasitacionExternaUltimoSemestre"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BDatePickerModal
              label="Fecha última visita"
              maximumDate={new Date()}
              error={errors.FechaUltimaMenstruacion}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="FechaUltimaMenstruacion"
        />

        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
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
});
const mapDispatchToProps = {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
  saveFNCSALREPPropiety,
};
const mapStateToProps = (sarhealthperson: any) => {
  return {
    FNCSALREP: sarhealthperson.sarhealthperson.FNCSALREP,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HealthInformationForm);
