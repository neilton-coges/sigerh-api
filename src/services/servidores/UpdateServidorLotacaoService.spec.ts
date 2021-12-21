import { AppError } from '../../error/AppError';
import { FakeLotacoesRepository } from '../../repositories/fakes/FakeLotacoesRepository';
import { UpdateServidorLotacaoService } from './UpdateServidorLotacaoService';

let fakeLotacoesRepository: FakeLotacoesRepository;
let updateServidorLotacaoService: UpdateServidorLotacaoService;

describe('UpdateLotacao', () => {
  beforeEach(() => {
    fakeLotacoesRepository = new FakeLotacoesRepository();
    updateServidorLotacaoService = new UpdateServidorLotacaoService(fakeLotacoesRepository);
  });

  it('deve ser possível atualizar uma lotacao', async () => {
    const lotacao = await fakeLotacoesRepository.create({
      cargoId: 'lotacaoCargoId',
      cdsFgId: 'lotacaoCdsFgId',
      unidadeId: 'lotacaoUnidadeId',
      servidorId: 'lotacaoServidorId',
    });

    const lotacaoUpdated = await updateServidorLotacaoService.execute({
      ...lotacao,
      matricula: 'lotacaoMatriculaAtualizada',
    });

    expect(lotacaoUpdated.matricula).toBe('lotacaoMatriculaAtualizada');
  });

  it('deve ser possível atualizar uma lotacao inexistente', async () => {
    await expect(
      updateServidorLotacaoService.execute({
        id: 'lotacaoIdInexistente',
        matricula: 'lotacao2Matricula',
        dataAdmissao: new Date(),
        observacao: 'lotacao2Observacao',
        subUnidadeId: 'lotacao2SubunidadeId',
        jornadaId: 'lotacao2JornadaId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar uma lotacao com matricula existente', async () => {
    const lotacao1 = await fakeLotacoesRepository.create({
      cargoId: 'lotacao1CargoId',
      cdsFgId: 'lotacao1CdsFgId',
      unidadeId: 'lotacao1UnidadeId',
      servidorId: 'lotacao1ServidorId',
    });

    const lotacao2 = await fakeLotacoesRepository.create({
      cargoId: 'lotacao2CargoId',
      cdsFgId: 'lotacao2CdsFgId',
      unidadeId: 'lotacao2UnidadeId',
      servidorId: 'lotacao2ServidorId',
    });

    await updateServidorLotacaoService.execute({
      ...lotacao1,
      matricula: 'existente',
    });

    await expect(
      updateServidorLotacaoService.execute({
        ...lotacao2,
        matricula: 'existente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
