import { AppError } from '../../error/AppError';
import { TipoNomeacao } from '../../entities/Nomeacao';
import { FakeNomeacoesRepository } from '../../repositories/fakes/FakeNomeacoesRepository';
import { ShowNomeacaoService } from './ShowNomeacaoService';

let fakeNomeacoesRepository: FakeNomeacoesRepository;
let showNomeacaoService: ShowNomeacaoService;

describe('ShowNomeacao', () => {
  beforeEach(() => {
    fakeNomeacoesRepository = new FakeNomeacoesRepository();
    showNomeacaoService = new ShowNomeacaoService(
      fakeNomeacoesRepository,
    );
  });

  it('deve ser possível mostrar uma nomeação', async () => {
    const nomeacaoCreated = await fakeNomeacoesRepository.create({
      cargoId: 'nomeacaoCargoId',
      cdsFgId: 'nomeacaoCdsFgId',
      data: new Date(),
      diofProcesso: 'nomeacaoDiofProcesso',
      observacao: 'nomeacaoObservacao',
      servidorId: 'nomeacaoServidorId',
      tipo: TipoNomeacao.NOMEACAO,
      unidadeId: 'nomeacaoUnidadeId',
    });

    const nomeacao = await showNomeacaoService.execute(nomeacaoCreated.id);

    expect(nomeacao).toEqual(nomeacaoCreated);
  });

  it('não deve ser possível mostrar uma nomeação inexistente', async () => {
    await expect(
      showNomeacaoService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
