import { Servidor } from '../../entities/Servidor';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateServidorData = Omit<Servidor, 'id' | 'lotacoes' | 'dataProximaProgressao' | 'getDataProximaProgressaoFormatada' | 'createdAt' | 'updatedAt'>
type UpdateServidorData = Omit<Servidor, 'lotacoes' | 'dataProximaProgressao' | 'getDataProximaProgressaoFormatada' | 'createdAt' | 'updatedAt'>;
type ListServidorData = {
  cpf?: string;
  nome?: string;
  anoProximaProgressao?: number;
  tipoVinculo: string;
}

type PaginateServidorData = IPaginator & {
  cpf?: string;
  nome?: string;
  anoProximaProgressao?: number;
  tipoVinculo: string;
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
  findByIdWithLotacoes(id: string): Promise<Servidor>;
}

export {
  IServidoresRepository,
  CreateServidorData,
  UpdateServidorData,
  ListServidorData,
  PaginateServidorData,
};
