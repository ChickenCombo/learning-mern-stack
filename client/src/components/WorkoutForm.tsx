import { useState } from "react";
import { useWorkoutsContext } from "./hooks/useWorkoutsContext";
import { WorkoutActions } from "../utils/Actions";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState<string>("");
  const [load, setLoad] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [error, setError] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      console.log("Workout added: ", json);
      setTitle("");
      setLoad(0);
      setReps(0);

      dispatch({ type: WorkoutActions.CREATE_WORKOUTS, payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <div>
        <label>Exercise Title:</label>
        <input
          type="text"
          value={title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </div>
      <div>
        <label>Load (kg):</label>
        <input
          type="number"
          value={load || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoad(+e.target.value)
          }
        />
      </div>
      <div>
        <label>Reps:</label>
        <input
          type="number"
          value={reps || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setReps(+e.target.value)
          }
        />
      </div>
      <button type="submit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
