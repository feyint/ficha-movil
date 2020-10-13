import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BMultiSelect, BPicker} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {ConditionPersonService} from '../../../../services';

import {
  QuestionConditionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
} from '../../../../state/ConditionPerson/actions';
import {ConditionPersonQuestion} from '../state/types';
import {SelectSchema} from '../../../../core/utils/types';

const questionscodes = [
  QuestionConditionPersonCodes.EstadoCivil,
  QuestionConditionPersonCodes.GrupoEtnico,
  QuestionConditionPersonCodes.Casta,
  QuestionConditionPersonCodes.LenguaMaterna,
  QuestionConditionPersonCodes.SegundaLenguaMaterna,
  QuestionConditionPersonCodes.DominioLenguaMaterna,
  QuestionConditionPersonCodes.CapacidadDiversa,
  QuestionConditionPersonCodes.NivelEstudio,
  QuestionConditionPersonCodes.TipoTrabajo,
  QuestionConditionPersonCodes.PoblacionPensionada,
  QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
  QuestionConditionPersonCodes.Religion,
  QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
];

const schemaForm = yup.object().shape({
  ParentezcoGrupoFamiliar: yup.string().notRequired(), //cambiar a required por que no hay donde guardar
  EstadoCivil: yup.number().required(),
  GrupoEtnico: yup.number().required(),
  Casta: yup.array().notRequired(),
  LenguaMaterna: yup.number().required(),
  DominioLenguaMaterna: yup.number().notRequired(),
  SegundaLengua: yup.number().notRequired(),
  DominioSegundaLengua: yup.number().notRequired(),
  CapacidadDiversa: yup.array().notRequired(),
  NivelEstudio: yup.number().required(),
  TipoTrabajo: yup.number().required(),
  PoblacionPensionada: yup.number().required(),
  OtrosSaberesAnsestrales: yup.number().required(),
  Religion: yup.number().required(),
  TipoDeCuidadosCulturalesQueRealiza: yup.number().required(),
});

const _OtherIdentificationDataForm = (props: any) => {
  const syncCatalogService = new ConditionPersonService();

  const [questions, setQuestions] = useState<ConditionPersonQuestion[]>([]);
  const [lenguaMaternaSelect, setlenguaMaternaSelect] = useState<
    {label: any; value: any}[]
  >([]);
  const [segundaLenguaSelect, setsegundaLenguaSelect] = useState<
    {label: any; value: any}[]
  >([]);
  const [segundaLenguaFiltered, setsegundaLenguaFiltered] = useState<
    {label: any; value: any}[]
  >([]);
  const [lenguaMaterna, setLenguaMaterna] = useState('');
  //const [castaPikerEnable, setCastaPikerEnable] = useState(false);
  const navigation = useNavigation();
  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, questions);
  };
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [parentezcoGrupoFamiliar, setParentezcoGrupoFamiliar] = useState('');
  const [
    parentezcoGrupoFamiliarSelect,
    setParentezcoGrupoFamiliarSelect,
  ] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  });

  useEffect(() => {
    fetchQuestions();
  }, []);
  async function fetchQuestions() {
    let result = await props.getQuestionWithOptions(questionscodes);
    let lenguas = syncCatalogService.getItemsForQuestionSelect(
      QuestionConditionPersonCodes.LenguaMaterna,
      result,
    );
    let segundalengua = syncCatalogService.getItemsForQuestionSelect(
      QuestionConditionPersonCodes.SegundaLenguaMaterna,
      result,
    );
    setQuestions(result);
    setlenguaMaternaSelect(lenguas.children);
    setsegundaLenguaSelect(segundalengua.children);
  }
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
  }
  const onChangeLengua = (value: string) => {
    setLenguaMaterna(value);
    let item = lenguaMaternaSelect.find((i) => i.value === value);
    console.error('item', item);
    let segundalengua: any = [];
    segundaLenguaSelect.forEach((lengua) => {
      if (lengua.label != item.label) {
        segundalengua.push(lengua);
      }
    });
    setsegundaLenguaFiltered(segundalengua);
  };
  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, questions);
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
    console.log('questions: ', questions);
    return syncCatalogService.getItemsForQuestionMultiSelect(code, questions);
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
            <BPicker
              label="Parentezco en el grupo familiar"
              prompt="Selecione una opcion"
              onBlur={onBlur}
              error={errors.ParentezcoGrupoFamiliar}
              onChange={(value: any) => {
                onChange(value);
                setParentezcoGrupoFamiliar(value);
              }}
              selectedValue={parentezcoGrupoFamiliar}
              items={parentezcoGrupoFamiliarSelect.children}
            />
          )}
          name="ParentezcoGrupoFamiliar"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.EstadoCivil)}
              onBlur={onBlur}
              error={errors.EstadoCivil}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.EstadoCivil,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.EstadoCivil,
                  'EstadoCivil',
                );
              }}
              //value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.EstadoCivil,
                ).children
              }
            />
          )}
          name="EstadoCivil"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.GrupoEtnico)}
              onBlur={onBlur}
              error={errors.GrupoEtnico}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.GrupoEtnico,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.GrupoEtnico,
                  'GrupoEtnico',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.GrupoEtnico,
                ).children
              }
            />
          )}
          name="GrupoEtnico"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.Casta)}
              onBlur={onBlur}
              error={errors.Casta}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.Casta,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.Casta,
                  'Casta',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionConditionPersonCodes.Casta)
                  .children
              }
            />
          )}
          name="Casta"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Lengua materna'}
              onBlur={onBlur}
              error={errors.LenguaMaterna}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  onChangeLengua(value);
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.LenguaMaterna,
                    value,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LenguaMaterna,
                  'LenguaMaterna',
                );
              }}
              selectedValue={lenguaMaterna}
              items={lenguaMaternaSelect}
            />
          )}
          name="LenguaMaterna"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Segunda lengua"
              onBlur={onBlur}
              error={errors.SegundaLengua}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.SegundaLenguaMaterna,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.SegundaLenguaMaterna,
                  'SegundaLengua',
                );
              }}
              selectedValue={value}
              items={segundaLenguaFiltered}
            />
          )}
          name="SegundaLengua"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.DominioLenguaMaterna,
              )}
              onBlur={onBlur}
              error={errors.DominioLenguaMaterna}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.DominioLenguaMaterna,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.DominioLenguaMaterna,
                  'DominioLenguaMaterna',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.DominioLenguaMaterna,
                ).children
              }
            />
          )}
          name="DominioLenguaMaterna"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Dominio segunda lengua"
              onBlur={onBlur}
              error={errors.DominioLenguaMaterna}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.DominioLenguaMaterna,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.DominioLenguaMaterna,
                  'DominioLenguaMaterna',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.DominioLenguaMaterna,
                ).children
              }
            />
          )}
          name="DominioLenguaMaterna"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionConditionPersonCodes.CapacidadDiversa,
              )}
              onBlur={onBlur}
              error={errors.CapacidadDiversa}
              onChange={(values: any) => {
                onChange(values);
                console.log('save', values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.CapacidadDiversa,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.CapacidadDiversa,
                  'CapacidadDiversa',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionConditionPersonCodes.CapacidadDiversa,
              )}
            />
          )}
          name="CapacidadDiversa"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.NivelEstudio,
              )}
              onBlur={onBlur}
              error={errors.NivelEstudio}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.NivelEstudio,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.NivelEstudio,
                  'NivelEstudio',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.NivelEstudio,
                ).children
              }
            />
          )}
          name="NivelEstudio"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.TipoTrabajo)}
              onBlur={onBlur}
              error={errors.TipoTrabajo}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.TipoTrabajo,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.TipoTrabajo,
                  'TipoTrabajo',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.TipoTrabajo,
                ).children
              }
            />
          )}
          name="TipoTrabajo"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.PoblacionPensionada,
              )}
              onBlur={onBlur}
              error={errors.PoblacionPensionada}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.PoblacionPensionada,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.PoblacionPensionada,
                  'PoblacionPensionada',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.PoblacionPensionada,
                ).children
              }
            />
          )}
          name="PoblacionPensionada"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
              )}
              onBlur={onBlur}
              error={errors.OtrosSaberesAnsestrales}
              onChange={(values: any) => {
                onChange(values);
                console.log('save', values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
                  'OtrosSaberesAnsestrales',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
              )}
            />
          )}
          name="OtrosSaberesAnsestrales"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.Religion)}
              onBlur={onBlur}
              error={errors.Religion}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.Religion,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.Religion,
                  'Religion',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionConditionPersonCodes.Religion)
                  .children
              }
            />
          )}
          name="Religion"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
              )}
              onBlur={onBlur}
              error={errors.TipoDeCuidadosCulturalesQueRealiza}
              onChange={(values: any) => {
                onChange(values);
                console.log('save', values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
                  'TipoDeCuidadosCulturalesQueRealiza',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
              )}
            />
          )}
          name="TipoDeCuidadosCulturalesQueRealiza"
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
};
const mapStateToProps = (session: any) => {
  return {
    user: session.session.user,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_OtherIdentificationDataForm);
