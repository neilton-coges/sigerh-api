import { Cargo } from '../../entities/Cargo';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateCargoData = Pick<Cargo, 'nome'>;

type ListCargoData = {
  nome?: string;
}

type PaginateCargoData = IPaginator & {
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
  CreateCargoData, ListCargoData, PaginateCargoData, ICargosRepository,
};
