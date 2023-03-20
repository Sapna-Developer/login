import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  constructor() { }

  getMenu(): Array<any> {
    const menu = [
      { name: 'maindashboard', path: './maindashboard', children: [] },
      { name: 'user-management', path: './user-management', children: [] },
      { 
        name: 'solar-tree', 
        path: './solar-tree', 
        children: [
            {
            name: 'solar',
            path: './solar'
            },
            { 
            name: 'un-identified',
            path: './un-identified'
            },
            { 
            name: 'viewimage',
            path: './viewimage'
            }
        ] 
      },
    ];

    return menu;
  }

}