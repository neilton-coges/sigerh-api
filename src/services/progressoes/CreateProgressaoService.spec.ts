import { AppError } from '../../error/AppError';
import {
  CorRaca, EstadoCivil, Genero, Servidor, TipoSanguineo,
} from '../../entities/Servidor';
import { Cargo, TipoCargo } from '../../entities/Cargo';
import { Lotacao } from '../../entities/Lotacao';
import { ClasseNivelCargo } from '../../entities/ClasseNivelCargo';
import { PadraoClasseNivelCargo } from '../../entities/PadraoClasseNivelCargo';
import { FakeProgressoesRepository } from '../../repositories/fakes/FakeProgressoesRepository';
import { FakeServidoresRepository } from '../../repositories/fakes/FakeServidoresRepository';
import { FakeLotacoesRepository } from '../../repositories/fakes/FakeLotacoesRepository';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { FakeClassesNiveisCargosRepository } from '../../repositories/fakes/FakeClassesNiveisCargosRepository';
import { FakePadroesClassesNiveisCargosRepository } from '../../repositories/fakes/FakePadroesClassesNiveisCargosRepository';
import { CreateProgressaoService } from './CreateProgressaoService';

describe('CreateProgressaoService', () => {
  let fakeProgressoesRepository: FakeProgressoesRepository;
  let fakeServidoresRepository: FakeServidoresRepository;
  let fakeLotacoesRepository: FakeLotacoesRepository;
  let fakeCargosRepository: FakeCargosRepository;
  let fakeClassesNiveisCargosRepository: FakeClassesNiveisCargosRepository;
  let fakePadroesClasseNiveisCargosRepository: FakePadroesClassesNiveisCargosRepository;
  let createProgressaoService: CreateProgressaoService;

  let servidor: Servidor;

  let cargoEfetivo: Cargo;
  let cargoComissao: Cargo;
  let cargoEfetivoAProgredir: Cargo;

  let classeAProgredir: ClasseNivelCargo;
  let classeDeOutroNivel: ClasseNivelCargo;

  let padraoAProgredir: PadraoClasseNivelCargo;
  let padraoDeOutraClasse: PadraoClasseNivelCargo;

  let lotacaoEfetivo: Lotacao;
  let lotacaoComissao: Lotacao;

  beforeEach(async () => {
    fakeProgressoesRepository = new FakeProgressoesRepository();
    fakeServidoresRepository = new FakeServidoresRepository();
    fakeLotacoesRepository = new FakeLotacoesRepository();
    fakeCargosRepository = new FakeCargosRepository();
    fakeClassesNiveisCargosRepository = new FakeClassesNiveisCargosRepository();
    fakePadroesClasseNiveisCargosRepository = new FakePadroesClassesNiveisCargosRepository();
    createProgressaoService = new CreateProgressaoService(
      fakeProgressoesRepository,
      fakeServidoresRepository,
      fakeLotacoesRepository,
      fakeCargosRepository,
      fakeClassesNiveisCargosRepository,
      fakePadroesClasseNiveisCargosRepository,
    );

    servidor = await fakeServidoresRepository.create({
      nome: 'servidorNome',
      dataNascimento: 'servidorDataNascimento',
      telefoneCorporativo: 'servidorTelefoneCorporativo',
      telefonePessoal: 'servidorTelefonePessoal',
      emailCorporativo: 'servidorEmailCorporativo',
      emailPessoal: 'servidorEmailPessoal',
      genero: Genero.MASCULINO,
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidorNacionalidade',
      naturalidadeCidade: 'servidorNaturalidadeCidade',
      naturalidadeEstado: 'servidorNaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidorConjugeNome',
      conjugeDataNascimento: 'servidorConjugeDataNascimento',
      conjugeCpf: 'servidorConjugeCpf',
      nomeMae: 'servidorNomeMae',
      nomePai: 'servidorNomePai',
      cpf: 'servidorCpf',
      rgNumero: 'servidorRgNumero',
      rgOrgaoEmissor: 'servidorRgOrgaoEmissor',
      rgDataEmissao: 'servidorRgDataEmissao',
      tituloNumero: 'servidorTituloNumero',
      tituloSecao: 'servidorTituloSecao',
      tituloZona: 'servidorTituloZona',
      pis: 'servidorPis',
      tipoSanguineo: TipoSanguineo['A+'],
    });

    cargoEfetivo = await fakeCargosRepository.create({
      descricao: 'descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: 2,
      tipo: TipoCargo.EFETIVO,
    });

    cargoComissao = await fakeCargosRepository.create({
      descricao: 'descricao',
      nivelCargoId: '',
      intervaloProgressao: undefined,
      tipo: TipoCargo.COMISSAO,
    });

    cargoEfetivoAProgredir = await fakeCargosRepository.create({
      descricao: 'descricao',
      nivelCargoId: 'nivelCargoId',
      intervaloProgressao: 2,
      tipo: TipoCargo.EFETIVO,
    });

    classeAProgredir = await fakeClassesNiveisCargosRepository.create({
      codigo: 'A',
      descricao: 'CLASSE A',
      nivelCargoId: 'nivelCargoId',
    });

    classeDeOutroNivel = await fakeClassesNiveisCargosRepository.create({
      codigo: 'B',
      descricao: 'CLASSE B',
      nivelCargoId: 'outroNivelCargoId',
    });

    padraoAProgredir = await fakePadroesClasseNiveisCargosRepository.create({
      codigo: '2',
      descricao: 'Padrão 2',
      valor: 5000,
      classeNivelCargoId: classeAProgredir.id,
    });

    padraoDeOutraClasse = await fakePadroesClasseNiveisCargosRepository.create({
      codigo: '5',
      descricao: 'Padrão 5',
      valor: 8000,
      classeNivelCargoId: 'outraClasseNivelCargoId',
    });

    lotacaoEfetivo = await fakeLotacoesRepository.create({
      cargoId: cargoEfetivo.id,
      servidorId: servidor.id,
      cargo: cargoEfetivo,
      unidadeId: 'unidadeId',
      cdsFgId: '',
    });

    servidor.lotacoes = [lotacaoEfetivo];

    lotacaoComissao = await fakeLotacoesRepository.create({
      cargoId: cargoComissao.id,
      servidorId: servidor.id,
      cargo: cargoComissao,
      unidadeId: 'unidadeId',
      cdsFgId: 'cdsFgId',
    });
  });
  it('deve ser capaz de criar uma progressao', async () => {
    const progressao = await createProgressaoService.execute({
      servidorId: servidor.id,
      cargoId: cargoEfetivoAProgredir.id,
      classeNivelCargoId: classeAProgredir.id,
      padraoClasseNivelCargoId: padraoAProgredir.id,
      dataProgressao: new Date(),
      observacao: 'progressaoObservacao',
      processo: 'progressaoProcesso',
    });

    expect(progressao).toHaveProperty('id');
  });

  it('não deve ser capaz de criar uma progressão para um servidor inexistente', async () => {
    await expect(
      createProgressaoService.execute({
        servidorId: 'servidorIdInexistente',
        cargoId: cargoEfetivoAProgredir.id,
        classeNivelCargoId: classeAProgredir.id,
        padraoClasseNivelCargoId: padraoAProgredir.id,
        dataProgressao: new Date(),
        observacao: 'progressaoObservacao',
        processo: 'progressaoProcesso',

      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de criar uma progressão para uma lotação de cargo não efetivo', async () => {
    servidor.lotacoes = [lotacaoComissao];

    await expect(
      createProgressaoService.execute({
        servidorId: servidor.id,
        cargoId: cargoEfetivoAProgredir.id,
        classeNivelCargoId: classeAProgredir.id,
        padraoClasseNivelCargoId: padraoAProgredir.id,
        dataProgressao: new Date(),
        observacao: 'progressaoObservacao',
        processo: 'progressaoProcesso',

      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de criar uma progressão para um cargo a progredir inexistente', async () => {
    await expect(
      createProgressaoService.execute({
        servidorId: servidor.id,
        cargoId: 'cargoIdInexistente',
        classeNivelCargoId: classeAProgredir.id,
        padraoClasseNivelCargoId: padraoAProgredir.id,
        dataProgressao: new Date(),
        observacao: 'progressaoObservacao',
        processo: 'progressaoProcesso',

      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de criar uma progressão para uma classe a progredir inexistente', async () => {
    await expect(
      createProgressaoService.execute({
        servidorId: servidor.id,
        cargoId: cargoEfetivoAProgredir.id,
        classeNivelCargoId: 'classeNivelCargoIdInexistente',
        padraoClasseNivelCargoId: padraoAProgredir.id,
        dataProgressao: new Date(),
        observacao: 'progressaoObservacao',
        processo: 'progressaoProcesso',

      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de criar uma progressão para uma classe a progredir de um nivel diferente do cargo a progredir', async () => {
    await expect(
      createProgressaoService.execute({
        servidorId: servidor.id,
        cargoId: cargoEfetivoAProgredir.id,
        classeNivelCargoId: classeDeOutroNivel.id,
        padraoClasseNivelCargoId: padraoAProgredir.id,
        dataProgressao: new Date(),
        observacao: 'progressaoObservacao',
        processo: 'progressaoProcesso',

      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de criar uma progressão para um padrão a progredir inexistente', async () => {
    await expect(
      createProgressaoService.execute({
        servidorId: servidor.id,
        cargoId: cargoEfetivoAProgredir.id,
        classeNivelCargoId: classeAProgredir.id,
        padraoClasseNivelCargoId: 'padraoClasseNivelCargoIdInexistente',
        dataProgressao: new Date(),
        observacao: 'progressaoObservacao',
        processo: 'progressaoProcesso',

      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de criar uma progressão para um padrão a progredir de uma outra classe', async () => {
    await expect(
      createProgressaoService.execute({
        servidorId: servidor.id,
        cargoId: cargoEfetivoAProgredir.id,
        classeNivelCargoId: classeDeOutroNivel.id,
        padraoClasseNivelCargoId: padraoDeOutraClasse.id,
        dataProgressao: new Date(),
        observacao: 'progressaoObservacao',
        processo: 'progressaoProcesso',

      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
