import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaCargos1638586028585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'cargos',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'tipo',
          type: 'enum',
          enum: ['EFETIVO', 'COMISSAO', 'FUNCAO_GRATIFICADA'],
        },
        {
          name: 'descricao',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'nivel_cargo_id',
          type: 'uuid',
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
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cargos');
  }
}
