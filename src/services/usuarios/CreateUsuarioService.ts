import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { Usuario } from '../../entities/Usuario';
import { AppError } from '../../error/AppError';
import { IServidoresRepository } from '../../repositories/models/IServidoresRepository';
import { CreateUsuarioData, IUsuariosRepository } from '../../repositories/models/IUsuariosRepository';

@injectable()
class CreateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
  ) {}

  async execute({
    login, senha, tipo, servidorId,
  }: CreateUsuarioData): Promise<Usuario> {
    const servidorExists = await this.servidoresRepository.findById(servidorId);

    if (!servidorExists) {
      throw new AppError('Servidor não encontrado.');
    }

    const servidorHasUsuario = await this.usuariosRepository.findByServidorId(servidorId);

    if (servidorHasUsuario) {
      throw new AppError('Já existe um usuário cadastrado para este servidor.');
    }

    const servidorWithLoginExists = await this.usuariosRepository.findByLogin(login);

    if (servidorWithLoginExists) {
      throw new AppError('Já existe um usuário cadastrado com este login.');
    }

    const senhaHash = await hash(senha, 8);

    const usuario = await this.usuariosRepository.create({
      login,
      senha: senhaHash,
      tipo,
      servidorId,
    });

    return usuario;
  }
}

export { CreateUsuarioService };
