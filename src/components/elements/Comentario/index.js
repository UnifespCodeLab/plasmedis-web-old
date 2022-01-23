import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Anchorme} from 'react-anchorme';
import {Stack, Box, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';
import {FiTrash} from 'react-icons/fi';
import {Context as AuthContext} from '../../stores/Auth';
import {TextAnchor} from './styles.js';

const Comentario = ({item} = {}) => {
  const {user} = useContext(AuthContext);

  const checkIfIsAbleToDelete = () => {
    if (
      user.id === item.author.id ||
      user.userType === 1 ||
      user.userType === 2
    ) {
      return true;
    }

    return false;
  };

  const deleteComment = (commentId) => {
    console.log('Teste', commentId);
  };

  return (
    <Flex flexDirection="row" align="flex-start">
      <Box mr={{base: 2, lg: 3}}>
        <Avatar name={item.author?.name} src={item.author?.avatar} />
      </Box>
      <Box p={{base: 3, lg: 3}} background="#ddd" borderRadius="10px">
        <Stack direction="row" justifyContent="space-between">
          <Text mb={4} fontWeight="bold" fontSize="xs" color="black">
            {item.author?.name}
            <Text fontSize="xs" color="gray">
              {item.dateTime.fromNow()}
            </Text>
          </Text>
          {checkIfIsAbleToDelete() ? (
            <FiTrash size={15} onClick={() => deleteComment(item.id)} />
          ) : (
            <></>
          )}
        </Stack>

        <TextAnchor size="sm" color="black" align="justify">
          <Anchorme target="_blank" rel="noreferrer noopener">
            {item.description}
          </Anchorme>
        </TextAnchor>
      </Box>
    </Flex>
  );
};

Comentario.displayName = 'Comentario';
Comentario.defaultProps = {
  item: {},
};
Comentario.propTypes = {
  item: PropTypes.shape({
    author: {
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    },
    id: PropTypes.number,
    post: PropTypes.string,
    dateTime: PropTypes.object.isRequired, // TODO: invoke moment object type
    body: PropTypes.string,
  }),
};

export default Comentario;
