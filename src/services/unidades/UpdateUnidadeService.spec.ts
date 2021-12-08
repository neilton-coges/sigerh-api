import { AppError } from '../../error/AppError';
import { FakeUnidadesRepository } from '../../repositories/fakes/FakeUnidadesRepository';
import { UpdateUnidadeService } from './UpdateUnidadeService';

let fakeUnidadesRepository: FakeUnidadesRepository;
let updateUnidadeService: UpdateUnidadeService;

describe('UpdateUnidade', () => {
  beforeEach(() => {
    fakeUnidadesRepository = new FakeUnidadesRepository();
    updateUnidadeService = new UpdateUnidadeService(fakeUnidadesRepository);
  });

  it('deve ser possível atualizar uma unidade', async () => {
    const { id } = await fakeUnidadesRepository.create({
      sigla: 'sigla',
      nome: 'nome',
    });

    const unidadeUpdated = await updateUnidadeService.execute({
      id,
      sigla: 'siglaAtualizada',
      nome: 'nomeAtualizado',
    });

    expect(unidadeUpdated.sigla).toBe('siglaAtualizada');
    expect(unidadeUpdated.nome).toBe('nomeAtualizado');
  });

  it('não deve ser possível atualizar uma unidade inexistente', async () => {
    await expect(
      updateUnidadeService.execute({
        id: 'inexistente',
        nome: 'nome',
        sigla: 'sigla',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
