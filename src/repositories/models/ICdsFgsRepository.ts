import { CdsFg } from '../../entities/CdsFg';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateCdsFgData = Omit<CdsFg, 'id' | 'qtdNomeados' | 'createdAt' | 'updatedAt'>;

type FilterData = {
  tipo?: 'CDS' | 'FG',
  sigla?: string;
  nome?: string;
}

interface PaginateData extends IPaginator {
  tipo?: 'CDS' | 'FG',
  sigla?: string;
  nome?: string;
}

interface ICdsFgsRepository {
  create(data: CreateCdsFgData): Promise<CdsFg>;
  update(cdsFg: CdsFg): Promise<CdsFg>;
  findById(id: string): Promise<CdsFg>;
  findBySigla(sigla: string): Promise<CdsFg>;
  filter(data: FilterData): Promise<CdsFg[]>;
  paginate(data: PaginateData): Promise<IPage<CdsFg>>;
}

export {
  CreateCdsFgData, FilterData, PaginateData, ICdsFgsRepository,
};
