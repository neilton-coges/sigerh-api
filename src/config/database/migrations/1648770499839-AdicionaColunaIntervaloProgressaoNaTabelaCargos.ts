import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AdicionaColunaIntervaloProgressaoNaTabelaCargos1648770499839
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('cargos', new TableColumn({
      name: 'intervalo_progressao',
      type: 'int',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cargos', 'intervalo_progressao');
  }
}
