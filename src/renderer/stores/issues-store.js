import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import AppDispatcher from '../dispatcher/app-dispatcher';

class IssuesStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap({
      issues: [],
      selectedIssue: {}
    });
  }

  reduce(state, action) {
    switch(action.type) {
      case 'issues/fetch-complete':
        return state.set('issues', action.value);
      case 'issue/select':
        return state.set('selectedIssue', action.value);
      default:
        return state;
    }
  }
}

const instance = new IssuesStore(AppDispatcher);
export default instance;
