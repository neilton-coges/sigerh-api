import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AdicionaColunaDataProximaProgressaoNaTabelaServidores1648770442246
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('servidores', new TableColumn({
      name: 'data_proxima_progressao',
      type: 'date',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('servidores', 'data_proxima_progressao');
  }
}
