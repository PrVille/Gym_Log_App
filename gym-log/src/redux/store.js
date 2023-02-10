import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from './reducers/exerciseReducer';
import workoutReducer from './reducers/workoutReducer';
import setReducer from './reducers/setReducer';
import plannedSetReducer from './reducers/plannedSetReducer';
import plannedWorkoutReducer from './reducers/plannedWorkoutReducer';

const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    workouts: workoutReducer,
    plannedWorkouts: plannedWorkoutReducer,
    sets: setReducer,
    plannedSets: plannedSetReducer
  },
});

export default store;
