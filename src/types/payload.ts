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
