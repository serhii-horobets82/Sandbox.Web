// Describe user chat info
export interface ChatInfo {
  id: string;
  user: string;
  messages?: Array<string>;
}

export interface ChatState {
  chatInfo?: ChatInfo;
  status?: string;
  isError: boolean;
  isLoading: boolean;
}
