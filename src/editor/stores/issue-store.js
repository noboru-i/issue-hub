import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import AppDispatcher from '../dispatcher/app-dispatcher';

class IssueStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap({
      issue: {},
      edited: false
    });
  }

  reduce(state, action) {
    switch(action.type) {
    case 'issue/init':
      return state.set('issue', action.value);

    case 'issue/start-edit':
      return state.set('edited', true);

    case 'issue/update-complete':
      return state.set('edited', false)
          .set('issue', action.value);

    default:
      return state;
    }
  }
}

const instance = new IssueStore(AppDispatcher);
export default instance;
