import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import AppDispatcher from '../dispatcher/app-dispatcher';

class ReposStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap({
      repos: []
    });
  }

  reduce(state, action) {
    switch(action.type) {
    case 'repos/fetch-complete':
      return state.set('repos', action.value);
    default:
      return state;
    }
  }
}

const instance = new ReposStore(AppDispatcher);
export default instance;
