import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './BaseModel';
import { Lotacao } from './Lotacao';

enum Genero {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
}

enum TipoSanguineo {
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
}

enum CorRaca {
  BRANCA,
  PRETA,
  PARDA,
  AMARELA,
  INDIGENA,
}

enum EstadoCivil {
  SOLTEIRO,
  CASADO,
  SEPARADO,
  DIVORCIDADO,
  VIUVO,
}

@Entity('servidores')
class Servidor extends BaseModel {
  @Column()
  nome: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento: string;

  @Column({ name: 'telefone_corporativo' })
  telefoneCorporativo: string;

  @Column({ name: 'telefone_pessoal' })
  telefonePessoal: string;

  @Column({ name: 'email_corporativo' })
  emailCorporativo: string;

  @Column({ name: 'email_pessoal' })
  emailPessoal: string;

  @Column({ type: 'enum', enum: Genero })
  genero: Genero;

  @Column({ name: 'tipo_sanguineo', type: 'enum', enum: TipoSanguineo })
  tipoSanguineo: TipoSanguineo;

  @Column({ name: 'cor_raca', type: 'enum', enum: CorRaca })
  corRaca: CorRaca;

  @Column()
  nacionalidade: string;

  @Column({ name: 'naturalidade_cidade' })
  naturalidadeCidade: string;

  @Column({ name: 'naturalidade_estado' })
  naturalidadeEstado: string;

  @Column({ name: 'estado_civil', type: 'enum', enum: EstadoCivil })
  estadoCivil: EstadoCivil;

  @Column({ name: 'conjuge_nome' })
  conjugeNome: string;

  @Column({ name: 'conjuge_cpf' })
  conjugeCpf: string;

  @Column({ name: 'conjuge_data_nascimento' })
  conjugeDataNascimento: string;

  @Column({ name: 'nome_pai' })
  nomePai: string;

  @Column({ name: 'nome_mae' })
  nomeMae: string;

  @Column()
  cpf: string;

  @Column({ name: 'rg_numero' })
  rgNumero: string;

  @Column({ name: 'rg_orgao_emissor' })
  rgOrgaoEmissor: string;

  @Column({ name: 'rg_data_emissao' })
  rgDataEmissao: string;

  @Column({ name: 'titulo_numero' })
  tituloNumero: string;

  @Column({ name: 'titulo_secao' })
  tituloSecao: string;

  @Column({ name: 'titulo_zona' })
  tituloZona: string;

  @Column({ name: 'pis' })
  pis: string;

  @Column({ name: 'data_proxima_progressao' })
  dataProximaProgressao: Date;

  @OneToMany(() => Lotacao, (lotacao) => lotacao.servidor)
  lotacoes: Lotacao[];

  @Expose({ name: 'dataProximaProgressaoFormatada' })
  getDataProximaProgressaoFormatada(): string {
    return this.dataProximaProgressao?.toLocaleDateString('pt', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}

export {
  Genero, TipoSanguineo, CorRaca, EstadoCivil, Servidor,
};
