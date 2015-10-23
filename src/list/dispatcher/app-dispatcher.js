import {Dispatcher} from 'flux';

const instance = new Dispatcher();
export default instance;

// to use `import {dispatch} from './app-dispatcher';`
export const dispatch = instance.dispatch.bind(instance);
