import { inject, injectable } from 'tsyringe';

import { Usuario } from '../../entities/Usuario';
import { AppError } from '../../error/AppError';
import { IUsuariosRepository } from '../../repositories/models/IUsuariosRepository';

@injectable()
class ShowUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute(id: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findById(id);

    if (!usuario) {
      throw new AppError('Usuário não encontrado.');
    }

    return usuario;
  }
}

export { ShowUsuarioService };
