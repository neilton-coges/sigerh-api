import { inject, injectable } from 'tsyringe';

import { Servidor } from '../../entities/Servidor';
import { AppError } from '../../error/AppError';
import { IServidoresRepository, UpdateServidorData } from '../../repositories/models/IServidoresRepository';

@injectable()
class UpdateServidorService {
  constructor(
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
  ) {}

  async execute({
    id,
    nome,
    dataNascimento,
    telefoneCorporativo,
    telefonePessoal,
    emailCorporativo,
    emailPessoal,
    genero,
    tipoSanguineo,
    corRaca,
    nacionalidade,
    naturalidadeCidade,
    naturalidadeEstado,
    estadoCivil,
    conjugeNome,
    conjugeCpf,
    conjugeDataNascimento,
    nomeMae,
    nomePai,
    cpf,
    rgNumero,
    rgOrgaoEmissor,
    rgDataEmissao,
    tituloNumero,
    tituloSecao,
    tituloZona,
    pis,
  }: UpdateServidorData): Promise<Servidor> {
    const servidor = await this.servidoresRepository.findById(id);

    if (!servidor) {
      throw new AppError('Servidor não encontrado.');
    }

    const servidorEmailPessoalExists = await this.servidoresRepository.findByEmail(emailPessoal);

    if (servidorEmailPessoalExists && servidorEmailPessoalExists.id !== id) {
      throw new AppError('Já existe um servidor com este e-mail pessoal cadastrado.');
    }

    if (emailCorporativo) {
      const servidorEmailCorporativoExists = await this.servidoresRepository
        .findByEmail(emailCorporativo);

      if (servidorEmailCorporativoExists && servidorEmailCorporativoExists.id !== id) {
        throw new AppError('Já existe um servidor com este e-mail corporativo cadastrado.');
      }
    }

    servidor.nome = nome;
    servidor.dataNascimento = dataNascimento;
    servidor.telefoneCorporativo = telefoneCorporativo;
    servidor.telefonePessoal = telefonePessoal;
    servidor.emailCorporativo = emailCorporativo;
    servidor.emailPessoal = emailPessoal;
    servidor.genero = genero;
    servidor.tipoSanguineo = tipoSanguineo;
    servidor.corRaca = corRaca;
    servidor.nacionalidade = nacionalidade;
    servidor.naturalidadeCidade = naturalidadeCidade;
    servidor.naturalidadeEstado = naturalidadeEstado;
    servidor.estadoCivil = estadoCivil;
    servidor.conjugeNome = conjugeNome;
    servidor.conjugeCpf = conjugeCpf;
    servidor.conjugeDataNascimento = conjugeDataNascimento;
    servidor.nomeMae = nomeMae;
    servidor.nomePai = nomePai;
    servidor.cpf = cpf;
    servidor.rgNumero = rgNumero;
    servidor.rgOrgaoEmissor = rgOrgaoEmissor;
    servidor.rgDataEmissao = rgDataEmissao;
    servidor.tituloNumero = tituloNumero;
    servidor.tituloSecao = tituloSecao;
    servidor.tituloZona = tituloZona;
    servidor.pis = pis;

    await this.servidoresRepository.update(servidor);

    return servidor;
  }
}

export { UpdateServidorService };
