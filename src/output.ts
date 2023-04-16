import { OutputType } from './constants';

export interface Output {
  src: string;
  dest: string;
  body: {
    type: OutputType;
    msg_id?: number;
    in_reply_to?: number;
    [key: string]: unknown;
  };
}

export const output = (response: Output): void => {
  const serializedOutput = JSON.stringify(response);
  console.error('[OUTPUT]', serializedOutput);
  console.log(serializedOutput);
};
