import React, {useContext, useState, useEffect} from 'react';
import {Box, Table, Tr, Th, Td, Tbody, Thead, Select} from '@chakra-ui/react';
import {useHistory} from 'react-router-dom';
import * as S from './styles';
import {getAll, inactivateById, activateById} from '../../../domain/usuarios';
import {Context as AuthContext} from '../../../components/stores/Auth';

const UserControl = () => {
  const {user, token} = useContext(AuthContext);
  const history = useHistory();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsersFromApi = async () => {
      debugger;
      const response = await getAll(token);
      setUsers(response.users);
    };

    getAllUsersFromApi();
  }, []);

  useEffect(() => {
    const canEditUsers = [1, 2];

    if (!canEditUsers.includes(user.userType)) {
      history.push('/');
    }
  }, []);

  const updateUserStatus = async (target, userId) => {
    debugger;
    switch (target.value) {
      case 'ativar':
        await activateById(token, userId);
        break;

      case 'inativar':
        await inactivateById(token, userId);
        break;

      default:
        break;
    }
    // await inactivateById(token, target);
  };

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
        <Table variant="striped" color="black" colorScheme="blackAlpha">
          <Thead>
            <Tr bg="primary.600">
              <Th color="white">ID</Th>
              <Th color="white">Nome</Th>
              <Th color="white">Email</Th>
              <Th color="white">Privilégio</Th>
              <Th color="white">Situação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.map((currentUser) => (
                <Tr key={currentUser.id}>
                  <Td>{currentUser.id}</Td>
                  <Td>{currentUser.user_name}</Td>
                  <Td>{currentUser.email}</Td>
                  <Td>{currentUser.privilegio}</Td>
                  <Td>
                    <Select
                      onChange={(e) =>
                        updateUserStatus(e.target, currentUser.id)
                      }
                      size="sm">
                      <option
                        selected={!currentUser.is_active}
                        value="inativar">
                        Inativo
                      </option>
                      <option selected={currentUser.is_active} value="ativar">
                        Ativo
                      </option>
                    </Select>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </S.Wrapper>
  );
};

export default UserControll;
