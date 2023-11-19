import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage as useLocalStorageExercise } from "../exercise/04";
import { useLocalStorage as useLocalStorageSolution} from "../solution/04.extra-1";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

describe("Exercise 04 - Bonus 1", () => {
  test("works with objects", () => {
    const value = { test: 1 };
    const { result } = renderHook(() => useLocalStorage("test", value));
    const [state, setState] = result.current;
    expect(state).toMatchObject(value);
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(value));

    const newValue = { test2: 2 };

    act(() => {
      setState(newValue);
    });

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "test",
      JSON.stringify(newValue)
    );
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(newValue));
    expect(result.current[0]).toMatchObject(newValue);
  });

  test("works with arrays", () => {
    const value = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage("test", value));
    const [state, setState] = result.current;
    expect(state).toMatchObject(value);
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(value));

    const newValue = ["4", "5", "6"];

    act(() => {
      setState(newValue);
    });

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "test",
      JSON.stringify(newValue)
    );
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(newValue));
    expect(result.current[0]).toMatchObject(newValue);
  });
});


import { useEffect, useState } from "react";

function getLocalStorageValue(key) {
  const storedValue = localStorage.getItem(key);
  try {
    return JSON.parse(storedValue);
  } catch {}
  return storedValue;
}

function setLocalStorageValue(key, value) {
  const valueToStore = JSON.stringify(value);
  localStorage.setItem(key, valueToStore);
}

export function useLocalStorage(key, initialValue = null) {
  const storedValue = getLocalStorageValue(key);
  const [state, setState] = useState(storedValue || initialValue);

  useEffect(() => {
    setLocalStorageValue(key, state);
  }, [key, state]);

  return [state, setState];
}

export default function App() {
  return (
    <div>
      <h2>useLocalStorage can save string</h2>
      <Form />
      <hr />
      <h2>useLocalStorage can save objects (Bonus)</h2>
      <FormWithObject />
    </div>
  );
}

function Form() {
  const [name, setName] = useLocalStorage("_solution_2_username", "");
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Name:</label>
      <input value={name} onChange={e => setName(e.target.value)} />
      <h4>{name ? `Welcome, ${name}!` : "Enter your name"}</h4>
    </form>
  );
}

function FormWithObject() {
  const [formData, setFormData] = useLocalStorage("_solution_2_blog_post", {
    title: "",
    content: "",
  });

  function handleChange(e) {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Title:</label>
      <input name="title" value={formData.title} onChange={handleChange} />
      <label htmlFor="name">Content:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
    </form>
  );
}
