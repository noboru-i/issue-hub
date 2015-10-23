import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import AppDispatcher from '../dispatcher/app-dispatcher';

class IssueStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap({
      issue: [],
      edited: false
    });
  }

  reduce(state, action) {
    switch(action.type) {
    default:
      return state;
    }
  }
}

const instance = new IssueStore(AppDispatcher);
export default instance;
