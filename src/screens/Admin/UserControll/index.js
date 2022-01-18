import React, {useContext} from 'react';
import {Box, Stack} from '@chakra-ui/react';
import * as S from './styles';
import {getAll} from '../../../domain/usuarios';
import {Context as AuthContext} from '../../../components/stores/Auth';

const UserControll = () => {
  const {user, token} = useContext(AuthContext);
  const getAllUsersFromApi = async () => {
    debugger;
    const users = await getAll(token);
    console.log(users);
  };

  getAllUsersFromApi();

  return (
    <S.Wrapper px={{base: 0, lg: 4}}>
      <S.Text color="#2f7384" fontSize="2xl" fontWeight={600} marginBottom={4}>
        Controle de usuários
      </S.Text>
      <Box
        borderRadius={10}
        bg={{base: 'white', lg: 'white'}}
        color={{base: 'white', lg: 'white'}}
        boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25)">
        <Stack
          mx={12}
          my={10}
          spacing={4}
          align="flex-start"
          justify="center"
          direction="column"
        />
      </Box>
    </S.Wrapper>
  );
};

export default UserControll;
