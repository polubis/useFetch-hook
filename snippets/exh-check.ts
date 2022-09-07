interface Idle {
  // Nothing happens.
  type: "idle";
}

interface Pending {
  // Process in progress.
  type: "pending";
}

interface Done<T> {
  // Process finished - all ok.
  type: "done";
  data: T;
}

interface Fail {
  // Process finished - something went wrong.
  type: "fail";
  error: unknown;
}

// Exhaustiveness checking requires union 
// of types and shared property "type" to work.
type State<T> = Idle | Pending | Done<T> | Fail;

const state = { type: "idle" } as State<{ id: number }>;

const Log = () => {
  // idle, pending, done, fail.
  if (state.type === "idle") {
    console.log(state.type);
    // console.log(state.data); Compilation error!
    return;
  }

  // pending, done, fail.
  if (state.type === "done") {
    console.log(state.type);
    console.log(state.data); // All ok!
    return;
  }

  // pending, fail.
  if (state.type === "fail") {
    console.log(state.type);
    console.log(state.error); // All ok!
    // console.log(state.data); Compilation error!
    return;
  }

  // Here it's automatically pending.
  console.log(state.type);
  return;
};

Log();
