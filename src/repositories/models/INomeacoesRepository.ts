import { Nomeacao } from '../../entities/Nomeacao';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateNomeacaoData = Omit<Nomeacao, 'id' | 'servidor' | 'cargo' | 'unidade' | 'cdsFg' | 'createdAt' | 'updatedAt'>;

type PaginateNomeacaoData = IPaginator & {
  tipo?: string,
  nomeServidor?: string;
}

interface INomeacoesRepository {
  create(data: CreateNomeacaoData): Promise<Nomeacao>;
  paginate(data: PaginateNomeacaoData): Promise<IPage<Nomeacao>>;
}

export { CreateNomeacaoData, PaginateNomeacaoData, INomeacoesRepository };
