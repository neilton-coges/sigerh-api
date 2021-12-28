import { ClasseNivelCargo } from '../../entities/ClasseNivelCargo';
import { CreateClasseNivelCargoData, IClassesNiveisCargosRepository } from '../models/IClassesNiveisCargosRepository';

class FakeClassesNiveisCargosRepository implements IClassesNiveisCargosRepository {
  private classesNiveisCargos: ClasseNivelCargo[] = [];

  async create({
    codigo,
    descricao,
    nivelCargoId,
  }: CreateClasseNivelCargoData): Promise<ClasseNivelCargo> {
    const classeNivelCargo = new ClasseNivelCargo();

    Object.assign(classeNivelCargo, {
      codigo,
      descricao,
      nivelCargoId,
    });

    this.classesNiveisCargos.push(classeNivelCargo);

    return classeNivelCargo;
  }

  async update(classeNivelCargo: ClasseNivelCargo): Promise<ClasseNivelCargo> {
    const index = this.classesNiveisCargos.findIndex((item) => item.id === classeNivelCargo.id);

    this.classesNiveisCargos[index] = classeNivelCargo;

    return classeNivelCargo;
  }

  async destroy(id: string): Promise<void> {
    const index = this.classesNiveisCargos.findIndex((item) => item.id === id);

    this.classesNiveisCargos.splice(index, 1);
  }

  async findById(id: string): Promise<ClasseNivelCargo> {
    return this.classesNiveisCargos.find((item) => item.id === id);
  }

  async findByNivelCargoId(nivelCargoId: string): Promise<ClasseNivelCargo[]> {
    return this.classesNiveisCargos.filter((item) => item.nivelCargoId === nivelCargoId);
  }

  async findByCodigoAndNivelCargoId(
    codigo: string,
    nivelCargoId: string,
  ): Promise<ClasseNivelCargo> {
    return this.classesNiveisCargos.find(
      (item) => item.codigo === codigo && item.nivelCargoId === nivelCargoId,
    );
  }
}

export { FakeClassesNiveisCargosRepository };
