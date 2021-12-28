import { NivelCargo } from '../../entities/NivelCargo';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateNivelCargoData = Pick<NivelCargo, 'codigo' | 'descricao'>;
type UpdateNivelCargoData = Pick<NivelCargo, 'id' | 'codigo' | 'descricao'>;

type ListNivelCargoData = {
  codigo?: string,
  descricao?: string;
}

type PaginateNivelCargoData = IPaginator & {
  codigo?: string,
  descricao?: string;
}

interface INiveisCargosRepository {
  create(data: CreateNivelCargoData): Promise<NivelCargo>;
  update(nivelCargo: NivelCargo): Promise<NivelCargo>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<NivelCargo>;
  findByCodigo(codigo: string): Promise<NivelCargo>;
  list(data: ListNivelCargoData): Promise<NivelCargo[]>;
  paginate(data: PaginateNivelCargoData): Promise<IPage<NivelCargo>>;
}

export {
  CreateNivelCargoData,
  UpdateNivelCargoData,
  ListNivelCargoData,
  PaginateNivelCargoData,
  INiveisCargosRepository,
};
