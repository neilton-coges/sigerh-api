import { AppError } from '../../error/AppError';
import { FakeUnidadesRepository } from '../../repositories/fakes/FakeUnidadesRepository';
import { ShowUnidadeService } from './ShowUnidadeService';

let fakeUnidadesRepository: FakeUnidadesRepository;
let showUnidadeRepository: ShowUnidadeService;

describe('ShowUnidade', () => {
  beforeEach(() => {
    fakeUnidadesRepository = new FakeUnidadesRepository();
    showUnidadeRepository = new ShowUnidadeService(fakeUnidadesRepository);
  });

  it('deve ser possível mostrar uma unidade', async () => {
    const { id } = await fakeUnidadesRepository.create({
      descricao: 'descricao',
      sigla: 'sigla',
    });

    const unidade = await showUnidadeRepository.execute(id);

    expect(unidade).toHaveProperty('id');
  });

  it('não deve ser possível mostrar uma unidade inexistente', async () => {
    await expect(
      showUnidadeRepository.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
