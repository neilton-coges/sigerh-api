import {
  CorRaca, EstadoCivil, Genero, TipoSanguineo,
} from '../../entities/Servidor';
import { AppError } from '../../error/AppError';
import { FakeServidoresRepository } from '../../repositories/fakes/FakeServidoresRepository';
import { UpdateServidorService } from './UpdateServidorService';

let fakeServidoresRepository: FakeServidoresRepository;
let updateServidorService: UpdateServidorService;

describe('UpdateServidor', () => {
  beforeEach(() => {
    fakeServidoresRepository = new FakeServidoresRepository();
    updateServidorService = new UpdateServidorService(fakeServidoresRepository);
  });

  it('deve ser possível atualizar um servidor', async () => {
    const { id } = await fakeServidoresRepository.create({
      nome: 'servidorNome',
      dataNascimento: 'servidorDataNascimento',
      telefoneCorporativo: 'servidorTelefoneCorporativo',
      telefonePessoal: 'servidorTelefonePessoal',
      emailCorporativo: 'servidorEmailCorporativo',
      emailPessoal: 'servidorEmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
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
    });

    const servidorUpdated = await updateServidorService.execute({
      id,
      nome: 'servidorNomeAtualizado',
      dataNascimento: 'servidorDataNascimento',
      telefoneCorporativo: 'servidorTelefoneCorporativo',
      telefonePessoal: 'servidorTelefonePessoal',
      emailCorporativo: 'servidorEmailCorporativo',
      emailPessoal: 'servidorEmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
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
    });

    expect(servidorUpdated.nome).toBe('servidorNomeAtualizado');
  });

  it('não deve ser possível atualizar um servidor inexistente', async () => {
    await expect(
      updateServidorService.execute({
        id: 'inexistente',
        nome: 'servidorNomeAtualizado',
        dataNascimento: 'servidorDataNascimento',
        telefoneCorporativo: 'servidorTelefoneCorporativo',
        telefonePessoal: 'servidorTelefonePessoal',
        emailCorporativo: 'servidorEmailCorporativo',
        emailPessoal: 'servidorEmailPessoal',
        genero: Genero.MASCULINO,
        tipoSanguineo: TipoSanguineo['A+'],
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um servidor com email corporativo existente', async () => {
    await fakeServidoresRepository.create({
      nome: 'servidor1Nome',
      dataNascimento: 'servidor1DataNascimento',
      telefoneCorporativo: 'servidor1TelefoneCorporativo',
      telefonePessoal: 'servidor1TelefonePessoal',
      emailCorporativo: 'servidor1EmailCorporativo',
      emailPessoal: 'servidor1EmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidor1Nacionalidade',
      naturalidadeCidade: 'servidor1NaturalidadeCidade',
      naturalidadeEstado: 'servidor1NaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidor1ConjugeNome',
      conjugeDataNascimento: 'servidor1ConjugeDataNascimento',
      conjugeCpf: 'servidor1ConjugeCpf',
      nomeMae: 'servidor1NomeMae',
      nomePai: 'servidor1NomePai',
      cpf: 'servidor1Cpf',
      rgNumero: 'servidor1RgNumero',
      rgOrgaoEmissor: 'servidor1RgOrgaoEmissor',
      rgDataEmissao: 'servidor1RgDataEmissao',
      tituloNumero: 'servidor1TituloNumero',
      tituloSecao: 'servidor1TituloSecao',
      tituloZona: 'servidor1TituloZona',
      pis: 'servidor1Pis',
    });

    const { id } = await fakeServidoresRepository.create({
      nome: 'servidor2Nome',
      dataNascimento: 'servidor2DataNascimento',
      telefoneCorporativo: 'servidor2TelefoneCorporativo',
      telefonePessoal: 'servidor2TelefonePessoal',
      emailCorporativo: 'servidor2EmailCorporativo',
      emailPessoal: 'servidor2EmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidor2Nacionalidade',
      naturalidadeCidade: 'servidor2NaturalidadeCidade',
      naturalidadeEstado: 'servidor2NaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidor2ConjugeNome',
      conjugeDataNascimento: 'servidor2ConjugeDataNascimento',
      conjugeCpf: 'servidor2ConjugeCpf',
      nomeMae: 'servidor2NomeMae',
      nomePai: 'servidor2NomePai',
      cpf: 'servidor2Cpf',
      rgNumero: 'servidor2RgNumero',
      rgOrgaoEmissor: 'servidor2RgOrgaoEmissor',
      rgDataEmissao: 'servidor2RgDataEmissao',
      tituloNumero: 'servidor2TituloNumero',
      tituloSecao: 'servidor2TituloSecao',
      tituloZona: 'servidor2TituloZona',
      pis: 'servidor2Pis',
    });

    await expect(
      updateServidorService.execute({
        id,
        nome: 'servidor2Nome',
        dataNascimento: 'servidor2DataNascimento',
        telefoneCorporativo: 'servidor2TelefoneCorporativo',
        telefonePessoal: 'servidor2TelefonePessoal',
        emailCorporativo: 'servidor1EmailCorporativo',
        emailPessoal: 'servidor2EmailPessoal',
        genero: Genero.MASCULINO,
        tipoSanguineo: TipoSanguineo['A+'],
        corRaca: CorRaca.BRANCA,
        nacionalidade: 'servidor2Nacionalidade',
        naturalidadeCidade: 'servidor2NaturalidadeCidade',
        naturalidadeEstado: 'servidor2NaturalidadeEstado',
        estadoCivil: EstadoCivil.CASADO,
        conjugeNome: 'servidor2ConjugeNome',
        conjugeDataNascimento: 'servidor2ConjugeDataNascimento',
        conjugeCpf: 'servidor2ConjugeCpf',
        nomeMae: 'servidor2NomeMae',
        nomePai: 'servidor2NomePai',
        cpf: 'servidor2Cpf',
        rgNumero: 'servidor2RgNumero',
        rgOrgaoEmissor: 'servidor2RgOrgaoEmissor',
        rgDataEmissao: 'servidor2RgDataEmissao',
        tituloNumero: 'servidor2TituloNumero',
        tituloSecao: 'servidor2TituloSecao',
        tituloZona: 'servidor2TituloZona',
        pis: 'servidor2Pis',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um servidor com email pessoal existente', async () => {
    await fakeServidoresRepository.create({
      nome: 'servidor1Nome',
      dataNascimento: 'servidor1DataNascimento',
      telefoneCorporativo: 'servidor1TelefoneCorporativo',
      telefonePessoal: 'servidor1TelefonePessoal',
      emailCorporativo: 'servidor1EmailCorporativo',
      emailPessoal: 'servidor1EmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidor1Nacionalidade',
      naturalidadeCidade: 'servidor1NaturalidadeCidade',
      naturalidadeEstado: 'servidor1NaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidor1ConjugeNome',
      conjugeDataNascimento: 'servidor1ConjugeDataNascimento',
      conjugeCpf: 'servidor1ConjugeCpf',
      nomeMae: 'servidor1NomeMae',
      nomePai: 'servidor1NomePai',
      cpf: 'servidor1Cpf',
      rgNumero: 'servidor1RgNumero',
      rgOrgaoEmissor: 'servidor1RgOrgaoEmissor',
      rgDataEmissao: 'servidor1RgDataEmissao',
      tituloNumero: 'servidor1TituloNumero',
      tituloSecao: 'servidor1TituloSecao',
      tituloZona: 'servidor1TituloZona',
      pis: 'servidor1Pis',
    });

    const { id } = await fakeServidoresRepository.create({
      nome: 'servidor2Nome',
      dataNascimento: 'servidor2DataNascimento',
      telefoneCorporativo: 'servidor2TelefoneCorporativo',
      telefonePessoal: 'servidor2TelefonePessoal',
      emailCorporativo: 'servidor2EmailCorporativo',
      emailPessoal: 'servidor2EmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidor2Nacionalidade',
      naturalidadeCidade: 'servidor2NaturalidadeCidade',
      naturalidadeEstado: 'servidor2NaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidor2ConjugeNome',
      conjugeDataNascimento: 'servidor2ConjugeDataNascimento',
      conjugeCpf: 'servidor2ConjugeCpf',
      nomeMae: 'servidor2NomeMae',
      nomePai: 'servidor2NomePai',
      cpf: 'servidor2Cpf',
      rgNumero: 'servidor2RgNumero',
      rgOrgaoEmissor: 'servidor2RgOrgaoEmissor',
      rgDataEmissao: 'servidor2RgDataEmissao',
      tituloNumero: 'servidor2TituloNumero',
      tituloSecao: 'servidor2TituloSecao',
      tituloZona: 'servidor2TituloZona',
      pis: 'servidor2Pis',
    });

    await expect(
      updateServidorService.execute({
        id,
        nome: 'servidor2Nome',
        dataNascimento: 'servidor2DataNascimento',
        telefoneCorporativo: 'servidor2TelefoneCorporativo',
        telefonePessoal: 'servidor2TelefonePessoal',
        emailCorporativo: 'servidor2EmailCorporativo',
        emailPessoal: 'servidor1EmailPessoal',
        genero: Genero.MASCULINO,
        tipoSanguineo: TipoSanguineo['A+'],
        corRaca: CorRaca.BRANCA,
        nacionalidade: 'servidor2Nacionalidade',
        naturalidadeCidade: 'servidor2NaturalidadeCidade',
        naturalidadeEstado: 'servidor2NaturalidadeEstado',
        estadoCivil: EstadoCivil.CASADO,
        conjugeNome: 'servidor2ConjugeNome',
        conjugeDataNascimento: 'servidor2ConjugeDataNascimento',
        conjugeCpf: 'servidor2ConjugeCpf',
        nomeMae: 'servidor2NomeMae',
        nomePai: 'servidor2NomePai',
        cpf: 'servidor2Cpf',
        rgNumero: 'servidor2RgNumero',
        rgOrgaoEmissor: 'servidor2RgOrgaoEmissor',
        rgDataEmissao: 'servidor2RgDataEmissao',
        tituloNumero: 'servidor2TituloNumero',
        tituloSecao: 'servidor2TituloSecao',
        tituloZona: 'servidor2TituloZona',
        pis: 'servidor2Pis',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
