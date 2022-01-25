import { inject, injectable } from 'tsyringe';
import { AppError } from '../../error/AppError';
import { IUsuariosRepository } from '../../repositories/models/IUsuariosRepository';

@injectable()
class DestroyUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const usuario = await this.usuariosRepository.findById(id);

    if (!usuario) {
      throw new AppError('Usuário não encontrado.');
    }

    await this.usuariosRepository.destroy(id);
  }
}

export { DestroyUsuarioService };
