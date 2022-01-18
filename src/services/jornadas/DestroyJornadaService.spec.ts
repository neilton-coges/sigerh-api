import { AppError } from '../../error/AppError';
import { FakeJornadasRepository } from '../../repositories/fakes/FakeJornadasRepository';
import { DestroyJornadaService } from './DestroyJornadaService';

let fakeJornadasRepository: FakeJornadasRepository;
let destroyJornadaService: DestroyJornadaService;

describe('DestroyJornada', () => {
  beforeEach(() => {
    fakeJornadasRepository = new FakeJornadasRepository();
    destroyJornadaService = new DestroyJornadaService(fakeJornadasRepository);
  });

  it('deve ser possível remover uma jornada', async () => {
    const { id } = await fakeJornadasRepository.create({
      descricao: 'descricao',
      horas: [
        { horaInicio: '07:00:00', horaFim: '12:00:00' },
      ],
    });

    const destroy = jest.spyOn(fakeJornadasRepository, 'destroy');

    await destroyJornadaService.execute(id);

    expect(destroy).toHaveBeenCalledWith(id);
  });

  it('não deve ser possível remover uma jornada inexistente', async () => {
    await expect(
      destroyJornadaService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
