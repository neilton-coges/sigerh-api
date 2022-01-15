import { Servidor } from '../../entities/Servidor';
import { Usuario } from '../../entities/Usuario';
import { CreateUsuarioData, IUsuariosRepository } from '../models/IUsuariosRepository';

class FakeUsuariosRepository implements IUsuariosRepository {
  private usuarios: Usuario[] = [];

  async findByLoginWithServidor(login: string): Promise<Usuario> {
    const usuario = this.usuarios.find((item) => item.login === login);

    if (usuario) {
      const servidor = new Servidor();
      servidor.nome = 'John Doe';

      usuario.servidor = servidor;
    }

    return usuario;
  }

  async findById(id: string): Promise<Usuario> {
    return this.usuarios.find((item) => item.id === id);
  }

  async create({
    login,
    senha,
    tipo,
    servidorId,
  }: CreateUsuarioData): Promise<Usuario> {
    const usuario = new Usuario();

    Object.assign(usuario, {
      login,
      senha,
      tipo,
      servidorId,
    });

    this.usuarios.push(usuario);

    return usuario;
  }

  async findByServidorId(servidorId: string): Promise<Usuario> {
    return this.usuarios.find((item) => item.servidorId === servidorId);
  }

  async findByLogin(login: string): Promise<Usuario> {
    return this.usuarios.find((item) => item.login === login);
  }
}

export { FakeUsuariosRepository };
