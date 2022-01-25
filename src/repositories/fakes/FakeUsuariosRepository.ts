import { Servidor } from '../../entities/Servidor';
import { Usuario } from '../../entities/Usuario';
import { IPage } from '../models/IPage';
import {
  CreateUsuarioData,
  IUsuariosRepository,
  ListUsuarioData,
  PaginateUsuarioData,
} from '../models/IUsuariosRepository';

class FakeUsuariosRepository implements IUsuariosRepository {
  private usuarios: Usuario[] = [];

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

  async update(usuario: Usuario): Promise<Usuario> {
    const index = this.usuarios.findIndex((item) => item.id === usuario.id);

    this.usuarios[index] = usuario;

    return usuario;
  }

  async destroy(id: string): Promise<void> {
    const index = this.usuarios.findIndex((item) => item.id === id);

    this.usuarios.splice(index, 1);
  }

  async list({ login, tipo }: ListUsuarioData): Promise<Usuario[]> {
    let data = [...this.usuarios];

    if (login || tipo) {
      data = this.usuarios.filter(
        (item) => item.login.includes(login) || item.tipo.includes(tipo),
      );
    }

    if (login && tipo) {
      data = this.usuarios.filter(
        (item) => item.login.includes(login) && item.tipo.includes(tipo),
      );
    }

    return data;
  }

  async paginate({
    login, tipo, current, perPage,
  }: PaginateUsuarioData): Promise<IPage<Usuario>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.usuarios];

    if (login || tipo) {
      data = data.filter((item) => item.login.includes(login) || item.tipo.includes(tipo));
    }

    if (login && tipo) {
      data = data.filter((item) => item.login.includes(login) && item.tipo.includes(tipo));
    }

    const size = data.length;
    const total = Math.ceil(size / perPage);

    data = data.slice(skip, take);

    return {
      data,
      perPage,
      current,
      size,
      total,
    };
  }

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

  async findByServidorId(servidorId: string): Promise<Usuario> {
    return this.usuarios.find((item) => item.servidorId === servidorId);
  }

  async findByLogin(login: string): Promise<Usuario> {
    return this.usuarios.find((item) => item.login === login);
  }
}

export { FakeUsuariosRepository };
