import { Cargo } from '../../entities/Cargo';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateCargoData = Pick<Cargo, 'tipo' | 'descricao' | 'nivelCargoId'>;
type UpdateCargoData = Pick<Cargo, 'id' | 'tipo' | 'descricao' | 'nivelCargoId'>;

type ListCargoData = {
  tipo?: string,
  descricao?: string;
}

type PaginateCargoData = IPaginator & {
  tipo?: string,
  descricao?: string;
}

interface ICargosRepository {
  create(data: CreateCargoData): Promise<Cargo>;
  update(cargo: Cargo): Promise<Cargo>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<Cargo>;
  findByDescricao(descricao: string): Promise<Cargo>;
  list(data: ListCargoData): Promise<Cargo[]>;
  paginate(data: PaginateCargoData): Promise<IPage<Cargo>>;
}

export {
  CreateCargoData, UpdateCargoData, ListCargoData, PaginateCargoData, ICargosRepository,
};
