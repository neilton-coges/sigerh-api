import { Usuario } from '../../entities/Usuario';

type CreateUsuarioData = Pick<Usuario, 'login' | 'senha' | 'tipo' | 'servidorId'>

interface IUsuariosRepository {
  create(data: CreateUsuarioData): Promise<Usuario>;
  findByServidorId(servidorId: string): Promise<Usuario>;
  findByLogin(login: string): Promise<Usuario>;
  findByLoginWithServidor(login: string): Promise<Usuario>;
}

export { CreateUsuarioData, IUsuariosRepository };
