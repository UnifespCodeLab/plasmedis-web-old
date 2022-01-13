import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {Stack, Box, Text, Flex} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';
import {FiTrash} from 'react-icons/fi';
import {Context as AuthContext} from '../../stores/Auth';

const Comentario = ({item} = {}) => {
  const {user} = useContext(AuthContext);

  const deleteComment = (commentId) => {
    console.log(commentId);
  };

  debugger;
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
          {user.id === item.author.id ? (
            <FiTrash size={15} onClick={() => deleteComment()} />
          ) : (
            <></>
          )}
        </Stack>

        <Text fontSize="sm" color="black" align="justify">
          {item.body}
        </Text>
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
    post: PropTypes.string,
    dateTime: PropTypes.object.isRequired, // TODO: invoke moment object type
    body: PropTypes.string,
  }),
};

export default Comentario;
