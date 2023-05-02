import { PayloadType } from '../constants';

export interface BasePayload {
  src: string;
  dest: string;
  body: {
    type: PayloadType;
    msg_id?: number;
    [key: string]: unknown;
  };
}

export interface InitPayload extends BasePayload {
  body: {
    type: PayloadType.INIT;
    msg_id: number;
    node_id: string;
    node_ids: string[];
  };
}

export interface EchoPayload extends BasePayload {
  body: {
    type: PayloadType.ECHO;
    msg_id: number;
    echo: string;
  };
}

export interface GeneratePayload extends BasePayload {
  body: {
    type: PayloadType.GENERATE;
    msg_id: number;
  };
}

export interface BroadcastPayload extends BasePayload {
  body: {
    type: PayloadType.BROADCAST;
    msg_id: number;
    message: number;
  };
}

export interface ReadPayload extends BasePayload {
  body: {
    type: PayloadType.READ;
    msg_id: number;
  };
}

export interface TopologyPayload extends BasePayload {
  body: {
    type: PayloadType.TOPOLOGY;
    msg_id: number;
    topology: Record<string, string[]>;
  };
}
