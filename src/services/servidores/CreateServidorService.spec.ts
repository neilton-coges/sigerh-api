import {
  CorRaca, EstadoCivil, Genero, TipoSanguineo,
} from '../../entities/Servidor';
import { AppError } from '../../error/AppError';
import { FakeServidoresRepository } from '../../repositories/fakes/FakeServidoresRepository';
import { CreateServidorService } from './CreateServidorService';

let fakeServidoresRepository: FakeServidoresRepository;
let createServidorService: CreateServidorService;

describe('CreateServidor', () => {
  beforeEach(() => {
    fakeServidoresRepository = new FakeServidoresRepository();
    createServidorService = new CreateServidorService(fakeServidoresRepository);
  });

  it('deve ser possível criar um novo servidor', async () => {
    const servidor = await createServidorService.execute({
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

    expect(servidor).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo usuário com cpf já existente', async () => {
    await createServidorService.execute({
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
      cpf: 'servidorCpfExistente',
      rgNumero: 'servidorRgNumero',
      rgOrgaoEmissor: 'servidorRgOrgaoEmissor',
      rgDataEmissao: 'servidorRgDataEmissao',
      tituloNumero: 'servidorTituloNumero',
      tituloSecao: 'servidorTituloSecao',
      tituloZona: 'servidorTituloZona',
      pis: 'servidorPis',
    });

    await expect(
      createServidorService.execute({
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
        cpf: 'servidorCpfExistente',
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

  it('não deve ser possível criar um novo usuário com e-mail corporativo já existente', async () => {
    await createServidorService.execute({
      nome: 'servidorNome',
      dataNascimento: 'servidorDataNascimento',
      telefoneCorporativo: 'servidorTelefoneCorporativo',
      telefonePessoal: 'servidorTelefonePessoal',
      emailCorporativo: 'servidorEmailExistente',
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

    await expect(
      createServidorService.execute({
        nome: 'servidor2Nome',
        dataNascimento: 'servidor2DataNascimento',
        telefoneCorporativo: 'servidor2TelefoneCorporativo',
        telefonePessoal: 'servidor2TelefonePessoal',
        emailCorporativo: 'servidorEmailExistente',
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

  it('não deve ser possível criar um novo usuário com e-mail pessoal já existente', async () => {
    await createServidorService.execute({
      nome: 'servidorNome',
      dataNascimento: 'servidorDataNascimento',
      telefoneCorporativo: 'servidorTelefoneCorporativo',
      telefonePessoal: 'servidorTelefonePessoal',
      emailCorporativo: 'servidorEmailCorporativo',
      emailPessoal: 'servidorEmailPessoalExistente',
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

    await expect(
      createServidorService.execute({
        nome: 'servidor2Nome',
        dataNascimento: 'servidor2DataNascimento',
        telefoneCorporativo: 'servidor2TelefoneCorporativo',
        telefonePessoal: 'servidor2TelefonePessoal',
        emailCorporativo: 'servidor2EmailCorporativo',
        emailPessoal: 'servidorEmailPessoalExistente',
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
