import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaNiveisCargos1640174669535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'niveis_cargos',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'codigo',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'descricao',
          type: 'varchar',
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
    await queryRunner.dropTable('niveis_cargos');
  }
}
