import { getRepository, Repository } from 'typeorm';

import { Usuario } from '../../entities/Usuario';
import { CreateUsuarioData, IUsuariosRepository } from '../models/IUsuariosRepository';

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
