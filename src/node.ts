import { randomUUID } from 'crypto';
import { OutputType } from './constants';
import { output } from './output';
import { EchoPayload, GeneratePayload, InitPayload } from './types/payload';

export class Node {
  messageId: number = 0;
  nodeId: string = '';

  getMessageId(): number {
    return ++this.messageId;
  }

  init(payload: InitPayload): void {
    this.nodeId = payload.body.node_id;

    output({
      src: this.nodeId,
      dest: payload.src,
      body: {
        type: OutputType.INIT_OK,
        in_reply_to: payload.body.msg_id,
      },
    });
  }

  echo(payload: EchoPayload): void {
    output({
      src: this.nodeId || payload.dest,
      dest: payload.src,
      body: {
        type: OutputType.ECHO_OK,
        in_reply_to: payload.body.msg_id,
        msg_id: this.getMessageId(),
        echo: payload.body.echo,
      },
    });
  }

  generate(payload: GeneratePayload): void {
    output({
      src: this.nodeId || payload.dest,
      dest: payload.src,
      body: {
        type: OutputType.GENERATE_OK,
        in_reply_to: payload.body.msg_id,
        msg_id: this.getMessageId(),
        id: randomUUID(),
      },
    });
  }
}
