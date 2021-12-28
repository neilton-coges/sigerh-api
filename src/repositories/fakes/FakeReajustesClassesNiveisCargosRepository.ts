import { ReajusteClasseNivelCargo } from '../../entities/ReajusteClasseNivelCargo';
import { CreateReajusteClasseNivelCargoData, IReajustesClassesNiveisCargosRepository } from '../models/IReajustesClassesNiveisCargosRepository';

class FakeReajustesClassesNiveisCargosRepository
implements IReajustesClassesNiveisCargosRepository {
  private reajustesClassesNiveisCargos: ReajusteClasseNivelCargo[] = [];

  async create(
    { percentual, observacao, classeNivelCargoId }: CreateReajusteClasseNivelCargoData,
  ): Promise<ReajusteClasseNivelCargo> {
    const reajusteClasseNivelCargo = new ReajusteClasseNivelCargo();

    Object.assign(reajusteClasseNivelCargo, {
      percentual,
      observacao,
      classeNivelCargoId,
    });

    this.reajustesClassesNiveisCargos.push(reajusteClasseNivelCargo);

    return reajusteClasseNivelCargo;
  }

  async destroy(id: string): Promise<void> {
    const index = this.reajustesClassesNiveisCargos.findIndex(
      (item) => item.id === id,
    );

    this.reajustesClassesNiveisCargos.splice(index, 1);
  }

  async findById(id: string): Promise<ReajusteClasseNivelCargo> {
    return this.reajustesClassesNiveisCargos.find(
      (item) => item.id === id,
    );
  }

  async findByClasseNivelCargoId(classeNivelCargoId: string): Promise<ReajusteClasseNivelCargo[]> {
    return this.reajustesClassesNiveisCargos.filter(
      (item) => item.classeNivelCargoId === classeNivelCargoId,
    );
  }
}

export { FakeReajustesClassesNiveisCargosRepository };
