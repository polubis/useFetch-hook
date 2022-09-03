import { ChangePassword, Register } from "containers";
import { Tabs } from "ui";
import { Fragment, useState } from "react";

import css from "./App.module.scss";

const EXAMPLES = ["Register", "Change password"];

function App() {
  const [activeExample, setActiveExample] = useState(EXAMPLES[0]);

  return (
    <div className={css.layout}>
      <Tabs
        className={css.tabs}
        active={activeExample}
        onClick={setActiveExample}
      >
        {EXAMPLES.map((example) => (
          <Fragment key={example}>{example}</Fragment>
        ))}
      </Tabs>

      {activeExample === EXAMPLES[0] && <Register />}
      {activeExample === EXAMPLES[1] && <ChangePassword />}
    </div>
  );
}

export default App;
