import {isEmpty, isNil, isString} from 'lodash';
import api from '../../services/api';

// eslint-disable-next-line func-names
export default async function (token, commentId) {
  if (isNil(token) || isEmpty(token))
    throw new Error('Token não foi informado');

  if (isNil(commentId) || (isEmpty(commentId) && isString(commentId)))
    throw new Error('Id do comentário não foi informado');

  const requestData = {
    comentario_id: commentId,
  };

  const response = await api.delete(`/comentarios`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: requestData,
  });

  return response;
}
