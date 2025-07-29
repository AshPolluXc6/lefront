import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TreeNode, FilterOptions } from './tree-node.intercafe';
import { TreeViewService } from './tree-view.service';


@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent implements OnInit, OnDestroy {
  @Input() data: TreeNode[] = [
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

  constructor(private treeViewService: TreeViewService) {}

  ngOnInit(): void {
    this.treeViewService.setNodes(this.data);

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
}
