export interface GlobalState {
  version: string;
  drawer?: boolean;
  color?: string;
  image?: string;
  chat?: any;
}

export interface ModuleInfo {
  moduleId: string;
  actions?: Array<string>;
}

export interface ModuleState {
  status?: string;
  isError: boolean;
  isLoading: boolean;
}
