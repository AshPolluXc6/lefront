import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeNode, FilterOptions } from './tree-node.intercafe';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {
  private _nodes = new BehaviorSubject<TreeNode[]>([]);
  private _filteredNodes = new BehaviorSubject<TreeNode[]>([]);
  private _maxLevel = new BehaviorSubject<number>(0);
  private _filterOptions = new BehaviorSubject<FilterOptions>({ searchText: '' });

  nodes$ = this._nodes.asObservable();
  filteredNodes$ = this._filteredNodes.asObservable();
  maxLevel$ = this._maxLevel.asObservable();
  filterOptions$ = this._filterOptions.asObservable();

  setNodes(nodes: TreeNode[]): void {
    const processedNodes = this.processNodes(nodes);
    this._nodes.next(processedNodes);
    this._maxLevel.next(this.calculateMaxLevel(processedNodes));
    this.applyFilters();
  }

  private processNodes(nodes: TreeNode[], level: number = 1, parentId?: string): TreeNode[] {
    return nodes.map(node => ({
      ...node,
      level,
      parentId,
      expanded: false,
      visible: true,
      children: node.children ? this.processNodes(node.children, level + 1, node.id) : []
    }));
  }

  private calculateMaxLevel(nodes: TreeNode[]): number {
    let maxLevel = 0;
    const traverse = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        maxLevel = Math.max(maxLevel, node.level);
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(nodes);
    return maxLevel;
  }

  toggleNode(nodeId: string): void {
    const nodes = this._nodes.value;
    this.toggleNodeRecursive(nodes, nodeId);
    this._nodes.next([...nodes]);
    this.applyFilters();
  }

  private toggleNodeRecursive(nodes: TreeNode[], nodeId: string): boolean {
    for (const node of nodes) {
      if (node.id === nodeId) {
        node.expanded = !node.expanded;
        return true;
      }
      if (node.children && this.toggleNodeRecursive(node.children, nodeId)) {
        return true;
      }
    }
    return false;
  }

  expandToLevel(level: number): void {
    const nodes = this._nodes.value;
    this.expandNodesRecursive(nodes, level);
    this._nodes.next([...nodes]);
    this.applyFilters();
  }

  private expandNodesRecursive(nodes: TreeNode[], targetLevel: number): void {
    nodes.forEach(node => {
      if (node.level <= targetLevel) {
        node.expanded = true;
      } else {
        node.expanded = false;
      }
      if (node.children) {
        this.expandNodesRecursive(node.children, targetLevel);
      }
    });
  }

  setFilter(filterOptions: FilterOptions): void {
    this._filterOptions.next(filterOptions);
    this.applyFilters();

    if (filterOptions.filterByLevel) {
        this.expandToLevel(filterOptions.filterByLevel);
    }
  }

  private applyFilters(): void {
    const nodes = this._nodes.value;
    const filterOptions = this._filterOptions.value;
    
    if (!filterOptions.searchText && !filterOptions.filterByLevel && !filterOptions.filterByParent) {
      this._filteredNodes.next(this.flattenVisibleNodes(nodes));
      return;
    }

    let filteredNodes = this.flattenAllNodes(nodes);

    // Filter by level
    if (filterOptions.filterByLevel) {
        const level = filterOptions.filterByLevel;
        const allNodes = this.flattenAllNodes(nodes);
        
        const levelNodes = allNodes.filter(node => node.level === level);
        const levelNodeIds = new Set(levelNodes.map(n => n.id));
        const parentNodeIds = new Set(levelNodes.map(n => n.parentId).filter(Boolean));

        filteredNodes = allNodes.filter(n =>
            levelNodeIds.has(n.id) || parentNodeIds.has(n.id)
        );
    }

    // Filter by parent (includes all children)
    if (filterOptions.filterByParent) {
      const parentAndChildren = this.getParentAndAllChildren(nodes, filterOptions.filterByParent);
      filteredNodes = filteredNodes.filter(node => 
        parentAndChildren.some(pcNode => pcNode.id === node.id)
      );
    }

    // Filter by search text
    if (filterOptions.searchText) {
      const searchText = filterOptions.searchText.toLowerCase();
      filteredNodes = filteredNodes.filter(node =>
        node.label.toLowerCase().includes(searchText) ||
        node.value.toLowerCase().includes(searchText) ||
        node.description.toLowerCase().includes(searchText)
      );
    }

    this._filteredNodes.next(filteredNodes);
  }

  private getParentAndAllChildren(nodes: TreeNode[], parentId: string): TreeNode[] {
    const result: TreeNode[] = [];

    const findParentAndChildren = (nodeList: TreeNode[]): boolean => {
      for (const node of nodeList) {
        if (node.id === parentId) {
          result.push(node);
          this.collectAllChildren(node, result);
          return true;
        }
        if (node.children && findParentAndChildren(node.children)) {
          return true;
        }
      }
      return false;
    };

    findParentAndChildren(nodes);
    return result;
  }

  private collectAllChildren(node: TreeNode, result: TreeNode[]): void {
    if (node.children) {
      node.children.forEach(child => {
        result.push(child);
        this.collectAllChildren(child, result);
      });
    }
  }

  private flattenVisibleNodes(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = [];
    
    const traverse = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        result.push(node);
        if (node.expanded && node.children) {
          traverse(node.children);
        }
      });
    };

    traverse(nodes);
    return result;
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