import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { WorkoutActions } from "../utils/Actions";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState<string | null>(null);
  const [load, setLoad] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [emptyFields, setEmptyFields] = useState<Array<string>>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to add a workout.')
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      console.log("Workout added: ", json);
      setEmptyFields([]);
      setTitle(null);
      setLoad(null);
      setReps(null);

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
          className={emptyFields.includes("title") ? "error" : ""}
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
          className={emptyFields.includes("load") ? "error" : ""}
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
          className={emptyFields.includes("reps") ? "error" : ""}
        />
      </div>
      <button type="submit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
