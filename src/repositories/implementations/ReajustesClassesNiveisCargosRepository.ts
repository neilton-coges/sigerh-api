import { getRepository, Repository } from 'typeorm';

import { ReajusteClasseNivelCargo } from '../../entities/ReajusteClasseNivelCargo';
import { CreateReajusteClasseNivelCargoData, IReajustesClassesNiveisCargosRepository } from '../models/IReajustesClassesNiveisCargosRepository';

class ReajustesClassesNiveisCargosRepository implements IReajustesClassesNiveisCargosRepository {
  private repository: Repository<ReajusteClasseNivelCargo>;

  constructor() {
    this.repository = getRepository(ReajusteClasseNivelCargo);
  }

  async create(
    {
      percentual,
      observacao,
      classeNivelCargoId,
    }: CreateReajusteClasseNivelCargoData,
  ): Promise<ReajusteClasseNivelCargo> {
    const reajusteClasseNivelCargo = this.repository.create({
      percentual,
      observacao,
      classeNivelCargoId,
    });

    return this.repository.save(reajusteClasseNivelCargo);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<ReajusteClasseNivelCargo> {
    return this.repository.findOne(id);
  }

  async findByClasseNivelCargoId(classeNivelCargoId: string): Promise<ReajusteClasseNivelCargo[]> {
    return this.repository.find({
      classeNivelCargoId,
    });
  }
}

export { ReajustesClassesNiveisCargosRepository };
