import { useEffect, useMemo, useState } from "react";

/**
 * ✅ Pure component:
 * Same JSX for the same input props.
 */
function Recipe({ drinkers }) {
  const milkCups = useMemo(() => 0.5 * drinkers, [drinkers]);
  return (
    <ol className="card">
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea.</li>
      <li>Add {milkCups} cups of milk.</li>
    </ol>
  );
}

/**
 * ❌ Impure component:
 * Mutates an external variable on every render (don’t do this).
 * (In StrictMode Dev, renders can happen twice, making this even more obvious.)
 */
let impureGuestCounter = 0;
function ImpureCup() {
  impureGuestCounter += 1; // ❌ changes external, preexisting data
  return <div className="impure">Impure cup for guest #{impureGuestCounter}</div>;
}

/**
 * ✅ Pure component:
 * Data flows in through props. Rendering is predictable.
 */
function Cup({ guest }) {
  return <div className="pure">Pure cup for guest #{guest}</div>;
}

/**
 * ✅ Local mutation:
 * Mutating data created within the render is fine.
 * (Temporary arrays/objects made inside a component are safe.)
 */
function TeaGathering({ count = 3 }) {
  const cups = [];
  for (let i = 1; i <= count; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return <div className="stack">{cups}</div>;
}

/**
 * ✅ Side effects:
 * Belong in event handlers (and if needed, in useEffect after render).
 */
function ButtonWithEffect() {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    alert("Button clicked!"); // ✅ side effect in handler
    setClicked(true);
  }

  useEffect(() => {
    if (clicked) {
      console.log("Effect: component rendered after click.");
    }
  }, [clicked]);

  return (
    <button className="btn" onClick={handleClick}>
      Click me
    </button>
  );
}

/**
 * Demo: Controlled input to explore JSX determinism.
 */
function DrinkersController({ value, onChange }) {
  return (
    <div className="row">
      <label htmlFor="drinkers">Number of drinkers</label>
      <input
        id="drinkers"
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}

/**
 * Optional: Post-render logging tied to props/state changes.
 */
function RenderLogger({ drinkers }) {
  useEffect(() => {
    console.log(`[RenderLogger] drinkers changed to: ${drinkers}`);
  }, [drinkers]);

  return null;
}

export default function App() {
  const [drinkers, setDrinkers] = useState(2);

  return (
    <div className="page">
      <header className="header">
        <h1>☕ Tea Party Planner</h1>
        <p className="sub">React 19 — Keeping Components Pure</p>
      </header>

      <section className="section">
        <h2>1) Pure component</h2>
        <p className="muted">
          For the same <code>drinkers</code>, <strong>Recipe</strong> always
          renders the same list.
        </p>
        <DrinkersController value={drinkers} onChange={setDrinkers} />
        <Recipe drinkers={drinkers} />
        <RenderLogger drinkers={drinkers} />
      </section>

      <section className="section">
        <h2>2) Impure vs Pure</h2>
        <p className="muted">
          The impure version mutates a variable outside its render. The pure
          version receives data as props.
        </p>
        <div className="grid">
          <div className="card">
            <h3 className="bad">Impure</h3>
            <ImpureCup />
            <ImpureCup />
            <ImpureCup />
          </div>
          <div className="card">
            <h3 className="good">Pure</h3>
            <Cup guest={1} />
            <Cup guest={2} />
            <Cup guest={3} />
          </div>
        </div>
      </section>

      <section className="section">
        <h2>3) Local mutation (safe)</h2>
        <p className="muted">
          Temporary arrays/objects created inside a component can be mutated
          during render—they don’t affect the outside world.
        </p>
        <TeaGathering count={3} />
      </section>

      <section className="section">
        <h2>4) Side effects belong outside of render</h2>
        <p className="muted">
          Use event handlers (and <code>useEffect</code> if necessary) to do
          things like alerts, logs, data fetching, or DOM interactions.
        </p>
        <ButtonWithEffect />
      </section>

      <footer className="footer">
        <span>Made for exploring JSX and purity concepts.</span>
      </footer>
    </div>
  );
}