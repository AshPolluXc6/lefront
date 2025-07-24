import { Component, OnInit } from '@angular/core';
import { ModuleTabsService } from '../../core/services/module-tabs.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


  constructor(
    private tabs: ModuleTabsService
  ) {}  

ngOnInit(): void {
   this.tabs.initModule(
      '/admin/categories', 
      'Categories', 
      'an-fill an-list'
    );
};

}
