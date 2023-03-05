class Workout {
  constructor(_createdAt, _id, title, desc, exercises) {
    this._createdAt = _createdAt;
    this._id = _id;
    this.title = title;
    this.desc = desc;
    this.exercises = exercises;
  }
}

const date = new Date().getTime();

