import { inject, injectable } from 'tsyringe';
import { Usuario } from '../../entities/Usuario';
import { IUsuariosRepository, ListUsuarioData } from '../../repositories/models/IUsuariosRepository';

@injectable()
class ListUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute({ login, tipo }: ListUsuarioData): Promise<Usuario[]> {
    const list = await this.usuariosRepository.list({
      login,
      tipo,
    });

    return list;
  }
}

export { ListUsuarioService };
