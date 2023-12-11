import mitt from 'mitt';

// 创建一个 Event 实例，这个实例将在整个应用中共享
const emitter = mitt();

export default emitter;