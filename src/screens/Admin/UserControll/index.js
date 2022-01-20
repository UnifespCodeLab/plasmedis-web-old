import React, {useContext, useState, useEffect} from 'react';
import {
  Box,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  IconButton,
} from '@chakra-ui/react';
import {FiTrash} from 'react-icons/fi';
import * as S from './styles';
import {getAll, deleteById} from '../../../domain/usuarios';
import {Context as AuthContext} from '../../../components/stores/Auth';

const UserControll = () => {
  const {token} = useContext(AuthContext);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsersFromApi = async () => {
      debugger;
      const response = await getAll(token);
      setUsers(response.users);
    };

    getAllUsersFromApi();
  }, []);

  const deleteUser = async (id) => {
    await deleteById(token, id);
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
              <Th color="white">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.user_name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.privilegio}</Td>
                  <Td>
                    <IconButton
                      aria-label="Deletar usuário"
                      title="Deletar usuário"
                      cursor="pointer"
                      onClick={() => deleteUser(user.id)}
                      size={1}
                      icon={<FiTrash />}
                      variant="ghost"
                    />
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
