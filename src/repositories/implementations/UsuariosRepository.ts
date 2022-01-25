import { getRepository, ILike, Repository } from 'typeorm';

import { Usuario } from '../../entities/Usuario';
import { IPage } from '../models/IPage';
import {
  CreateUsuarioData,
  IUsuariosRepository,
  ListUsuarioData,
  PaginateUsuarioData,
} from '../models/IUsuariosRepository';

class UsuariosRepository implements IUsuariosRepository {
  private repository: Repository<Usuario>;

  constructor() {
    this.repository = getRepository(Usuario);
  }

  async create({
    login,
    senha,
    tipo,
    servidorId,
  }: CreateUsuarioData): Promise<Usuario> {
    const usuario = this.repository.create({
      login,
      senha,
      tipo,
      servidorId,
    });

    return this.repository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    return this.repository.save(usuario);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async list({ login, tipo }: ListUsuarioData): Promise<Usuario[]> {
    const query = this.repository.createQueryBuilder('usuario');

    if (login) {
      query.andWhere({
        cpf: ILike(`%${login}%`),
      });
    }

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    query.leftJoinAndSelect('usuario.servidor', 'servidor');

    return query.getMany();
  }

  async paginate({
    login,
    tipo,
    current,
    perPage,
  }: PaginateUsuarioData): Promise<IPage<Usuario>> {
    const skip = current * perPage - perPage;
    const take = perPage;

    const query = this.repository.createQueryBuilder('usuario');

    if (login) {
      query.andWhere({
        login: ILike(`%${login}%`),
      });
    }

    if (tipo) {
      query.andWhere({
        tipo,
      });
    }

    query.leftJoinAndSelect('usuario.servidor', 'servidor');

    const size = await query.getCount();
    const total = Math.ceil(size / perPage);

    query.take(take);
    query.skip(skip);

    const data = await query.getMany();

    return {
      data,
      perPage,
      current,
      size,
      total,
    };
  }

  async findById(id: string): Promise<Usuario> {
    return this.repository.findOne(id);
  }

  async findByServidorId(servidorId: string): Promise<Usuario> {
    return this.repository.findOne({ servidorId });
  }

  async findByLogin(login: string): Promise<Usuario> {
    return this.repository.findOne({ login });
  }

  async findByLoginWithServidor(login: string): Promise<Usuario> {
    return this.repository.findOne({
      where: {
        login,
      },
      relations: ['servidor'],
    });
  }
}

export { UsuariosRepository };
