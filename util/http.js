import axios from "axios";

const BACKEND_URL = "https://workout-app-ed4c7-default-rtdb.firebaseio.com";

export async function storeUser(user) {
  const res = await axios.put(BACKEND_URL + `/users/${user.uid}.json`, user);
}

//FETCH WORKOUTS
export async function fetchDatabaseWorkouts(uid, accessToken) {
  const res = await axios.get(BACKEND_URL + `/users/${uid}/workouts.json?auth=${accessToken}`);
  const workouts = [];
  console.log(res.data)
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
export async function addDatabaseWorkout(workout, workoutId, uid, accessToken) {
  const res = await axios.put(
    BACKEND_URL + `/users/${uid}/workouts/${workoutId}.json?auth=${accessToken}`,
    workout
  );
}

//UPDATE WORKOUT
export async function updateDatabaseWorkout(workout, workoutId, uid, accessToken) {
  return await axios.put(
    BACKEND_URL + `/users/${uid}/workouts/${workoutId}.json?auth=${accessToken}`,
    workout
  );
}

//DELETE WORKOUT
export async function deleteDatabaseWorkout(workoutId, uid, accessToken) {
  return await axios.delete(
    BACKEND_URL + `/users/${uid}/workouts/${workoutId}.json?auth=${accessToken}`
  );
}

//FETCH FAVORITES
export async function fetchDatabaseFavorites(uid, accessToken) {
  const res = await axios.get(BACKEND_URL + `/users/${uid}/favWorkouts.json?auth=${accessToken}`);
  const favWorkouts = [];
  for (const key in res.data) {
    const favId = key;
    favWorkouts.push(favId);
  }
  return favWorkouts;
}

//ADD FAVORITE
export async function addDatabaseFavorite(workoutId, uid, favToAdd, accessToken) {
  await axios.put(
    BACKEND_URL + `/users/${uid}/favWorkouts/${workoutId}.json?auth=${accessToken}`,
    favToAdd
  );
}

//DELETE FAVORITE
export async function deleteDatabaseFavorite(workoutId, uid, accessToken) {
  return await axios.delete(
    BACKEND_URL + `/users/${uid}/favWorkouts/${workoutId}.json?auth=${accessToken}`
  );
}

//COMPLETE WORKOUT
export async function completeDatabaseWorkout(
  uid,
  completedWorkoutId,
  completedWorkout,
  accessToken
) {
  await axios.put(
    BACKEND_URL + `/users/${uid}/completedWorkouts/${completedWorkoutId}.json?auth=${accessToken}`,
    completedWorkout
  );
}

//FETCH COMPLETED WORKOUTS
export async function fetchCompletedWorkouts(uid, accessToken) {
  const res = await axios.get(BACKEND_URL + `/users/${uid}/completedWorkouts.json?auth=${accessToken}`);
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