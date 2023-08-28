export declare namespace TreeView {
  export interface ITreeNode {
    name: string,
    id?: string,
    expanded?: boolean,
    selected?: boolean,
    children?: ITreeNode[]
  }
}
