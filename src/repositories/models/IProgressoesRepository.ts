import { Progressao } from 'entities/Progressao';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateProgressaoData = Omit<Progressao, 'id' | 'servidor' | 'cargo' | 'classeNivelCargo' | 'padraoClasseNivelCargo' | 'getDataProgressaoFormatada' | 'createdAt' | 'updatedAt'>

type ListProgressaoData = {
  servidorId?: string;
  dataProgressaoInicio?: Date;
  dataProgressaoFim?: Date;
}

type PaginateProgressaoData = IPaginator & {
  servidorId?: string;
  dataProgressaoInicio?: Date;
  dataProgressaoFim?: Date;
}

interface IProgressoesRepository {
  create(data: CreateProgressaoData): Promise<Progressao>;
  findById(id: string): Promise<Progressao>;
  findByServidorIdAndLotacaoId(servidorId: string, lotacaoId: string): Promise<Progressao[]>;
  list(data: ListProgressaoData): Promise<Progressao[]>;
  paginate(data: PaginateProgressaoData): Promise<IPage<Progressao>>;
}

export {
  IProgressoesRepository, CreateProgressaoData, ListProgressaoData, PaginateProgressaoData,
};
