import axios from 'axios';
import { Computador } from './interfaces';

const API_URL = 'http://localhost:3001/computadores';

export const getComputadores = (): Promise<Computador[]> => axios.get(API_URL).then(res => res.data);

export const getComputador = (id: string): Promise<Computador> => axios.get(`${API_URL}/${id}`).then(res => res.data);

export const createComputador = (data: any) : Promise<Computador> => axios.post(API_URL, data).then(res => res.data);

export const updateComputador = (id: string, data: any) => axios.patch(`${API_URL}/${id}`, data).then(res => res.data);

export const deleteComputador = (id: string) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
