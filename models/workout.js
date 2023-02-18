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

export const DUMMY_DATA = [
{
  _createdAt: date,
  _id: "e1",
  title: "Test",
  desc: "This is a test",
  exercises: [{
    id: "ex1",
    title: "Military Press",
    sets: [
      {
        number: "1",
        reps: "12",
        weight: "10",
      }
    ]
  }]
}
];
