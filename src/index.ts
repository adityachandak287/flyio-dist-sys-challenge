import { PayloadType } from './constants';
import { Node } from './node';
import {
  BasePayload,
  BroadcastPayload,
  EchoPayload,
  GeneratePayload,
  InitPayload,
  ReadPayload,
  TopologyPayload,
} from './types/payload';

console.error('Node started!');

const node = new Node();

process.stdin.on('data', (data) => {
  try {
    const input = data.toString().trim();

    if (!input) {
      console.error('Empty input', input);
      return;
    }

    for (const inputLine of input.split('\n')) {
      console.error('[INPUT]', inputLine);
      const payload = JSON.parse(inputLine) as BasePayload;

      switch (payload.body.type) {
        case PayloadType.INIT:
          node.init(payload as InitPayload);
          break;
        case PayloadType.ECHO:
          node.echo(payload as EchoPayload);
          break;
        case PayloadType.GENERATE:
          node.generate(payload as GeneratePayload);
          break;
        case PayloadType.BROADCAST:
          node.broadcast(payload as BroadcastPayload);
          break;
        case PayloadType.READ:
          node.read(payload as ReadPayload);
          break;
        case PayloadType.TOPOLOGY:
          node.topology(payload as TopologyPayload);
          break;
        default:
          console.error('Invalid payload type', payload.body.type);
      }
    }
  } catch (err) {
    console.error('Something went wrong', err);
  }
});
