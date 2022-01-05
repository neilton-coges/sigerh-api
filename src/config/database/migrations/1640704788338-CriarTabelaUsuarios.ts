import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaUsuarios1640704788338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'usuarios',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'login',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'senha',
          type: 'varchar',
        },
        {
          name: 'tipo',
          type: 'enum',
          enum: ['ADMIN', 'EDITOR', 'SERVIDOR'],
        },
        {
          name: 'servidor_id',
          type: 'uuid',
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
          referencedTableName: 'servidores',
          referencedColumnNames: ['id'],
          columnNames: ['servidor_id'],
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuarios');
  }
}
