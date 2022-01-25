import { Usuario } from '../../entities/Usuario';
import { IPage } from './IPage';
import { IPaginator } from './IPaginator';

type CreateUsuarioData = Pick<Usuario, 'login' | 'senha' | 'tipo' | 'servidorId'>

type UpdateUsuarioData = Pick<Usuario, 'id' | 'senha' | 'tipo'>

type ListUsuarioData = {
  login?: string;
  tipo?: string;
}

type PaginateUsuarioData = IPaginator & {
  login?: string;
  tipo?: string;
}

interface IUsuariosRepository {
  create(data: CreateUsuarioData): Promise<Usuario>;
  update(usuario: Usuario): Promise<Usuario>;
  destroy(id: string): Promise<void>;
  list(data: ListUsuarioData): Promise<Usuario[]>;
  paginate(data: PaginateUsuarioData): Promise<IPage<Usuario>>;
  findById(id: string): Promise<Usuario>;
  findByServidorId(servidorId: string): Promise<Usuario>;
  findByLogin(login: string): Promise<Usuario>;
  findByLoginWithServidor(login: string): Promise<Usuario>;
}

export {
  CreateUsuarioData,
  UpdateUsuarioData,
  ListUsuarioData,
  PaginateUsuarioData,
  IUsuariosRepository,
};
