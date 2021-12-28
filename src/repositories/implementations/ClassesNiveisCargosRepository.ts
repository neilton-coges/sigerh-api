import { getRepository, Repository } from 'typeorm';

import { ClasseNivelCargo } from '../../entities/ClasseNivelCargo';
import { CreateClasseNivelCargoData, IClassesNiveisCargosRepository } from '../models/IClassesNiveisCargosRepository';

class ClassesNiveisCargosRepository implements IClassesNiveisCargosRepository {
  private repository: Repository<ClasseNivelCargo>;

  constructor() {
    this.repository = getRepository(ClasseNivelCargo);
  }

  async create({
    codigo,
    descricao,
    nivelCargoId,
  }: CreateClasseNivelCargoData): Promise<ClasseNivelCargo> {
    const classeNivelCargo = this.repository.create({
      codigo,
      descricao,
      nivelCargoId,
    });

    await this.repository.save(classeNivelCargo);

    return classeNivelCargo;
  }

  async update(classeNivelCargo: ClasseNivelCargo): Promise<ClasseNivelCargo> {
    return this.repository.save(classeNivelCargo);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<ClasseNivelCargo> {
    return this.repository.findOne(id);
  }

  async findByNivelCargoId(nivelCargoId: string): Promise<ClasseNivelCargo[]> {
    return this.repository.find({
      nivelCargoId,
    });
  }

  async findByCodigoAndNivelCargoId(
    codigo: string,
    nivelCargoId: string,
  ): Promise<ClasseNivelCargo> {
    return this.repository.findOne({
      codigo,
      nivelCargoId,
    });
  }
}

export { ClassesNiveisCargosRepository };
