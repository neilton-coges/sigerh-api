import { CdsFg } from '../../entities/CdsFg';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateCdsFgData = Omit<CdsFg, 'id' | 'qtdNomeados' | 'createdAt' | 'updatedAt'>;

type ListCdsFgData = {
  tipo?: 'CDS' | 'FG',
  sigla?: string;
  nome?: string;
}

interface PaginateCdsFgData extends IPaginator {
  tipo?: 'CDS' | 'FG',
  sigla?: string;
  nome?: string;
}

interface ICdsFgsRepository {
  create(data: CreateCdsFgData): Promise<CdsFg>;
  update(cdsFg: CdsFg): Promise<CdsFg>;
  findById(id: string): Promise<CdsFg>;
  findBySigla(sigla: string): Promise<CdsFg>;
  list(data: ListCdsFgData): Promise<CdsFg[]>;
  paginate(data: PaginateCdsFgData): Promise<IPage<CdsFg>>;
}

export {
  CreateCdsFgData, ListCdsFgData, PaginateCdsFgData, ICdsFgsRepository,
};
