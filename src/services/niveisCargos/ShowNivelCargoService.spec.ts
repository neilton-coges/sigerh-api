import { AppError } from '../../error/AppError';
import {
  FakeNiveisCargosRepository,
} from '../../repositories/fakes/FakeNiveisCargosRepository';
import { ShowNivelCargoService } from './ShowNivelCargoService';

let fakeNiveisCargosRepository: FakeNiveisCargosRepository;
let showNivelCargoService: ShowNivelCargoService;

describe('CreateNivelCargo', () => {
  beforeEach(() => {
    fakeNiveisCargosRepository = new FakeNiveisCargosRepository();
    showNivelCargoService = new ShowNivelCargoService(fakeNiveisCargosRepository);
  });

  it('deve ser possível mostrar um nível de cargo', async () => {
    const nivelCargoCreated = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargoCodigo',
      descricao: 'nivelCargoDescricao',
    });

    const nivelCargo = await showNivelCargoService.execute(nivelCargoCreated.id);

    expect(nivelCargo).toEqual(nivelCargoCreated);
  });

  it('não deve ser possível mostrar um nível de cargo inexitente', async () => {
    await expect(
      showNivelCargoService.execute('nivelCargoIdInexistetne'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
