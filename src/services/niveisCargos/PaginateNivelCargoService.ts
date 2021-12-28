import { inject, injectable } from 'tsyringe';

import { NivelCargo } from '../../entities/NivelCargo';
import {
  INiveisCargosRepository,
  PaginateNivelCargoData,
} from '../../repositories/models/INiveisCargosRepository';
import { IPage } from '../../repositories/models/IPage';

@injectable()
class PaginateNivelCargoService {
  constructor(
    @inject('NiveisCargosRepository')
    private niveisCargosRepository: INiveisCargosRepository,
  ) {}

  async execute({
    codigo, descricao, current = 1, perPage = 15,
  }: PaginateNivelCargoData): Promise<IPage<NivelCargo>> {
    return this.niveisCargosRepository.paginate({
      codigo,
      descricao,
      current,
      perPage,
    });
  }
}

export { PaginateNivelCargoService };
