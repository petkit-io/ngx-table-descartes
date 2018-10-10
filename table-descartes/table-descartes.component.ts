import {
  Component,
  OnInit,
  Input,
  TemplateRef,
} from '@angular/core';
import {
  groupBy,
  keys,
  values,
  orderBy,
  isArray,
} from 'lodash-es';
import {
  ITableDescartesTable,
} from './table-descartes.interface';

@Component({
  selector: 'ngx-table-descartes',
  templateUrl: './table-descartes.component.html',
  styleUrls: ['./table-descartes.component.scss']
})
export class TableDescartesComponent implements OnInit {
  @Input()
  data: {[key: string]: string}[] = [];
  @Input()
  order: string[];
  @Input()
  tpl: TemplateRef<any>;

  aoaData: {[key: string]: string}[][];
  table: ITableDescartesTable[][] = [];

  constructor() {
  }

  ngOnInit() {
    const order = this.getOrder(this.data);
    const orderData = orderBy(this.data, order);
    const aoaData = this.getAoA(orderData, order);

    this.aoaData = aoaData;
    this.table = this.format(aoaData);
  }

  getOrder(data: object[]): any[] {
    return this.order || keys(data[0]);
  }

  getAoA(AoO: object[], order: any[]) {
    return AoO.map(row => order.map(key => row[key]));
  }

  format(data: any[][]): any[][] {
    if (!isArray(data) || data.length === 0) {
      return [];
    }

    if (!isArray(data[0]) || data[0].length === 0) {
      return [];
    }

    const groupDatas = groupBy(data, row => row[0]);

    const result = values(groupDatas).map(groupData => {
      const _data: any[] = [];
      const firstCols: any[] = [];
      let nextResult;

      groupData.forEach(([col, ...row]) => {
        firstCols.push(col);
        _data.push(row);
      });

      const firstCol = {
        content: firstCols[0],
        rowspan: firstCols.length,
      };

      const next = this.format(_data);

      if (next.length) {
        next[0].unshift(firstCol);
        nextResult = next;
      } else {
        const [, ...leaves] = firstCols;
        nextResult = [[firstCol], ...leaves.map(() => [])];
      }

      return nextResult;
    }).reduce((a, b) => a.concat(b), []);

    return result;
  }
}
