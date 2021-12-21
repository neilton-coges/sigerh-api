import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaNomeacoes1640010927128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'nomeacoes',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'tipo',
          type: 'enum',
          enum: ['NOMEACAO', 'EXONERACAO'],
        },
        {
          name: 'cargo_id',
          type: 'uuid',
        },
        {
          name: 'cds_fg_id',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'unidade_id',
          type: 'uuid',
        },
        {
          name: 'servidor_id',
          type: 'uuid',
        },
        {
          name: 'data',
          type: 'date',
        },
        {
          name: 'diof_processo',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'observacao',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          referencedTableName: 'cargos',
          referencedColumnNames: ['id'],
          columnNames: ['cargo_id'],
        },
        {
          referencedTableName: 'cds_fgs',
          referencedColumnNames: ['id'],
          columnNames: ['cds_fg_id'],
        },
        {
          referencedTableName: 'unidades',
          referencedColumnNames: ['id'],
          columnNames: ['unidade_id'],
        },
        {
          referencedTableName: 'servidores',
          referencedColumnNames: ['id'],
          columnNames: ['servidor_id'],
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('nomeacoes');
  }
}
