// src/theme.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Configuração do tema
const config: ThemeConfig = {
  initialColorMode: 'light', // Modo claro inicial
  useSystemColorMode: false, // Não usar o modo de cor do sistema
};

// Definição dos temas claro e escuro
const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f5f5f5',
      100: '#e2e2e2',
      200: '#c0c0c0',
      300: '#a0a0a0',
      400: '#707070',
      500: '#404040',
      600: '#303030',
      700: '#202020',
      800: '#101010',
      900: '#000000',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.700',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
          color: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.100' : 'brand.50',
          },
        }),
      },
    },
    FormControl: {
      baseStyle: {
        marginBottom: '16px',
      },
    },
    Container: {
      baseStyle: {
        padding: '16px',
      },
    },
  },
});

export default theme;
