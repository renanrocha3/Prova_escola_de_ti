import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { getComputadores, deleteComputador } from '../api';
import { Link } from 'react-router-dom';
import { Computador } from '../interfaces';

const ComputerList: React.FC = () => {
  const [computadores, setComputadores] = useState<Computador[]>([]);

  useEffect(() => {
    getComputadores().then(data => setComputadores(data));
  }, []);

  const handleDelete = (id: string) => {
    deleteComputador(id).then(() => {
      setComputadores(computadores.filter(computador => computador._id !== id));
    });
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={4}>Lista de Computadores</Heading>
      <Button colorScheme="teal" mb={4} as={Link} to="/create">
        Criar Computador
      </Button>
      <List spacing={3}>
        {computadores.map(computador => (
          <ListItem key={computador._id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <Text fontWeight="bold">{computador.nome}</Text>
            <Text color="gray.600">Cor: {computador.cor}</Text>
            <Text color="gray.600">Data de Fabricação: {computador.dataFabricacao}</Text>
            <Text color="gray.600">Periféricos: {computador.perifericos.join(', ')}</Text>
            <Button mt={2} colorScheme="blue" as={Link} to={`/edit/${computador._id}`}>
              Editar
            </Button>
            <Button mt={2} ml={2} colorScheme="red" onClick={() => handleDelete(computador._id)}>
              Excluir
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ComputerList;
