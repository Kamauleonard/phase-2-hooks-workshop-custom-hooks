import { renderHook, act } from "@testing-library/react-hooks";
import { useDocumentTitle as useDocumentTitleExercise  } from "../exercise/01";
import { useDocumentTitle as useDocumentTitleSolution  } from "../solution/01.extra-1";

describe("Exercise 01 - Extra Credit 1", () => {
  test("is exported as a named export", () => {
    try {
      expect(typeof useDocumentTitle).toBe("function");
    } catch (e) {
      throw new Error("Make sure to export your hook!");
    }
  });

  test("sets the document title to the value passed in", () => {
    const title = "test title";
    renderHook(() => useDocumentTitle(title));
    act(() => {
      expect(document.title).toBe(title);
    });
  });
});

import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function Home() {
  useDocumentTitle("testing");

  return (
    <div>
      <h1>Home Page</h1>
      <p>
        To see the title change in the browser tab, click the 'Open in new tab'
        link above
      </p>
    </div>
  );
}

export default Home;
