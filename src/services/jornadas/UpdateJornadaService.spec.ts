import { AppError } from '../../error/AppError';
import { FakeJornadasRepository } from '../../repositories/fakes/FakeJornadasRepository';
import { UpdateJornadaService } from './UpdateJornadaService';

let fakeJornadasRepository: FakeJornadasRepository;
let updateJornadaService: UpdateJornadaService;

describe('UpdateJornada', () => {
  beforeEach(() => {
    fakeJornadasRepository = new FakeJornadasRepository();
    updateJornadaService = new UpdateJornadaService(fakeJornadasRepository);
  });

  it('deve ser possível atualizar uma jornada', async () => {
    const { id } = await fakeJornadasRepository.create({
      descricao: 'descricao',
      horas: [
        {
          horaInicio: '07:00:00',
          horaFim: '12:00:00',
        },
      ],
    });

    const jornadaUpdated = await updateJornadaService.execute({
      id,
      descricao: 'updatedDescricao',
      horas: [
        {
          horaInicio: '07:00:00',
          horaFim: '12:00:00',
        },
        {
          horaInicio: '13:00:00',
          horaFim: '17:00:00',
        },
      ],
    });

    expect(jornadaUpdated.descricao).toBe('updatedNome');
    expect(jornadaUpdated.horas).toHaveLength(2);
  });

  it('não deve ser possível atualizar uma jornada inexistente', async () => {
    await expect(
      updateJornadaService.execute({
        id: 'inexistente',
        descricao: 'qualquer',
        horas: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
