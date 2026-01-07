# React 19.2 - Lesson 8 - Keeping Components Pure

This Vite + React app demonstrates purity concepts by contrasting predictable render output with impure side effects, safe local mutation, and post-render effects.

## Features
- Pure rendering with deterministic JSX output based on props.
- Impure rendering example that mutates external state on each render.
- Safe local mutation inside a render for building temporary UI arrays.
- Side effects moved to event handlers and `useEffect`.
- Controlled input to explore how prop changes affect output.

## Code snippets

Pure component with derived data:
```jsx
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
```

Impure render (mutates outside state) vs pure render (props only):
```jsx
let impureGuestCounter = 0;
function ImpureCup() {
  impureGuestCounter += 1;
  return <div className="impure">Impure cup for guest #{impureGuestCounter}</div>;
}

function Cup({ guest }) {
  return <div className="pure">Pure cup for guest #{guest}</div>;
}
```

Side effects in handlers / `useEffect`:
```jsx
function ButtonWithEffect() {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    alert("Button clicked!");
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
```

## How to run
```bash
npm install
npm run dev
```
Then open the local URL printed in the terminal.

## File overview
- `index.html`: Single HTML entry point with the `#root` element.
- `package.json`: Project metadata, scripts, and React/Vite dependencies.
- `vite.config.js`: Vite configuration with the React plugin.
- `src/main.jsx`: App bootstrap; renders `<App />` inside `StrictMode`.
- `src/App.jsx`: Main UI and all lesson examples (pure/impure/local mutation/effects).
- `src/index.css`: Global styles for layout, colors, and component classes.
- `README.md`: Project summary, usage, and documentation (this file).
