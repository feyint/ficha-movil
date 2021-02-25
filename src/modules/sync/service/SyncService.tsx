import {Alert} from 'react-native';
import {HttpProvider} from '../../../providers';
import { FububivivListSync } from '../models/FububivivListSync';
import {FncGenero} from './../models/fncGenero';
import axios from 'axios';
import ApiService from './../service/ApiService';

const API_REST_URL = 'http://192.168.0.3:9098/api/solicitud/';
const API_REST_URL_C = 'http://9619aab9ea0d.ngrok.io/';
export default class SyncService {

requestH = {
    headers: { 'Content-Type': 'application/json' }
};
  requestHeader = {
    destination: {
      domainName: 'domainNamePrueba',
      serviceName: 'executeJaxb',
      version: '1.0.0',
    },
    transactionId: '1234567890',
    requestDate: '2020-07-22 10:30',
    channel: 'WEB',
    consumer: {
      id: 'WEB-SUIIN-2.0',
      name: 'WebAdmin-SUIIN-2.0',
    },
  };

  headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

}
  //Enviar Numero de datos por Entidad
  async enviarDataCount(data: any) {
    console.log(JSON.stringify(data));
    return axios.post(API_REST_URL_C + "syncro/init",  JSON.stringify(data),
    { headers: { "Content-Type": "application/json; charset=UTF-8" }
      // params: { userID: 1 },
    }).then(response => {
      return response;
    })
    .catch(error => {
        console.log(error.response)
    });
  }
  //Enviar Data is null sqlite
  async enviarData(data: any) {
    const url = API_REST_URL_C + "syncro/todo";
    const formData = new FormData();    
    formData.append('datos', JSON.stringify(data));
    return axios({
      method: 'post',
      url: url,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
          return response;
      })
      .catch(function (response) {
          console.log(response);
      });
  }
  async sendPackageToSincronize(any: FububivivListSync): Promise<any> {
    try {
      let result = await HttpProvider.post(
        'synchronize-war/rest/synchronize/fichafamiliar/execute',
        {request: {requestHeader: this.requestHeader, requestBody: {any}}},
      );
      return result;
    } catch (error) {
      //Alert.alert('Ocurrio un error ', 'error de conexión ' + error);
      return null;
    }
  }
}
