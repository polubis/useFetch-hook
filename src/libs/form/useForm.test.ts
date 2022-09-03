import { renderHook } from "@testing-library/react";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";
import { Subscription } from "rxjs";
import { useForm } from "./useForm";

describe("useForm()", () => {
  describe("after mount", () => {
    it("returns keys from values", () => {
      const VALUES = { username: "" };
      const { result } = renderHook(() => useForm(VALUES));

      expect(result.current.keys).toEqual(Object.keys(VALUES));
    });

    it("returns init values", () => {
      const VALUES = { username: "" };
      const { result } = renderHook(() => useForm(VALUES));

      expect(result.current.values).toEqual(VALUES);
    });

    it("validates", () => {
      const MESSAGE = "This field is required";
      const VALUES = { username: "" };
      const { result } = renderHook(() =>
        useForm(VALUES, {
          username: [(value) => (value === "" ? MESSAGE : "")],
        })
      );

      expect(result.current.errors).toEqual({ username: MESSAGE });
      expect(result.current.invalid).toBeTruthy();
      expect(result.current.validCount).toBe(0);
      expect(result.current.progress).toBe(0);
      expect(result.current.invalidCount).toBe(1);
      expect(result.current.valid).toBeFalsy();
    });

    it("sets interaction metadata", () => {
      const VALUES = { username: "" };
      const { result } = renderHook(() => useForm(VALUES));

      expect(result.current.touched).toBeFalsy();
      expect(result.current.untouched).toBeTruthy();
      expect(result.current.confirmed).toBeFalsy();
      expect(result.current.unconfirmed).toBeTruthy();
    });
  });

  describe("during validation", () => {
    it("injects value and values to validator function", () => {
      const USERNAME = "user1994";
      const VALUES = { username: "", password: "" };
      const spy = jest.fn();
      const { result } = renderHook(() => useForm(VALUES, { username: [spy] }));

      act(() => {
        result.current.set("username", USERNAME);
      });

      expect(spy).toHaveBeenCalledWith(USERNAME, {
        username: USERNAME,
        password: "",
      });
    });
  });

  describe("set()", () => {
    it("sets values", () => {
      const USERNAME = "user1994";
      const VALUES = { username: "", password: "" };
      const { result } = renderHook(() => useForm(VALUES));

      act(() => {
        result.current.set("username", USERNAME);
      });

      expect(result.current.values).toEqual({
        username: USERNAME,
        password: "",
      });
    });

    it("validates", () => {
      const MESSAGE = "This field is required";
      const VALUES = { username: "user1994", password: "" };
      const { result } = renderHook(() =>
        useForm(VALUES, {
          username: [(value) => (value === "" ? MESSAGE : "")],
        })
      );

      act(() => {
        result.current.set("username", "");
      });

      expect(result.current.invalid).toBeTruthy();
      expect(result.current.valid).toBeFalsy();
      expect(result.current.validCount).toBe(1);
      expect(result.current.progress).toBe(50);
      expect(result.current.invalidCount).toBe(1);
      expect(result.current.errors).toEqual({
        username: MESSAGE,
        password: "",
      });
    });

    it("updates metadata", () => {
      const VALUES = { username: "" };
      const { result } = renderHook(() => useForm(VALUES));

      act(() => {
        result.current.set("username", "d");
      });

      expect(result.current.confirmed).toBeFalsy();
      expect(result.current.unconfirmed).toBeTruthy();
      expect(result.current.touched).toBeTruthy();
      expect(result.current.untouched).toBeFalsy();
    });
  });

  describe("confirm()", () => {
    it("validates", () => {
      const MESSAGE = "This field is required";
      const VALUES = { username: "user1994", password: "" };
      const { result } = renderHook(() =>
        useForm(VALUES, {
          username: [(value) => (value === "" ? MESSAGE : "")],
        })
      );

      act(() => {
        result.current.set("username", "");
        result.current.confirm();
      });

      expect(result.current.invalid).toBeTruthy();
      expect(result.current.valid).toBeFalsy();
      expect(result.current.validCount).toBe(1);
      expect(result.current.progress).toBe(50);
      expect(result.current.invalidCount).toBe(1);
      expect(result.current.errors).toEqual({
        username: MESSAGE,
        password: "",
      });
    });

    it("updates metadata", () => {
      const VALUES = { username: "" };
      const { result } = renderHook(() => useForm(VALUES));

      act(() => {
        result.current.confirm();
      });

      expect(result.current.confirmed).toBeTruthy();
      expect(result.current.unconfirmed).toBeFalsy();
    });
  });

  describe("submit()", () => {
    it("validates", () => {
      const MESSAGE = "This field is required";
      const VALUES = { username: "user1994", password: "" };
      const { result } = renderHook(() =>
        useForm(VALUES, {
          username: [(value) => (value === "" ? MESSAGE : "")],
        })
      );

      act(() => {
        result.current.set("username", "");
        result.current.submit({ preventDefault: () => {} });
      });

      expect(result.current.invalid).toBeTruthy();
      expect(result.current.valid).toBeFalsy();
      expect(result.current.validCount).toBe(1);
      expect(result.current.progress).toBe(50);
      expect(result.current.invalidCount).toBe(1);
      expect(result.current.errors).toEqual({
        username: MESSAGE,
        password: "",
      });
    });

    it("updates metadata", () => {
      const VALUES = { username: "" };
      const { result } = renderHook(() => useForm(VALUES));

      act(() => {
        result.current.submit({ preventDefault: () => {} });
      });

      expect(result.current.confirmed).toBeTruthy();
      expect(result.current.unconfirmed).toBeFalsy();
    });

    it("prevents default", () => {
      const preventDefault = jest.fn();
      const VALUES = { username: "" };
      const { result } = renderHook(() => useForm(VALUES));

      act(() => {
        result.current.submit({ preventDefault });
      });

      expect(preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe("change()", () => {
    it("sets values", () => {
      const USERNAME = "user1994";
      const VALUES = { username: "", password: "" };
      const { result } = renderHook(() => useForm(VALUES));

      act(() => {
        result.current.change({
          target: { value: USERNAME, name: "username" },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values).toEqual({
        username: USERNAME,
        password: "",
      });
    });

    it("validates", () => {
      const MESSAGE = "This field is required";
      const VALUES = { username: "user1994", password: "" };
      const { result } = renderHook(() =>
        useForm(VALUES, {
          username: [(value) => (value === "" ? MESSAGE : "")],
        })
      );

      act(() => {
        result.current.change({
          target: { value: "", name: "username" },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.invalid).toBeTruthy();
      expect(result.current.valid).toBeFalsy();
      expect(result.current.validCount).toBe(1);
      expect(result.current.progress).toBe(50);
      expect(result.current.invalidCount).toBe(1);
      expect(result.current.errors).toEqual({
        username: MESSAGE,
        password: "",
      });
    });

    it("updates metadata", () => {
      const VALUES = { username: "" };
      const { result } = renderHook(() => useForm(VALUES));

      act(() => {
        result.current.change({
          target: { value: "d", name: "username" },
        } as ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.confirmed).toBeFalsy();
      expect(result.current.unconfirmed).toBeTruthy();
      expect(result.current.touched).toBeTruthy();
      expect(result.current.untouched).toBeFalsy();
    });

    describe("skips update and", () => {
      const testChangeWithError = (
        message: string,
        event: ChangeEvent<HTMLInputElement>
      ): void => {
        const VALUES = { username: "" };
        const { result } = renderHook(() => useForm(VALUES));

        act(() => {
          result.current.change(event);
        });

        expect(console.error).toHaveBeenCalledWith(message);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(result.current.values.username).toBe("");
      };

      beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it("logs an error when lack of name property", () => {
        testChangeWithError("Lack of name property in input element", {
          target: { value: "test" },
        } as ChangeEvent<HTMLInputElement>);
      });

      it("logs an error with property is different than declared on init", () => {
        testChangeWithError(
          "Unsupported property used as name attribute in input element",
          {
            target: { value: "test", name: "other" },
          } as ChangeEvent<HTMLInputElement>
        );
      });

      it("logs an error when runtime types differs", () => {
        testChangeWithError(
          "Unsupported change detected. You trying to change non string property with string value",
          {
            target: { value: 5 as any, name: "username" },
          } as ChangeEvent<HTMLInputElement>
        );
      });
    });
  });

  describe("reset()", () => {
    it("resets state to initial", () => {
      const VALUES = { username: "", password: "" };
      const { result } = renderHook(() =>
        useForm(VALUES, {
          username: [(value) => (value === "jacob1994" ? "Invalid" : "")],
        })
      );

      act(() => {
        result.current.set("username", "jacob1994");
        result.current.set("password", "example");
        result.current.reset();
      });

      expect(result.current.invalid).toBeFalsy();
      expect(result.current.valid).toBeTruthy();
      expect(result.current.touched).toBeFalsy();
      expect(result.current.untouched).toBeTruthy();
      expect(result.current.values).toEqual(VALUES);
      expect(result.current.errors).toEqual({ username: "", password: "" });
    });
  });

  describe("on()", () => {
    let sub: Subscription;

    it("allows to listen for dedicated properties change", () => {
      const VALUES = { username: "", password: "" };
      const { result } = renderHook(() => useForm(VALUES));

      const fn = jest.fn();

      sub = result.current.on("username").subscribe(fn);

      act(() => {
        result.current.set("username", "jacob");
        result.current.set("username", "jaco");
        result.current.set("username", "jac");
        result.current.set("password", "jac");
      });

      expect(fn).toHaveBeenCalledTimes(3);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(fn).toHaveBeenCalledWith({
        key: "username",
        value: "jacob",
      });
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(fn).toHaveBeenCalledWith({
        key: "username",
        value: "jaco",
      });
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(fn).toHaveBeenCalledWith({
        key: "username",
        value: "jac",
      });
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(fn).not.toHaveBeenCalledWith({
        key: "password",
        value: "jac",
      });
    });

    afterAll(() => {
      sub.unsubscribe();
    });
  });
});
