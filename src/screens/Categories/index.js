import React, {useContext, useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';

import {Icon} from '@mdi/react';
import {Box} from '@chakra-ui/layout';
import {
  IconButton,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import {mdiDeleteOutline} from '@mdi/js';
import * as Categorias from '../../domain/categorias';
import {Context as AuthContext} from '../../components/stores/Auth';

function Categories() {
  const {user, token} = useContext(AuthContext);
  const [categories, setCategories] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const canEditCategoriesTypeIds = [1, 2];

    if (!canEditCategoriesTypeIds.includes(user.userType)) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await Categorias.getAll(token);
      setCategories(result);
    };

    fetchCategories();
  }, [token]);

  return (
    <>
      <Box px={{base: 0, lg: 6}}>
        <Text color="#2f7384" fontSize="2xl" fontWeight={600} marginBottom={4}>
          Gerenciar Categorias
        </Text>

        <Box
          bg={{base: 'white', lg: 'white'}}
          color={{base: 'white', lg: 'white'}}
          boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25)">
          <Table variant="striped" color="black" colorScheme="blackAlpha">
            <Thead>
              <Tr bg="primary.600">
                <Th color="white">Nome</Th>
                <Th color="white">Número de Postagens</Th>
                <Th color="white">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories &&
                categories.map((category) => (
                  <Tr key={category.id}>
                    <Td>{category.name}</Td>
                    <Td color="primary.600">
                      <Link
                        to={`/?categoria=${category.name}`}
                        title="Filtrar posts">
                        {category.posts}
                      </Link>
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Deletar categoria"
                        title="Deletar categoria"
                        cursor="pointer"
                        size={1}
                        icon={<Icon size={1} path={mdiDeleteOutline} />}
                        variant="ghost"
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default Categories;
