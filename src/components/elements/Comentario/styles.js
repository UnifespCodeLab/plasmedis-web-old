import {Text} from '@chakra-ui/layout';
import styled from 'styled-components';

export const TextAnchor = styled(Text)`
  a {
    background: var(--chakra-colors-light-200); !important;
  }
  white-space: pre-wrap;
  word-break: break-word;
  
`;

export default {
  TextAnchor,
};
