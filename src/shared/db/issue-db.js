import minimongo from 'minimongo';

let db = new minimongo.IndexedDb(
  {namespace: 'issue-hub'},
  () => {
    db.addCollection('issues');
  },
  () => {
    alert('some error!');
  }
);

class IssueDb {
  constructor() {
    this.db = null;
  }

  initialize(callback) {
    this.db = new minimongo.IndexedDb(
      {namespace: 'issue-hub'},
      () => {
        db.addCollection('issues', () => {
          callback();
        });
      },
      () => {
        alert('some error!');
      }
    );
  }

  save(issue) {
    if (Array.isArray(issue)) {
      issue.forEach((elm) => {
        elm['_id'] = elm.id;
      });
    } else {
      issue['_id'] = issue.id;
    }
    db.issues.upsert(issue);
  }

  find(id, callback) {
    db.issues.findOne({_id: parseInt(id)}, callback);
  }

  findAll(callback) {
    db.issues.find({}).fetch(callback);
  }

  count() {
    return db.issues.count;
  }
}

const issueDb = new IssueDb();
export default issueDb;
