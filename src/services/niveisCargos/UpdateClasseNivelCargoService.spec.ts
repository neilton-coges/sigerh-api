import { AppError } from '../../error/AppError';
import {
  FakeClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeClassesNiveisCargosRepository';
import {
  UpdateClasseNivelCargoService,
} from './UpdateClasseNivelCargoService';

let fakeClassesNiveisCargosRepository: FakeClassesNiveisCargosRepository;
let updateClasseNivelCargoService: UpdateClasseNivelCargoService;

describe('UpdateClasseNivelCargo', () => {
  beforeEach(() => {
    fakeClassesNiveisCargosRepository = new FakeClassesNiveisCargosRepository();
    updateClasseNivelCargoService = new UpdateClasseNivelCargoService(
      fakeClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível atualizar uma classe de um nível de cargo', async () => {
    const classeNivelCargoCreated = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargoCodigo',
      descricao: 'classeNivelCargoDescricao',
      nivelCargoId: 'classeNivelCargoNivelCargoId',
    });

    const classeNivelCargoUpdated = await updateClasseNivelCargoService.execute({
      ...classeNivelCargoCreated,
      descricao: 'classeNivelCargoDescricaoAtualizada',
    });

    expect(classeNivelCargoUpdated.descricao).toBe('classeNivelCargoDescricaoAtualizada');
  });

  it('não deve ser possível atualizar uma classe inexistente', async () => {
    await expect(
      updateClasseNivelCargoService.execute({
        id: 'classeNivelCargoIdInexistente',
        codigo: 'classeNivelCargoCodigo',
        descricao: 'classeNivelCargoDescricao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar uma classe para um nível cargo com código existente', async () => {
    const classeNivelCargo1 = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargo1Codigo',
      descricao: 'classeNivelCargo1Descricao',
      nivelCargoId: 'nivelCargoId',
    });

    const classeNivelCargo2 = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargo2Codigo',
      descricao: 'classeNivelCargo2Descricao',
      nivelCargoId: 'nivelCargoId',
    });

    await expect(
      updateClasseNivelCargoService.execute({
        ...classeNivelCargo2,
        codigo: classeNivelCargo1.codigo,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
