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
  Observable,
  of,
  combineLatest,
} from 'rxjs';
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
  data: Observable<{[key: string]: string}[]> = of([]);
  @Input()
  order: Observable<string[] | null> = of(null);
  private _order: string[] | null;
  @Input()
  tpl: TemplateRef<any>;


  orderData: {[key: string]: string}[][];
  aoaData: string[][];
  table: ITableDescartesTable[][] = [];

  constructor() {
  }

  ngOnInit() {
    combineLatest([
      this.data,
      this.order,
    ]).subscribe(([data, order]) => {
      if (!isArray(data)) {
        return;
      }

      const _order = order || (data[0] && keys(data[0]) || null);
      this._order = _order;
      if (!isArray(_order)) {
        return;
      }

      const orderData = orderBy(data, _order);
      this.orderData = orderData;

      const aoaData = this.getAoA(orderData, _order);
      this.aoaData = aoaData;

      this.table = this.format(aoaData);
    });

  }

  getAoA(AoO: object[], order: any[]): string[][] {
    return AoO.map(row => order.map(key => row[key]).filter(key => key !== undefined));
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
        key: this._order ? this._order[this._order.length - _data[0].length - 1] : null,
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
