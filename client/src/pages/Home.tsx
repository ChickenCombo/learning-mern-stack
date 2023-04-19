import { useEffect } from "react";
import { Workout } from "../utils/Types";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutActions } from "../utils/Actions";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:5000/api/workouts", {
        headers: {
          "Authorization": `Bearer ${user?.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: WorkoutActions.SET_WORKOUTS, payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        <h1>Workout List</h1>
        {workouts &&
          workouts.map((workout: Workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
