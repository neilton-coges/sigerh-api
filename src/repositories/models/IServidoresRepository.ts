import { Servidor } from '../../entities/Servidor';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateServidorData = Omit<Servidor, 'id' | 'createdAt' | 'updatedAt'>
type UpdateServidorData = Omit<Servidor, 'createdAt' | 'updatedAt'>;
type ListServidorData = {
  cpf?: string;
  nome?: string;
}

type PaginateServidorData = IPaginator & {
  cpf?: string;
  nome?: string;
}

interface IServidoresRepository {
  create(data: CreateServidorData): Promise<Servidor>;
  update(servidor: Servidor): Promise<Servidor>;
  destroy(id: string): Promise<void>;
  list(data: ListServidorData): Promise<Servidor[]>;
  paginate(data: PaginateServidorData): Promise<IPage<Servidor>>;
  findById(id: string): Promise<Servidor>;
  findByCpf(cpf: string): Promise<Servidor>;
  findByEmail(email: string): Promise<Servidor>;
}

export {
  CreateServidorData,
  UpdateServidorData,
  ListServidorData,
  PaginateServidorData,
  IServidoresRepository,
};
