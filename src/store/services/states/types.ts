export interface IStateGroup {
  id: string;
  name: string;
  key?: string;
  description?: string | null;
}

export interface IStateItem {
  id: string;
  name: string;
  key: string;
  description?: string | null;
  group: string;
}

export interface CreateGroupPayload {
  name: string;
  key: string;
  description?: string;
}



export interface CreateStatePayload {
  name: string;
  key: string;
  description?: string;
  group: string;
}
