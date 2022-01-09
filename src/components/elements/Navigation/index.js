import React from 'react';

import {
  mdiHome,
  mdiFormatListChecks,
  mdiAccountBoxMultipleOutline,
  mdiLogout,
  mdiAccountPlus,
} from '@mdi/js';
import {Box} from '@chakra-ui/layout';
import {useLocation} from 'react-router-dom';
import {useBreakpointValue} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {Menu, Divider} from './styles';
import SidebarItem from '../SidebarItem';

const essentialsSection = [
  {
    title: 'Início',
    icon: mdiHome,
    to: '/',
    user_type_alowed: [1, 2, 3],
  },
];

const informationSection = [
  {
    title: 'Complemento de Dados',
    icon: mdiAccountBoxMultipleOutline,
    to: '/complemento-de-dados',
    user_type_alowed: [1, 2, 3],
  },
  {
    title: 'Formulário Socioeconômico',
    icon: mdiFormatListChecks,
    to: '/form',
    user_type_alowed: [1, 2, 3],
  },
  {
    title: 'Cadastrar Novo Usuário',
    icon: mdiAccountPlus,
    to: '/register',
    user_type_alowed: [1, 2],
  },
];

const logoutSection = [
  {
    title: 'Sair',
    icon: mdiLogout,
    to: '/logout',
    user_type_alowed: [1, 2, 3],
  },
];

const Navigation = ({user}) => {
  const location = useLocation();
  const sidebarSections = useBreakpointValue(
    {
      base: [
        essentialsSection,
        // categoriesSection,
        informationSection,
        logoutSection,
      ],
      lg: [
        essentialsSection,
        // categoriesSection,
        informationSection,
        logoutSection,
      ],
    },
    'base',
  );

  const sidebarList = sidebarSections.map((sectionItems, index) => {
    return (
      <Box
        width="100%"
        key={index}
        onClick={() => {
          window.scrollTo(0, 0);
        }}>
        {sectionItems.map((item) => {
          if (item.user_type_alowed.includes(user.userType)) {
            return (
              <SidebarItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                to={item.to}
                selected={location.pathname === item.to}
              />
            );
          }
          return <></>;
        })}
        {index < sidebarSections.length - 1 && <Divider />}
      </Box>
    );
  });

  return <Menu>{sidebarList}</Menu>;
};

Navigation.displayName = 'Navigation';
Navigation.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Navigation;
