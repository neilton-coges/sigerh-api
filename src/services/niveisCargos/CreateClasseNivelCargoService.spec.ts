import { AppError } from '../../error/AppError';
import {
  FakeClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeClassesNiveisCargosRepository';
import {
  FakeNiveisCargosRepository,
} from '../../repositories/fakes/FakeNiveisCargosRepository';
import { CreateClasseNivelCargoService } from './CreateClasseNivelCargoService';

let fakeClassesNiveisCargosRepository: FakeClassesNiveisCargosRepository;
let fakeNiveisCargosRepository: FakeNiveisCargosRepository;
let createClasseNivelCargoService: CreateClasseNivelCargoService;

describe('CreateClasseNivelCargo', () => {
  beforeEach(() => {
    fakeClassesNiveisCargosRepository = new FakeClassesNiveisCargosRepository();
    fakeNiveisCargosRepository = new FakeNiveisCargosRepository();
    createClasseNivelCargoService = new CreateClasseNivelCargoService(
      fakeClassesNiveisCargosRepository,
      fakeNiveisCargosRepository,
    );
  });

  it('deve ser possível criar uma nova classe para um nível de cargo', async () => {
    const nivelCargo = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargoId',
      descricao: 'nivelCargoDescricao',
    });

    const classeNivelCargo = await createClasseNivelCargoService.execute({
      codigo: 'classeNivelCargoCodigo',
      descricao: 'classeNivelCargoDescricao',
      nivelCargoId: nivelCargo.id,
    });

    expect(classeNivelCargo).toHaveProperty('id');
  });

  it('não deve ser possível criar uma nova classe para um nível cargo inexistente', async () => {
    await expect(
      createClasseNivelCargoService.execute({
        codigo: 'classeNivelCargoCodigo',
        descricao: 'classeNivelCargoDescricao',
        nivelCargoId: 'classeNivelCargoNivelCargoIdInexistente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar uma nova classe para um nível cargo com código existente', async () => {
    const nivelCargo = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargoId',
      descricao: 'nivelCargoDescricao',
    });

    const classeNivelCargo1 = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargo1Codigo',
      descricao: 'classeNivelCargo1Descricao',
      nivelCargoId: nivelCargo.id,
    });

    await expect(
      createClasseNivelCargoService.execute({
        codigo: classeNivelCargo1.codigo,
        descricao: 'classeNivelCargo2Descricao',
        nivelCargoId: nivelCargo.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
