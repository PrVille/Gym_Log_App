import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from './reducers/exerciseReducer';
import workoutReducer from './reducers/workoutReducer';
import setReducer from './reducers/setReducer';
import plannedSetReducer from './reducers/plannedSetReducer';
import plannedWorkoutReducer from './reducers/plannedWorkoutReducer';
import routineReducer from './reducers/routineReducer';

const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    workouts: workoutReducer,
    plannedWorkouts: plannedWorkoutReducer,
    sets: setReducer,
    plannedSets: plannedSetReducer,
    routines: routineReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
});

export default store;
