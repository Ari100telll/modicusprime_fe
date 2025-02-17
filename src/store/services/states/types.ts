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
  description?: string;
}

export interface CreateStatePayload {
  name: string;
  key: string;
  description?: string;
  group: string;
}

export interface Transition {
  id: string;
  from_state?: IStateItem;
  to_state: IStateItem;
  requires_signature: boolean;
}

export interface CreateTransitionPayload {
  from_state: string | null;
  to_state: string;
  requires_signature: boolean;
}