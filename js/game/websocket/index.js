import PubSub from 'pubsub-js';
import axios from 'axios';
import player from '../player';
import { print, printErr } from '../util';
import { baseSocketUrl, socket } from '../config';
import config from '../../config';
const req = config.url.requestSocketMessageTypes;
var ws;
export const connect = async () => {
  if (!socket.messages) await getMessageTypes()
  ws = new WebSocket(baseSocketUrl);
  ws.onerror = () => printErr('WebSocket error');
  ws.onopen = () => print('WebSocket connection established');
  ws.onclose = () => print('WebSocket connection closed');
  ws.onmessage = handleMessage;
}
export const getMessageTypes = async () => {
  const handle = f => (v => f(v.data));
  await axios[req.method](req.path, { headers: { token: player.userData.authenticationKey } })
  .then(handle(socket.setMessages))
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
