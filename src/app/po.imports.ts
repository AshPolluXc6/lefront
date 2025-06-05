

import { 
    PoMenuModule, 
    PoPageModule, 
    PoToolbarModule,
    PoMenuPanelModule,
    PoFieldModule,
    PoGridModule,
    PoTableModule,
    PoModalModule,
    PoButtonModule,
    PoDynamicModule,
    PoAccordionModule, 
    PoIconModule,


    PoToolbarAction,
    PoMenuItem,
    PoMenuPanelItem,
    PoTableColumn,
    PoButtonType,
    PoSelectOption,
      
} from '@po-ui/ng-components';

export const poModules = [
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoMenuPanelModule,
  PoFieldModule,
  PoGridModule,
  PoTableModule, 
  PoModalModule,
  PoButtonModule,
  PoDynamicModule,
  PoAccordionModule, 
  PoIconModule,
];

export type { 
    PoMenuItem,
    PoToolbarAction,
    PoMenuPanelItem,
    PoTableColumn,
    PoButtonType,
    PoSelectOption,
};

export type poTypesUI = {
    menuItem: PoMenuItem;
    toolbarAction: PoToolbarAction;
    menuPanelItem: PoMenuPanelItem;
    TableColumn: PoTableColumn;
    ButtonType: PoButtonType;
    SelectOption: PoSelectOption;
};