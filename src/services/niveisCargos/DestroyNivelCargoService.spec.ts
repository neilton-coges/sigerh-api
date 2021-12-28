import { AppError } from '../../error/AppError';
import {
  FakeNiveisCargosRepository,
} from '../../repositories/fakes/FakeNiveisCargosRepository';
import { DestroyNivelCargoService } from './DestroyNivelCargoService';

let fakeNiveisCargosRepository: FakeNiveisCargosRepository;
let destroyNivelCargoService: DestroyNivelCargoService;

describe('DestroyNivelCargo', () => {
  beforeEach(() => {
    fakeNiveisCargosRepository = new FakeNiveisCargosRepository();
    destroyNivelCargoService = new DestroyNivelCargoService(fakeNiveisCargosRepository);
  });

  it('deve ser possível remover um nível de cargo', async () => {
    const nivelCargo = await fakeNiveisCargosRepository.create({
      codigo: 'nivelCargoCodigo',
      descricao: 'nivelCargoDescricao',
    });

    const destroy = jest.spyOn(fakeNiveisCargosRepository, 'destroy');

    await destroyNivelCargoService.execute(nivelCargo.id);

    expect(destroy).toHaveBeenCalledWith(nivelCargo.id);
  });

  it('deve ser possível remover um nível de cargo inexistente', async () => {
    await expect(
      destroyNivelCargoService.execute('nivelCargoIdInexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
