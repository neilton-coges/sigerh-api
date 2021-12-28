import { AppError } from '../../error/AppError';
import {
  FakeClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeClassesNiveisCargosRepository';
import { DestroyClasseNivelCargoService } from './DestroyClasseNivelCargoService';

let fakeClassesNiveisCargosRepository: FakeClassesNiveisCargosRepository;
let destroyClasseNivelCargoRepository: DestroyClasseNivelCargoService;

describe('DestroyClasseNivelCargo', () => {
  beforeEach(() => {
    fakeClassesNiveisCargosRepository = new FakeClassesNiveisCargosRepository();
    destroyClasseNivelCargoRepository = new DestroyClasseNivelCargoService(
      fakeClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível remover uma classe para de um nível de cargo', async () => {
    const classeNivelCargo = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargoCodigo',
      descricao: 'classeNivelCargoDescricao',
      nivelCargoId: 'classeNivelCargoNivelCargoId',
    });

    const destroy = jest.spyOn(fakeClassesNiveisCargosRepository, 'destroy');

    await destroyClasseNivelCargoRepository.execute(classeNivelCargo.id);

    expect(destroy).toHaveBeenCalledWith(classeNivelCargo.id);
  });

  it('não deve ser possível remover uma classe inexistente', async () => {
    await expect(
      destroyClasseNivelCargoRepository.execute('classeNivelCargoIdInexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
