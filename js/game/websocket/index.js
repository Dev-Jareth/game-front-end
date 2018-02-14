import PubSub from 'pubsub-js';
import { print, printErr } from '../util';
import { baseSocketUrl } from '../config';
var ws;
export const connect = () => {
  ws = new WebSocket(baseSocketUrl);
  ws.onerror = () => printErr('WebSocket error');
  ws.onopen = () => print('WebSocket connection established');
  ws.onclose = () => print('WebSocket connection closed');
  ws.onmessage = handleMessage;
}

export const sendMessage = (k, v = false) => ws.send(JSON.stringify({
  [k]: v
}))

const handleMessage = message => {
  print("WS Message Received")
  try {
    let msg = JSON.parse(message.data);
    let type = Object.keys(msg)[0]
    let payload = msg[type];
    publish(type, payload)
    print(`WS Parsed Data ${type} with payload ${payload}`)
  } catch (e) {
    printErr("WS Failed to parse message")
  }
}
const publish = PubSub.publish;
export const subscribe = (key, callback) => PubSub.subscribe(key, (a, b) => callback(b));
export const unsubscribe = PubSub.unsubscribe;