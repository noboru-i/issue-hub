import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import AppDispatcher from '../dispatcher/app-dispatcher';

class IssueStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      issue: Immutable.fromJS({}),
      edited: false
    });
  }

  reduce(state, action) {
    switch(action.type) {
    case 'issue/init':
      return state.set('issue', Immutable.fromJS(action.value));

    case 'issue/start-edit':
      return state
        .setIn(['issue', 'edited_body'], action.value)
        .set('edited', true);

    case 'issue/update-complete':
      return state.set('edited', false)
          .set('issue', Immutable.fromJS(action.value));

    default:
      return state;
    }
  }
}

const instance = new IssueStore(AppDispatcher);
export default instance;
