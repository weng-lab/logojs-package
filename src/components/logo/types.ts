export interface Symbol {
  component: React.ComponentType;
  regex: string;
  color: string | string[];
}

export type Alphabet = Symbol[];
