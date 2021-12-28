import { ReajusteClasseNivelCargo } from '../../entities/ReajusteClasseNivelCargo';

type CreateReajusteClasseNivelCargoData = Pick<ReajusteClasseNivelCargo, 'percentual' | 'observacao' | 'classeNivelCargoId'>

interface IReajustesClassesNiveisCargosRepository {
  create(data: CreateReajusteClasseNivelCargoData): Promise<ReajusteClasseNivelCargo>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<ReajusteClasseNivelCargo>;
  findByClasseNivelCargoId(classeNivelCargoId: string): Promise<ReajusteClasseNivelCargo[]>;
}

export {
  CreateReajusteClasseNivelCargoData,
  IReajustesClassesNiveisCargosRepository,
};
