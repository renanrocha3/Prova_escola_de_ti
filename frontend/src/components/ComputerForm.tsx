import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, FormControl, FormLabel, Input, Heading, Box, Stack, Text } from '@chakra-ui/react';
import { createComputador, getComputador, updateComputador } from '../api';

const ComputerForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState<number>(new Date().getFullYear());
  const [perifericoInput, setPerifericoInput] = useState('');
  const [perifericos, setPerifericos] = useState<string[]>([]); // List of peripheral names or IDs

  useEffect(() => {
    if (id) {
      getComputador(id).then(computador => {
        setNome(computador.nome);
        setCor(computador.cor);
        setDataFabricacao(computador.dataFabricacao);
        setPerifericos(computador.perifericos.map((periferico: any) => periferico.nome || periferico));
      });
    }
  }, [id]);

  const handleAddPeriferico = () => {
    if (perifericoInput.trim() && !perifericos.includes(perifericoInput.trim())) {
      setPerifericos([...perifericos, perifericoInput.trim()]);
      setPerifericoInput('');
    }
  };

  const handleRemovePeriferico = (periferico: string) => {
    setPerifericos(perifericos.filter(p => p !== periferico));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nome, cor, dataFabricacao, perifericos };
    if (id) {
      updateComputador(id, data).then(() => navigate('/'));
    } else {
      createComputador(data).then(() => navigate('/'));
    }
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Heading mb={4}>{id ? 'Editar Computador' : 'Criar Computador'}</Heading>
      <Box as="form" onSubmit={handleSubmit} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
        <FormControl mb={4} isRequired>
          <FormLabel>Nome</FormLabel>
          <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Cor</FormLabel>
          <Input type="text" value={cor} onChange={(e) => setCor(e.target.value)} />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Data de Fabricação</FormLabel>
          <Input type="number" value={dataFabricacao} onChange={(e) => setDataFabricacao(Number(e.target.value))} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Adicionar Periférico</FormLabel>
          <Stack spacing={3}>
            <Input
              type="text"
              value={perifericoInput}
              onChange={(e) => setPerifericoInput(e.target.value)}
              placeholder="Digite o nome do periférico"
            />
            <Button colorScheme="teal" onClick={handleAddPeriferico}>
              Adicionar Periférico
            </Button>
            <Box>
              {perifericos.map((periferico, index) => (
                <Box key={index} mb={2} p={2} borderWidth="1px" borderRadius="md" display="flex" justifyContent="space-between" alignItems="center">
                  <Text>{periferico}</Text>
                  <Button colorScheme="red" size="sm" onClick={() => handleRemovePeriferico(periferico)}>
                    Remover
                  </Button>
                </Box>
              ))}
            </Box>
          </Stack>
        </FormControl>
        <Button colorScheme="teal" type="submit">
          {id ? 'Atualizar' : 'Criar'}
        </Button>
      </Box>
    </Container>
  );
};

export default ComputerForm;
