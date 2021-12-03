import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaCdsFgs1638295330184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'cds_fgs',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'tipo',
          type: 'enum',
          enum: ['CDS', 'FG'],
        },
        {
          name: 'sigla',
          type: 'varchar',
        },
        {
          name: 'nome',
          type: 'varchar',
        },
        {
          name: 'valor',
          type: 'numeric',
        },
        {
          name: 'qtd_vagas',
          type: 'numeric',
        },
        {
          name: 'qtd_nomeados',
          type: 'numeric',
          default: 0,
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
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cds_fgs');
  }
}
