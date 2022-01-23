import {isEmpty, isNil, isString} from 'lodash';

import api from '../../services/api';

// eslint-disable-next-line func-names
export default async function (token, id) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  if (isNil(id) || (isEmpty(id) && isString(id)))
    throw new Error('Id da postagem não foi informado');

  const response = await api.delete(`/postagens/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);

  return {};
}
