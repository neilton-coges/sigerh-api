import { Cargo } from '../../entities/Cargo';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateCargoData = Pick<Cargo, 'tipo' |'nome'>;
type UpdateCargoData = Pick<Cargo, 'id' | 'tipo' | 'nome'>;

type ListCargoData = {
  tipo?: string,
  nome?: string;
}

type PaginateCargoData = IPaginator & {
  tipo?: string,
  nome?: string;
}

interface ICargosRepository {
  create(data: CreateCargoData): Promise<Cargo>;
  update(cargo: Cargo): Promise<Cargo>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<Cargo>;
  findByNome(nome: string): Promise<Cargo>;
  list(data: ListCargoData): Promise<Cargo[]>;
  paginate(data: PaginateCargoData): Promise<IPage<Cargo>>;
}

export {
  CreateCargoData, UpdateCargoData, ListCargoData, PaginateCargoData, ICargosRepository,
};
