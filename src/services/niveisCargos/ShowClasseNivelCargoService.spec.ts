import { AppError } from '../../error/AppError';
import {
  FakeClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeClassesNiveisCargosRepository';
import { ShowClasseNivelCargoService } from './ShowClasseNivelCargoService';

let fakeClassesNiveisCargosRepository: FakeClassesNiveisCargosRepository;
let showClasseNivelCargoRepository: ShowClasseNivelCargoService;

describe('ShowClasseNivelCargo', () => {
  beforeEach(() => {
    fakeClassesNiveisCargosRepository = new FakeClassesNiveisCargosRepository();
    showClasseNivelCargoRepository = new ShowClasseNivelCargoService(
      fakeClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível mostrar uma classe de um nível de cargo', async () => {
    const classeNivelCargoCreated = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargoCodigo',
      descricao: 'classeNivelCargoDescricao',
      nivelCargoId: 'classeNivelCargoNivelCargoId',
    });

    const classeNivelCargo = await showClasseNivelCargoRepository.execute(
      classeNivelCargoCreated.id,
    );

    expect(classeNivelCargo).toEqual(classeNivelCargoCreated);
  });

  it('não deve ser possível mostrar uma classe inexistente', async () => {
    await expect(
      showClasseNivelCargoRepository.execute(
        'classeNivelCargoIdInexistente',
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
