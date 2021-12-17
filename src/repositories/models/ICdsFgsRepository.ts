import { CdsFg } from '../../entities/CdsFg';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateCdsFgData = Omit<CdsFg, 'id' | 'quantidadeNomeados' | 'createdAt' | 'updatedAt'>;
type UpdateCdsFgData = Omit<CdsFg, 'quantidadeNomeados' | 'createdAt' | 'updatedAt'>;

type ListCdsFgData = {
  tipo?: 'CDS' | 'FG',
  simbologia?: string;
}

interface PaginateCdsFgData extends IPaginator {
  tipo?: 'CDS' | 'FG',
  simbologia?: string;
}

interface ICdsFgsRepository {
  create(data: CreateCdsFgData): Promise<CdsFg>;
  update(cdsFg: CdsFg): Promise<CdsFg>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<CdsFg>;
  findBySimbologia(simbologia: string): Promise<CdsFg>;
  list(data: ListCdsFgData): Promise<CdsFg[]>;
  paginate(data: PaginateCdsFgData): Promise<IPage<CdsFg>>;
}

export {
  CreateCdsFgData, UpdateCdsFgData, ListCdsFgData, PaginateCdsFgData, ICdsFgsRepository,
};
