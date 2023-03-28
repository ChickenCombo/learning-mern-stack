import { Workout } from "../utils/Types";

interface WorkoutDetailsProps {
  key: string;
  workout: Workout;
}

const WorkoutDetails = (props: WorkoutDetailsProps) => {
  const { workout } = props;

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
      <p>{workout.createdAt.toLocaleString()}</p>
    </div>
  );
};

export default WorkoutDetails;
