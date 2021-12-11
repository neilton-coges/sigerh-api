import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaJornadasHoras1639001030706 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'jornadas_horas',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'hora_inicio',
          type: 'time',
        },
        {
          name: 'hora_fim',
          type: 'time',
        },
        {
          name: 'jornada_id',
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
          columnNames: ['jornada_id'],
          referencedTableName: 'jornadas',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('jornadas_horas');
  }
}
