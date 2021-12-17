import { AppError } from '../../error/AppError';
import { FakeCdsFgsRepository } from '../../repositories/fakes/FakeCdsFgsRepository';
import { DestroyCdsFgService } from './DestroyCdsFgService';

let fakeCdsFgsRepository: FakeCdsFgsRepository;
let destroyCdsFgService: DestroyCdsFgService;

describe('DestroyCdsFg', () => {
  beforeEach(() => {
    fakeCdsFgsRepository = new FakeCdsFgsRepository();
    destroyCdsFgService = new DestroyCdsFgService(fakeCdsFgsRepository);
  });

  it('deve ser possível remover um CDS/FG', async () => {
    const cdsFg = await fakeCdsFgsRepository.create({
      tipo: 'CDS',
      simbologia: 'cdsFgSimbologia',
      remuneracao: 3000,
      quantidadeVagas: 10,
    });

    const destroy = jest.spyOn(fakeCdsFgsRepository, 'destroy');

    await destroyCdsFgService.execute(cdsFg.id);

    expect(destroy).toHaveBeenCalledWith(cdsFg.id);
  });

  it('não deve ser possível remover um CDS/FG inexistente', async () => {
    await expect(
      destroyCdsFgService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
