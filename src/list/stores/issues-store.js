import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import AppDispatcher from '../dispatcher/app-dispatcher';
import issueDb from '../../shared/db/issue-db';

class IssuesStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap({
      issues: Immutable.List(),
      selectedIssue: {}
    });
  }

  reduce(state, action) {
    switch(action.type) {
    case 'issues/fetch-complete':
      return state.set('issues', Immutable.List(action.value));
    case 'issue/select':
      return state.set('selectedIssue', action.value);
    case 'issue/add':
      let issues = state.get('issues');
      const new_id = -1 * Math.floor( Math.random() * 10000 );
      const issue = {
        _id: new_id,
        id: new_id,
        user: issues.get(0).user,
        repo: issues.get(0).repo
      };
      issueDb.save(issue);
      issues = issues.unshift(issue);
      console.log(issues);
      return state.set('issues', issues);
    default:
      return state;
    }
  }
}

const instance = new IssuesStore(AppDispatcher);
export default instance;
