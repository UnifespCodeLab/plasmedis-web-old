import {Text} from '@chakra-ui/layout';
import {FiTrash} from 'react-icons/fi';
import styled from 'styled-components';

export const TextAnchor = styled(Text)`
  a {
    background: var(--chakra-colors-light-200) !important;
  }
  white-space: pre-wrap;
  word-break: break-word;
`;

export const FiTrashIcon = styled(FiTrash)`
  cursor: pointer;
`;

export default {
  TextAnchor,
};
