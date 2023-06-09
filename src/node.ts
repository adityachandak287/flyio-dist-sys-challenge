import { randomUUID } from 'crypto';
import { OutputType, PayloadType } from './constants';
import { output } from './output';
import {
  BroadcastPayload,
  EchoPayload,
  GeneratePayload,
  InitPayload,
  ReadPayload,
  TopologyPayload,
} from './types/payload';

export class Node {
  messageId: number = 0;
  nodeId: string = '';
  neighbours: string[] = [];
  broadcastValues: Set<number> = new Set();

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

  broadcast(payload: BroadcastPayload): void {
    const broadcastMessage = payload.body.message;
    const isNewValue = !this.broadcastValues.has(broadcastMessage);
    if (isNewValue) {
      this.broadcastValues.add(broadcastMessage);
    }

    // Check for msg_id to be present as we do not want to responsd to broadcast messages from other nodes
    if (payload.body.msg_id) {
      output({
        src: this.nodeId || payload.dest,
        dest: payload.src,
        body: {
          type: OutputType.BROADCAST_OK,
          in_reply_to: payload.body.msg_id,
        },
      });
    }

    if (isNewValue) {
      for (const neighbour of this.neighbours) {
        output({
          src: this.nodeId,
          dest: neighbour,
          body: {
            type: PayloadType.BROADCAST,
            message: broadcastMessage,
          },
        });
      }
    }
  }

  read(payload: ReadPayload): void {
    output({
      src: this.nodeId || payload.dest,
      dest: payload.src,
      body: {
        type: OutputType.READ_OK,
        in_reply_to: payload.body.msg_id,
        messages: [...this.broadcastValues.values()],
      },
    });
  }

  topology(payload: TopologyPayload): void {
    this.neighbours = payload.body.topology[this.nodeId] || [];

    output({
      src: this.nodeId || payload.dest,
      dest: payload.src,
      body: {
        type: OutputType.TOPOLOGY_OK,
        in_reply_to: payload.body.msg_id,
      },
    });
  }
}
