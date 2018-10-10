# ngx-table-descartes
Angular descartes table component

# Installation

```bash
npm install --save @petkit/ngx-table-descartes
```

# Usage

## Import Module

```ts
import {
  TableDescartesModule,
} from '@petkit/ngx-table-descartes';

@NgModule({
  imports: [
    TableDescartesModule,
  ],
}
```

## Simple

```html
<ngx-table-descartes [data]="data"></ngx-table-descartes>
```

```ts
import { Component, OnInit } from '@angular/core';
// mock data
import Mock from 'mockjs';

@Component({
  selector: 'ngx-table-descartes-simple',
  templateUrl: './table-descartes-simple.component.html',
  styleUrls: ['./table-descartes-simple.component.scss']
})
export class TableDescartesSimpleComponent implements OnInit {
  data: {[key: string]: string}[] = Mock.mock({
    'data|10-20': [{
      'type|1': ['typeA', 'typeB', 'typeC'],
      'size|1': ['big', 'middle', 'small'],
      'name': '@name()',
    }]
  }).data;

  constructor() { }

  ngOnInit() {
  }

}
```

# License
MIT

