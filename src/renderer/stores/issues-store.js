import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../dispatcher/app-dispatcher';

class IssuesStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case 'issues/fetch-complete':
        return action.value;
      default:
        return state;
    }
  }
}

const instance = new IssuesStore(AppDispatcher);
export default instance;
