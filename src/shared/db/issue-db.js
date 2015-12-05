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
        db.addCollection('repos', () => {
          db.addCollection('issues', () => {
            callback();
          });
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

  findAll(user, repo, callback) {
    db.issues.find({
      user: user,
      repo: repo
    }).fetch(callback);
  }

  count() {
    return db.issues.count;
  }

  saveRepo(repos) {
    repos.forEach((elm) => {
      elm['_id'] = elm.id;
    });
    db.repos.upsert(repos);
  }

  findAllRepos(callback) {
    db.repos.find().fetch(callback);
  }
}

const issueDb = new IssueDb();
export default issueDb;
