import { useEffect } from "react";
import { Workout } from "../utils/Types";
import { useWorkoutsContext } from "../components/hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutActions } from "../utils/Actions";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:5000/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: WorkoutActions.SET_WORKOUTS, payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div>
      <div className="workouts">
        <WorkoutForm />
        <h1>Workout List</h1>
        {workouts &&
          workouts.map((workout: Workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
};

export default Home;
