import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TreeNode, FilterOptions } from './tree-node.intercafe';
import { TreeViewService } from './tree-view.service';
import { ModuleTabsService } from '../../core/services/module-tabs.service';
import { moveItemInArray, CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-categories',
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent implements OnInit, OnDestroy {
  @Input() data: TreeNode[] = [
        {
      "id": "1",
      "label": "Reino Animal",
      "value": "animal",
      "description": "Seres vivos do reino animal",
      "level": 1,
      "expanded": true,
      "visible": true,
      "children": [
        {
          "id": "1.1",
          "label": "Vertebrados",
          "value": "vertebrados",
          "description": "Animais com coluna vertebral",
          "level": 2,
          "parentId": "1",
          "expanded": true,
          "visible": true,
          "children": [
            {
              "id": "1.1.1",
              "label": "Mamíferos",
              "value": "mamiferos",
              "description": "Animais que amamentam",
              "level": 3,
              "parentId": "1.1",
              "expanded": true,
              "visible": true,
              "children": [
                {
                  "id": "1.1.1.1",
                  "label": "Primatas",
                  "value": "primatas",
                  "description": "Inclui humanos e macacos",
                  "level": 4,
                  "parentId": "1.1.1",
                  "expanded": true,
                  "visible": true,
                  "children": [
                    {
                      "id": "1.1.1.1.1",
                      "label": "Hominídeos",
                      "value": "hominideos",
                      "description": "Grandes primatas incluindo humanos",
                      "level": 5,
                      "parentId": "1.1.1.1",
                      "visible": true
                    },
                    {
                      "id": "1.1.1.1.2",
                      "label": "Cercopitecídeos",
                      "value": "cercopitecideos",
                      "description": "Macacos do Velho Mundo",
                      "level": 5,
                      "parentId": "1.1.1.1",
                      "visible": true
                    }
                  ]
                },
                {
                  "id": "1.1.1.2",
                  "label": "Carnívoros",
                  "value": "carnivoros",
                  "description": "Animais que se alimentam de carne",
                  "level": 4,
                  "parentId": "1.1.1",
                  "expanded": true,
                  "visible": true,
                  "children": [
                    {
                      "id": "1.1.1.2.1",
                      "label": "Felinos",
                      "value": "felinos",
                      "description": "Inclui gatos, leões, tigres",
                      "level": 5,
                      "parentId": "1.1.1.2",
                      "visible": true
                    },
                    {
                      "id": "1.1.1.2.2",
                      "label": "Caninos",
                      "value": "caninos",
                      "description": "Inclui cães, lobos, raposas",
                      "level": 5,
                      "parentId": "1.1.1.2",
                      "visible": true
                    }
                  ]
                }
              ]
            },
            {
              "id": "1.1.2",
              "label": "Aves",
              "value": "aves",
              "description": "Animais com penas e asas",
              "level": 3,
              "parentId": "1.1",
              "expanded": true,
              "visible": true,
              "children": [
                {
                  "id": "1.1.2.1",
                  "label": "Pássaros",
                  "value": "passaros",
                  "description": "Aves canoras e pequenas",
                  "level": 4,
                  "parentId": "1.1.2",
                  "visible": true
                },
                {
                  "id": "1.1.2.2",
                  "label": "Aves de Rapina",
                  "value": "aves-de-rapina",
                  "description": "Aves que caçam outras animais",
                  "level": 4,
                  "parentId": "1.1.2",
                  "visible": true
                }
              ]
            }
          ]
        },
        {
          "id": "1.2",
          "label": "Invertebrados",
          "value": "invertebrados",
          "description": "Animais sem coluna vertebral",
          "level": 2,
          "parentId": "1",
          "expanded": true,
          "visible": true,
          "children": [
            {
              "id": "1.2.1",
              "label": "Artrópodes",
              "value": "artropodes",
              "description": "Inclui insetos, aracnídeos, crustáceos",
              "level": 3,
              "parentId": "1.2",
              "expanded": true,
              "visible": true,
              "children": [
                {
                  "id": "1.2.1.1",
                  "label": "Insetos",
                  "value": "insetos",
                  "description": "Maior classe de animais",
                  "level": 4,
                  "parentId": "1.2.1",
                  "visible": true
                },
                {
                  "id": "1.2.1.2",
                  "label": "Aracnídeos",
                  "value": "aracnideos",
                  "description": "Inclui aranhas e escorpiões",
                  "level": 4,
                  "parentId": "1.2.1",
                  "visible": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "2",
      "label": "Reino Vegetal",
      "value": "vegetal",
      "description": "Seres vivos do reino vegetal",
      "level": 1,
      "expanded": true,
      "visible": true,
      "children": [
        {
          "id": "2.1",
          "label": "Angiospermas",
          "value": "angiospermas",
          "description": "Plantas com flores e frutos",
          "level": 2,
          "parentId": "2",
          "expanded": true,
          "visible": true,
          "children": [
            {
              "id": "2.1.1",
              "label": "Dicotiledôneas",
              "value": "dicotiledoneas",
              "description": "Plantas com dois cotilédones",
              "level": 3,
              "parentId": "2.1",
              "expanded": true,
              "visible": true,
              "children": [
                {
                  "id": "2.1.1.1",
                  "label": "Rosáceas",
                  "value": "rosaceas",
                  "description": "Inclui rosas, maçãs, morangos",
                  "level": 4,
                  "parentId": "2.1.1",
                  "visible": true
                }
              ]
            },
            {
              "id": "2.1.2",
              "label": "Monocotiledôneas",
              "value": "monocotiledoneas",
              "description": "Plantas com um cotilédone",
              "level": 3,
              "parentId": "2.1",
              "expanded": true,
              "visible": true,
              "children": [
                {
                  "id": "2.1.2.1",
                  "label": "Gramíneas",
                  "value": "gramineas",
                  "description": "Inclui trigo, arroz, milho",
                  "level": 4,
                  "parentId": "2.1.2",
                  "visible": true
                }
              ]
            }
          ]
        },
        {
          "id": "2.2",
          "label": "Gimnospermas",
          "value": "gimnospermas",
          "description": "Plantas com sementes não protegidas por frutos",
          "level": 2,
          "parentId": "2",
          "expanded": true,
          "visible": true,
          "children": [
            {
              "id": "2.2.1",
              "label": "Coníferas",
              "value": "coniferas",
              "description": "Inclui pinheiros e sequoias",
              "level": 3,
              "parentId": "2.2",
              "visible": true
            }
          ]
        }
      ]
    },
    {
      "id": "3",
      "label": "Reino Mineral",
      "value": "mineral",
      "description": "Materiais inorgânicos",
      "level": 1,
      "expanded": true,
      "visible": true,
      "children": [
        {
          "id": "3.1",
          "label": "Rochas",
          "value": "rochas",
          "description": "Agregados de minerais",
          "level": 2,
          "parentId": "3",
          "expanded": true,
          "visible": true,
          "children": [
            {
              "id": "3.1.1",
              "label": "Ígneas",
              "value": "igneas",
              "description": "Formadas pelo resfriamento do magma",
              "level": 3,
              "parentId": "3.1",
              "visible": true
            },
            {
              "id": "3.1.2",
              "label": "Sedimentares",
              "value": "sedimentares",
              "description": "Formadas por acúmulo de sedimentos",
              "level": 3,
              "parentId": "3.1",
              "visible": true
            }
          ]
        },
        {
          "id": "3.2",
          "label": "Minerais",
          "value": "minerais",
          "description": "Substâncias naturais sólidas",
          "level": 2,
          "parentId": "3",
          "expanded": true,
          "visible": true,
          "children": [
            {
              "id": "3.2.1",
              "label": "Metálicos",
              "value": "metalicos",
              "description": "Minerais com propriedades metálicas",
              "level": 3,
              "parentId": "3.2",
              "visible": true
            },
            {
              "id": "3.2.2",
              "label": "Não-metálicos",
              "value": "nao-metalicos",
              "description": "Minerais sem propriedades metálicas",
              "level": 3,
              "parentId": "3.2",
              "visible": true
            }
          ]
        }
      ]
    },
    {
      "id": "4",
      "label": "Tecnologia",
      "value": "tecnologia",
      "description": "Produtos e sistemas tecnológicos",
      "level": 1,
      "expanded": true,
      "visible": true,
      "children": [
        {
          "id": "4.1",
          "label": "Eletrônicos",
          "value": "eletronicos",
          "description": "Dispositivos eletrônicos",
          "level": 2,
          "parentId": "4",
          "expanded": true,
          "visible": true,
          "children": [
            {
              "id": "4.1.1",
              "label": "Computadores",
              "value": "computadores",
              "description": "Máquinas de processamento de dados",
              "level": 3,
              "parentId": "4.1",
              "expanded": true,
              "visible": true,
              "children": [
                {
                  "id": "4.1.1.1",
                  "label": "Notebooks",
                  "value": "notebooks",
                  "description": "Computadores portáteis",
                  "level": 4,
                  "parentId": "4.1.1",
                  "visible": true
                },
                {
                  "id": "4.1.1.2",
                  "label": "Desktops",
                  "value": "desktops",
                  "description": "Computadores de mesa",
                  "level": 4,
                  "parentId": "4.1.1",
                  "visible": true
                }
              ]
            },
            {
              "id": "4.1.2",
              "label": "Smartphones",
              "value": "smartphones",
              "description": "Telefones inteligentes",
              "level": 3,
              "parentId": "4.1",
              "visible": true
            }
          ]
        },
        {
          "id": "4.2",
          "label": "Software",
          "value": "software",
          "description": "Programas e aplicativos",
          "level": 2,
          "parentId": "4",
          "expanded": true,
          "visible": true,
          "children": [
            {
              "id": "4.2.1",
              "label": "Sistemas Operacionais",
              "value": "sistemas-operacionais",
              "description": "Software básico do computador",
              "level": 3,
              "parentId": "4.2",
              "visible": true
            },
            {
              "id": "4.2.2",
              "label": "Aplicativos",
              "value": "aplicativos",
              "description": "Programas para usuários finais",
              "level": 3,
              "parentId": "4.2",
              "visible": true
            }
          ]
        }
      ]
    }
  ];

  mockData: TreeNode[] = [
  {
    id: '1',
    label: 'Animais',
    value: 'animais',
    description: 'Categoria de animais',
    level: 1,
    expanded: true,
    visible: true,
    children: [
      {
        id: '1.1',
        label: 'Mamíferos',
        value: 'mamiferos',
        description: 'Animais com pelos e que amamentam',
        level: 2,
        parentId: '1',
        expanded: true,
        visible: true,
        children: [
          {
            id: '1.1.1',
            label: 'Cachorro',
            value: 'cachorro',
            description: 'Amigo do homem',
            level: 3,
            parentId: '1.1',
            visible: true
          },
          {
            id: '1.1.2',
            label: 'Gato',
            value: 'gato',
            description: 'Animal doméstico independente',
            level: 3,
            parentId: '1.1',
            visible: true
          }
        ]
      },
      {
        id: '1.2',
        label: 'Aves',
        value: 'aves',
        description: 'Animais com penas',
        level: 2,
        parentId: '1',
        expanded: true,
        visible: true,
        children: [
          {
            id: '1.2.1',
            label: 'Papagaio',
            value: 'papagaio',
            description: 'Ave falante',
            level: 3,
            parentId: '1.2',
            visible: true
          },
          {
            id: '1.2.2',
            label: 'Pombo',
            value: 'pombo',
            description: 'Ave urbana comum',
            level: 3,
            parentId: '1.2',
            visible: true
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'Plantas',
    value: 'plantas',
    description: 'Categoria de plantas',
    level: 1,
    expanded: true,
    visible: true,
    children: [
      {
        id: '2.1',
        label: 'Árvores',
        value: 'arvores',
        description: 'Plantas de grande porte',
        level: 2,
        parentId: '2',
        expanded: true,
        visible: true,
        children: [
          {
            id: '2.1.1',
            label: 'Carvalho',
            value: 'carvalho',
            description: 'Árvore forte e resistente',
            level: 3,
            parentId: '2.1',
            visible: true
          },
          {
            id: '2.1.2',
            label: 'Ipê',
            value: 'ipe',
            description: 'Árvore com flores vistosas',
            level: 3,
            parentId: '2.1',
            visible: true
          }
        ]
      }
    ]
  }
];


  displayNodes: TreeNode[] = [];
  totalNodes = 0;
  maxLevel = 0;
  currentExpandedLevel = 0;

  // Filter properties
  searchText = '';
  filterByLevel: number = 0;
  filterByParent: string | null = null;

  private destroy$ = new Subject<void>();

 private deepCloneNode(node: TreeNode): TreeNode {
  return {
    ...node,
    children: node.children ? node.children.map(child => this.deepCloneNode(child)) : []
  };
}



  constructor(
    private treeViewService: TreeViewService,
    private tabs: ModuleTabsService
  ) {}

  ngOnInit(): void {
    this.tabs.initModule('/admin/categories', 'Categoria', 'an-fill an-list');

    this.treeViewService. setNodesPreservingState(this.data);

    this.treeViewService.filteredNodes$
      .pipe(takeUntil(this.destroy$))
      .subscribe(nodes => {
        this.displayNodes = nodes;
      });

    this.treeViewService.nodes$
      .pipe(takeUntil(this.destroy$))
      .subscribe(nodes => {
        this.totalNodes = this.flattenAllNodes(nodes).length;
      });

    this.treeViewService.maxLevel$
      .pipe(takeUntil(this.destroy$))
      .subscribe(level => {
        this.maxLevel = level;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleNode(nodeId: string): void {
    this.treeViewService.toggleNode(nodeId);
  }

  expandToLevel(level: number): void {
    this.currentExpandedLevel = level;
    this.treeViewService.expandToLevel(level);
  }

  closeAll(): void {
    this.currentExpandedLevel = 0;
    this.treeViewService.expandToLevel(0);
  }

  onFilterChange(): void {
    const filterOptions: FilterOptions = {
      searchText: this.searchText,
      filterByLevel: this.filterByLevel && this.filterByLevel > 0 ? this.filterByLevel : undefined,
      filterByParent: this.filterByParent || undefined
    };
    this.treeViewService.setFilter(filterOptions);
    console.log(this.filterByLevel);
    console.log(this.filterByParent);
  }

  clearFilters(): void {
    this.searchText = '';
    this.filterByLevel = 0;
    this.filterByParent = null;
    this.onFilterChange();
  }

  hasActiveFilters(): boolean {
    return !!(this.searchText || this.filterByLevel || this.filterByParent);
  }

  getLevels(): number[] {
    return Array.from({ length: this.maxLevel }, (_, i) => i + 1);
  }

  getParentNodes(): TreeNode[] {
    return this.flattenAllNodes(this.data).filter(node => node.children && node.children.length > 0);
  }

  getIndentArray(level: number): number[] {
    return Array.from({ length: level }, (_, i) => i);
  }

  hasChildren(node: TreeNode): boolean {
    return !!(node.children && node.children.length > 0);
  }

  trackByNodeId(index: number, node: TreeNode): string {
    return node.id;
  }

  private flattenAllNodes(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = [];
    const traverse = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        result.push(node);
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(nodes);
    return result;
  }

  removeNodeById(nodes: TreeNode[], nodeId: string): boolean {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      nodes.splice(i, 1);
      return true;
    }
    if (this.removeNodeById(nodes[i].children ?? [], nodeId)) {
      return true;
    }
  }
  return false;
}

findNodeById(nodes: TreeNode[], id: string | undefined): TreeNode | undefined {
  if (!id) return undefined;
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = this.findNodeById(node.children ?? [], id);
    if (found) return found;
  }
  return undefined;
}

insertAsSibling(parent: TreeNode | undefined, target: TreeNode, newNode: TreeNode) {
  const siblings = parent?.children ?? this.data;
  const index = siblings.findIndex(n => n.id === target.id);
  if (index >= 0) {
    siblings.splice(index + 1, 0, newNode); // insere depois do target
  } else {
    siblings.push(newNode); // fallback
  }
}


onDrop(event: CdkDragDrop<TreeNode[]>) {
  const movedNode = event.item.data as TreeNode;
  const targetNode = this.displayNodes[event.currentIndex];

  if (!movedNode || !targetNode || movedNode.id === targetNode.id) return;

  // Clonar antes de remover
  const cloneNode = this.deepCloneNode(movedNode);
  this.removeNodeById(this.data, movedNode.id);

  // ⚠️ lógica de decisão
  if (targetNode.level < movedNode.level) {
    // subir nível → colocar como irmão do pai
    const newParent = this.findNodeById(this.data, targetNode.parentId);
    cloneNode.parentId = newParent?.id ?? undefined;
    cloneNode.level = targetNode.level;
    this.insertAsSibling(newParent, targetNode, cloneNode);
  } else if (targetNode.level === movedNode.level) {
    // mesma hierarquia → movimentação lateral
    const parent = this.findNodeById(this.data, targetNode.parentId);
    cloneNode.parentId = parent?.id ?? undefined;
    cloneNode.level = targetNode.level;
    this.insertAsSibling(parent, targetNode, cloneNode);
  } else {
    // caiu num nível mais profundo → vira filho
    targetNode.expanded = true;
    cloneNode.parentId = targetNode.id;
    cloneNode.level = targetNode.level + 1;
    (targetNode.children ??= []).push(cloneNode);
  }

  this.treeViewService. setNodesPreservingState(this.data);
}
}
