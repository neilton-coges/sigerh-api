import { inject, injectable } from 'tsyringe';
import { Usuario } from '../../entities/Usuario';
import { IPage } from '../../repositories/models/IPage';
import {
  IUsuariosRepository,
  PaginateUsuarioData,
} from '../../repositories/models/IUsuariosRepository';

@injectable()
class PaginateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  async execute(
    {
      login, tipo, current = 1, perPage = 15,
    }: PaginateUsuarioData,
  ): Promise<IPage<Usuario>> {
    const page = await this.usuariosRepository.paginate({
      login,
      tipo,
      current,
      perPage,
    });

    return page;
  }
}

export { PaginateUsuarioService };
