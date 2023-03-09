import axios from "axios";

const BACKEND_URL = "https://workout-app-ed4c7-default-rtdb.firebaseio.com";

export async function storeUser(user) {
  const res = await axios.put(BACKEND_URL + `/users/${user.uid}.json`, user);
}

//FETCH WORKOUTS
export async function fetchDatabaseWorkouts(uid) {
  const res = await axios.get(BACKEND_URL + `/users/${uid}/workouts.json`);
  const workouts = [];
  for (const key in res.data) {
    const workoutObj = {
      _id: key,
      createdAt: res.data[key].createdAt,
      desc: res.data[key].desc,
      title: res.data[key].title,
      exercises: res.data[key].exercises,
    };
    workouts.push(workoutObj);
  }
  return workouts;
}

// ADD WORKOUT
export async function addDatabaseWorkout(workout, workoutId, uid) {
  const res = await axios.put(
    BACKEND_URL + `/users/${uid}/workouts/${workoutId}.json`,
    workout
  );
}

//UPDATE WORKOUT
export async function updateDatabaseWorkout(workout, workoutId, uid) {
  return await axios.put(
    BACKEND_URL + `/users/${uid}/workouts/${workoutId}.json`,
    workout
  );
}

//DELETE WORKOUT
export async function deleteDatabaseWorkout(workoutId, uid) {
  return await axios.delete(
    BACKEND_URL + `/users/${uid}/workouts/${workoutId}.json`
  );
}

//FETCH FAVORITES
export async function fetchDatabaseFavorites(uid) {
  const res = await axios.get(BACKEND_URL + `/users/${uid}/favWorkouts.json`);
  const favWorkouts = [];
  for (const key in res.data) {
    const favId = key;
    favWorkouts.push(favId);
  }
  return favWorkouts;
}

//ADD FAVORITE
export async function addDatabaseFavorite(workoutId, uid, favToAdd) {
  await axios.put(
    BACKEND_URL + `/users/${uid}/favWorkouts/${workoutId}.json`,
    favToAdd
  );
}

//DELETE FAVORITE
export async function deleteDatabaseFavorite(workoutId, uid) {
  return await axios.delete(
    BACKEND_URL + `/users/${uid}/favWorkouts/${workoutId}.json`
  );
}

//COMPLETE WORKOUT
export async function completeDatabaseWorkout(
  uid,
  completedWorkoutId,
  completedWorkout
) {
  await axios.put(
    BACKEND_URL + `/users/${uid}/completedWorkouts/${completedWorkoutId}.json`,
    completedWorkout
  );
}

//FETCH COMPLETED WORKOUTS
export async function fetchCompletedWorkouts(uid) {
  const res = await axios.get(BACKEND_URL + `/users/${uid}/completedWorkouts.json`);
  const completedWorkouts = [];
  for (const key in res.data) {
    const workoutObj = {
      id: key,
      createdAt: res.data[key].createdAt,
      duration: res.data[key].duration,
      workoutId: res.data[key].workoutId,
      sets: res.data[key].sets
    };
    completedWorkouts.push(workoutObj);
  }
  return completedWorkouts;
}