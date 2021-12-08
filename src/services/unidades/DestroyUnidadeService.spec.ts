import { AppError } from '../../error/AppError';
import { FakeUnidadesRepository } from '../../repositories/fakes/FakeUnidadesRepository';
import { DestroyUnidadeService } from './DestroyUnidadeService';

let fakeUnidadesRepository: FakeUnidadesRepository;
let destroyUnidadeService: DestroyUnidadeService;

describe('DestroyUnidade', () => {
  beforeEach(() => {
    fakeUnidadesRepository = new FakeUnidadesRepository();
    destroyUnidadeService = new DestroyUnidadeService(fakeUnidadesRepository);
  });

  it('deve ser possível remover uma unidade', async () => {
    const { id } = await fakeUnidadesRepository.create({
      sigla: 'sigla',
      nome: 'nome',
    });

    const destroy = jest.spyOn(fakeUnidadesRepository, 'destroy');

    await destroyUnidadeService.execute(id);

    expect(destroy).toHaveBeenCalledWith(id);
  });

  it('não deve ser possível remover uma unidade inexistente', async () => {
    await expect(
      destroyUnidadeService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
