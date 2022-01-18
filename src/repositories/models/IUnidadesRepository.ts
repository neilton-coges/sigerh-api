import { Unidade } from '../../entities/Unidade';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateUnidadeData = Pick<Unidade, 'sigla' | 'descricao'> & {
  unidadePaiId?: string
};

type ListUnidadeData = {
  sigla?: string;
  descricao?: string;
}

type PaginateUnidadeData = IPaginator & {
  sigla?: string;
  descricao?: string;
}

interface IUnidadesRepository {
  create(data: CreateUnidadeData): Promise<Unidade>;
  update(unidade: Unidade): Promise<Unidade>;
  destroy(id: string): Promise<void>;
  list(data: ListUnidadeData): Promise<Unidade[]>;
  findById(id: string): Promise<Unidade>;
  findByIdWithSubunidades(id: string): Promise<Unidade>;
  paginate(data: PaginateUnidadeData): Promise<IPage<Unidade>>;
}

export {
  CreateUnidadeData, ListUnidadeData, PaginateUnidadeData, IUnidadesRepository,
};
