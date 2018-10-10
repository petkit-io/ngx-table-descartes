import { TableDescartesModule } from './table-descartes.module';

describe('TableDescartesModule', () => {
  let tableDescartesModule: TableDescartesModule;

  beforeEach(() => {
    tableDescartesModule = new TableDescartesModule();
  });

  it('should create an instance', () => {
    expect(tableDescartesModule).toBeTruthy();
  });
});
