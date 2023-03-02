import axios from "axios";

const BACKEND_URL = "https://workout-app-ed4c7-default-rtdb.firebaseio.com";

export async function storeUser(user) {
    const res = await axios.put(BACKEND_URL + `/users/${user.uid}.json`, user);
  }

// ADD WORKOUT
export async function addWorkout(workout, workoutId, uid) {
  const res = await axios.put(BACKEND_URL + `/users/${uid}/workouts/${workoutId}.json`, workout)
}