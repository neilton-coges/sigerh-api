import { TipoCargo } from '../../entities/Cargo';
import { TipoNomeacao } from '../../entities/Nomeacao';
import { AppError } from '../../error/AppError';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { FakeLotacoesRepository } from '../../repositories/fakes/FakeLotacoesRepository';
import { FakeNomeacoesRepository } from '../../repositories/fakes/FakeNomeacoesRepository';
import { FakeCdsFgsRepository } from '../../repositories/fakes/FakeCdsFgsRepository';
import { CreateNomeacaoService } from './CreateNomeacaoService';

let fakeNomeacoesRepository: FakeNomeacoesRepository;
let fakeLotacoesRepository: FakeLotacoesRepository;
let fakeCargosRepository: FakeCargosRepository;
let fakeCdsFgsRepository: FakeCdsFgsRepository;
let createNomeacaoService: CreateNomeacaoService;

describe('CreateNomeacao', () => {
  beforeEach(() => {
    fakeNomeacoesRepository = new FakeNomeacoesRepository();
    fakeLotacoesRepository = new FakeLotacoesRepository();
    fakeCargosRepository = new FakeCargosRepository();
    fakeCdsFgsRepository = new FakeCdsFgsRepository();
    createNomeacaoService = new CreateNomeacaoService(
      fakeNomeacoesRepository,
      fakeLotacoesRepository,
      fakeCargosRepository,
      fakeCdsFgsRepository,
    );
  });

  it('deve ser possível criar uma nomeacão', async () => {
    const cargo = await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      descricao: 'cargo1Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: 2,
    });

    const nomeacao = await createNomeacaoService.execute({
      tipo: TipoNomeacao.NOMEACAO,
      cargoId: cargo.id,
      cdsFgId: undefined,
      unidadeId: 'nomeacaoUnidadeId',
      servidorId: 'nomeacaoServidorId',
      data: new Date(),
      diofProcesso: 'nomeacaoDiofProcesso',
      observacao: 'nomeacaoObservacao',
    });

    expect(nomeacao).toHaveProperty('id');
  });

  it('não deve ser possível criar mais de uma nomeação com cargo do tipo EFETIVO para um determinado servidor', async () => {
    const cargoEfetivo1 = await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      descricao: 'cargo1Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: 2,
    });

    const cargoEfetivo2 = await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      descricao: 'cargo2Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: 2,
    });

    await fakeLotacoesRepository.create({
      cargoId: cargoEfetivo1.id,
      cargo: cargoEfetivo1,
      cdsFgId: 'lotacaoCdsFgId',
      unidadeId: 'lotacaoUnidadeId',
      servidorId: 'servidorId',
    });

    await expect(
      createNomeacaoService.execute({
        tipo: TipoNomeacao.NOMEACAO,
        cargoId: cargoEfetivo2.id,
        cdsFgId: 'nomecaoCdsFgId',
        unidadeId: 'nomeacaoUnidadeId',
        servidorId: 'servidorId',
        data: new Date(),
        diofProcesso: 'nomeacaoDiofProcesso',
        observacao: 'nomeacaoObservacao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar mais de uma nomeação com cargo do tipo COMISSAO para um determinado servidor', async () => {
    const cargoComissao1 = await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      descricao: 'cargo1Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: undefined,
    });

    const cargoComissao2 = await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      descricao: 'cargo2Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: undefined,
    });

    await fakeLotacoesRepository.create({
      cargoId: cargoComissao1.id,
      cargo: cargoComissao1,
      cdsFgId: 'lotacaoCdsFgId',
      unidadeId: 'lotacaoUnidadeId',
      servidorId: 'servidorId',
    });

    await expect(
      createNomeacaoService.execute({
        tipo: TipoNomeacao.NOMEACAO,
        cargoId: cargoComissao2.id,
        cdsFgId: 'nomecaoCdsFgId',
        unidadeId: 'nomeacaoUnidadeId',
        servidorId: 'servidorId',
        data: new Date(),
        diofProcesso: 'nomeacaoDiofProcesso',
        observacao: 'nomeacaoObservacao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar mais de uma nomeação com cargo do tipo FUNCÃO GRATIFICADA para um determinado servidor', async () => {
    const cargoFg1 = await fakeCargosRepository.create({
      tipo: TipoCargo.FUNCAO_GRATIFICADA,
      descricao: 'cargo1Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: undefined,
    });

    const cargoFg2 = await fakeCargosRepository.create({
      tipo: TipoCargo.FUNCAO_GRATIFICADA,
      descricao: 'cargo2Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: undefined,
    });

    await fakeLotacoesRepository.create({
      cargoId: cargoFg1.id,
      cargo: cargoFg1,
      cdsFgId: 'lotacaoCdsFgId',
      unidadeId: 'lotacaoUnidadeId',
      servidorId: 'servidorId',
    });

    await expect(
      createNomeacaoService.execute({
        tipo: TipoNomeacao.NOMEACAO,
        cargoId: cargoFg2.id,
        cdsFgId: 'nomecaoCdsFgId',
        unidadeId: 'nomeacaoUnidadeId',
        servidorId: 'servidorId',
        data: new Date(),
        diofProcesso: 'nomeacaoDiofProcesso',
        observacao: 'nomeacaoObservacao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar um nomeação para um CDS/FG sem vagas disponíveis', async () => {
    const cdsFg = await fakeCdsFgsRepository.create({
      quantidadeVagas: 0, // sem vaga disponível
      remuneracao: 1000,
      simbologia: 'cdsFgSimbologia',
      tipo: 'CDS',
    });

    const cargo = await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      descricao: 'cargo1Descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: 2,
    });

    await expect(
      createNomeacaoService.execute({
        tipo: TipoNomeacao.NOMEACAO,
        cargoId: cargo.id,
        cdsFgId: cdsFg.id,
        unidadeId: 'nomeacaoUnidadeId',
        servidorId: 'nomeacaoServidorId',
        data: new Date(),
        diofProcesso: 'nomeacaoDiofProcesso',
        observacao: 'nomeacaoObservacao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
