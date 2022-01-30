import {isEmpty, isNil} from 'lodash';
import api from '../../services/api';

export default async function getById(token) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  try {
    const response = await api.get(`users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert('Erro ao encontar informações');
    return null;
  }
}
