import { WorkoutActions } from "../utils/Actions";
import { Workout } from "../utils/Types";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Delete from "../assets/delete.svg";

interface WorkoutDetailsProps {
  key: string;
  workout: Workout;
}

const WorkoutDetails = (props: WorkoutDetailsProps) => {
  const { workout } = props;
  const { dispatch } = useWorkoutsContext();

  const handleOnDeleteClick = async () => {
    const response = await fetch(
      "http://localhost:5000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: WorkoutActions.DELETE_WORKOUT, payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h1>{workout.title}</h1>
      <p>
        <strong>ID:</strong> {workout._id}
      </p>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt.toLocaleString()), {
          addSuffix: true,
        })}
      </p>
      <span onClick={handleOnDeleteClick}>
        <img src={Delete} alt="Delete" width={20} height={20} />
      </span>
    </div>
  );
};

export default WorkoutDetails;
