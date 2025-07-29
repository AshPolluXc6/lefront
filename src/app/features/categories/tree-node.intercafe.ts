export interface TreeNode {
  id: string;
  label: string;
  value: string;
  description: string;
  level: number;
  parentId?: string;
  children?: TreeNode[];
  expanded?: boolean;
  visible?: boolean;
  matchesFilter?: boolean;
}

export interface FilterOptions {
  searchText: string;
  filterByLevel?: number;
  filterByParent?: string;
}