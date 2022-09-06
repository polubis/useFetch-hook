import { renderHook, act, waitFor } from "@testing-library/react";
import { Done, Fail, Idle, Pending, State, useFetch } from "utils";

describe("useFetch()", () => {
  interface ExampleModel {
    id: string;
    name: string;
  }

  const EXAMPLE_DATA: ExampleModel = {
    id: "0",
    name: "Name",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("assigns initial state to init type", () => {
    const { result } = renderHook(() => useFetch<ExampleModel>());
    expect(result.current[0]).toEqual({ type: "idle" } as Idle);
  });

  it("injects signal to promise function", async () => {
    const fn = jest
      .fn()
      .mockImplementation(() => Promise.resolve(EXAMPLE_DATA));
    const { result } = renderHook(() => useFetch<ExampleModel>());

    act(() => {
      result.current[1](fn);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(new AbortController().signal);
    });
  });

  it("aborts pending request", async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, "abort");

    const { result } = renderHook(() => useFetch<ExampleModel>());

    expect(result.current[0]).toEqual({ type: "idle" } as Idle);

    act(() => {
      result.current[1](
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(EXAMPLE_DATA);
            }, 1500);
          })
      );
      result.current[1](() => Promise.resolve(EXAMPLE_DATA));
    });

    expect(result.current[0]).toEqual({ type: "pending" } as Pending);

    await waitFor(() => {
      expect(abortSpy).toHaveBeenCalledTimes(1);
    });

    expect(result.current[0]).toEqual({ type: "pending" } as Pending);
  });

  it("allows to abort request manually", async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, "abort");

    const { result } = renderHook(() => useFetch<ExampleModel>());

    expect(result.current[0]).toEqual({ type: "idle" } as Idle);

    act(() => {
      result.current[1](
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(EXAMPLE_DATA);
            }, 1500);
          })
      );
      result.current[2]();
    });

    expect(result.current[0]).toEqual({ type: "pending" } as Pending);

    await waitFor(() => {
      expect(abortSpy).toHaveBeenCalledTimes(1);
    });

    expect(result.current[0]).toEqual({ type: "pending" } as Pending);
  });

  describe("on failure scenario", () => {
    it("changes state based on promise status", async () => {
      const ERROR = new Error("Error");
      const { result } = renderHook(() => useFetch<ExampleModel>());

      expect(result.current[0]).toEqual({
        type: "idle",
      } as State<ExampleModel>);

      act(() => {
        result.current[1](() => Promise.reject(ERROR));
      });

      await waitFor(() => {
        expect(result.current[0]).toEqual({
          type: "fail",
          error: ERROR,
        } as Fail);
      });
    });
  });

  describe("on success scenario", () => {
    it("changes state based on promise status", async () => {
      const { result } = renderHook(() => useFetch<ExampleModel>());

      expect(result.current[0]).toEqual({
        type: "idle",
      } as State<ExampleModel>);

      act(() => {
        result.current[1](() => Promise.resolve(EXAMPLE_DATA));
      });

      expect(result.current[0]).toEqual({
        type: "pending",
      } as Pending);

      await waitFor(() => {
        expect(result.current[0]).toEqual({
          type: "done",
          data: EXAMPLE_DATA,
        } as Done<ExampleModel>);
      });
    });
  });
});
