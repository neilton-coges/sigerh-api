import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { Usuario } from '../../entities/Usuario';
import { AppError } from '../../error/AppError';
import { IUsuariosRepository, UpdateUsuarioData } from '../../repositories/models/IUsuariosRepository';

@injectable()
class UpdateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute({ id, tipo, senha }: UpdateUsuarioData): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findById(id);

    if (!usuario) {
      throw new AppError('Usuário não encontrado.');
    }

    if (senha) {
      const passwordHash = await hash(senha, 8);
      usuario.senha = passwordHash;
    }

    usuario.tipo = tipo;

    await this.usuariosRepository.update(usuario);

    return usuario;
  }
}

export { UpdateUsuarioService };
