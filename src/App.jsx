import { useReducer } from "react";
import "./App.css";
import Num from "./components/Num";
import Num0 from "./components/Num0";
import Op from "./components/Op";

export const ACTIONS = {
  ADD_NUM: "add-num",
  CHOOSE_OP: "choose-op",
  CLEAR: "clear",
  DEL_NUM: "del-num",
  EVAL: "eval",
};

function reducer(state, { type, pack }) {
  switch (type) {
    case ACTIONS.ADD_NUM:
      if (state.overwrite) {
        return {
          ...state,
          current: pack.num,
          overwrite: false,
        };
      }
      if (state.current === "-" && pack.num === ".") return state;
      if (pack.num === "0" && state.current === "0") return state;
      if (pack.num === "0" && state.current == null) return state;
      if (pack.num === "." && state.current == null)
        return {
          ...state,
          current: `0${pack.num}`,
        };
      if (pack.num === "." && state.current.includes(".")) return state;

      return {
        ...state,
        current: `${state.current || ""}${pack.num}`,
      };
      break;
    case ACTIONS.CHOOSE_OP:
      if (
        state.last == null &&
        state.operator == null &&
        state.current == null
      ) {
        if (pack.op === "-")
          return {
            ...state,
            last: null,
            operator: null,
            current: pack.op,
          };
        if (pack.op === "+")
          return {
            ...state,
            last: "0",
            operator: pack.op,
            current: null,
          };
        return state;
      }

      if (
        state.last == null &&
        state.current === "0" &&
        state.operator == null
      ) {
        if (pack.op === "+" || pack.op === "-")
          return {
            ...state,
            last: state.current,
            operator: pack.op,
            current: null,
          };
        return state;
      }

      if (state.last == null && state.operator == null) {
        if (state.current === "-") return state;
        return {
          ...state,
          operator: pack.op,
          last: state.current,
          current: null,
        };
      }

      if (state.current == null) {
        if (pack.op === "-")
          return {
            ...state,
            current: pack.op,
          };
        return {
          ...state,
          last: state.last,
          operator: pack.op,
          current: null,
        };
      }

      if (state.current === "-") {
        if (pack.op === "-") return state;
        return {
          ...state,
          last: state.last,
          operator: pack.op,
          current: null,
        };
      }

      return {
        ...state,
        last: calc(state),
        operator: pack.op,
        current: null,
      };
      break;
    case ACTIONS.CLEAR:
      return { current: "0" };
      break;
    case ACTIONS.EVAL:
      if (state.last == null || state.current == null) {
        return state;
      }
      return {
        ...state,
        operator: null,
        last: null,
        current: calc(state),
        overwrite: true,
      };
      break;
    case ACTIONS.DEL_NUM:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          current: null,
        };
      }
      if (state.current == null) return state;
      if (state.current.length === 1) {
        return {
          ...state,
          current: null,
        };
      }
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
  }
}

const calc = ({ current, last, operator }) => {
  const prev = parseFloat(last);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return "";
  let result = "";
  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
  }
  return result.toString();
};

const FORMAT = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatNum = (number) => {
  if (number == null) return;
  const [integer, decimal] = number.split(".");
  if (decimal == null) return FORMAT.format(number);
  return `${FORMAT.format(integer)}.${decimal}`;
};

function App() {
  const [{ current, last, operator }, dispatch] = useReducer(reducer, {
    current: "0",
  });
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="last-op">
          {formatNum(last)} {operator}
        </div>
        {current === "-" ? (
          <div id="display" className="current-op">
            {current}
          </div>
        ) : (
          <div id="display" className="current-op">
            {formatNum(current)}
          </div>
        )}
      </div>
      <button
        id="clear"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        className="span2"
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DEL_NUM })}>DEL</button>
      <Op id="divide" op="/" dispatch={dispatch} />
      <Num id="seven" num="7" dispatch={dispatch} />
      <Num id="eight" num="8" dispatch={dispatch} />
      <Num id="nine" num="9" dispatch={dispatch} />
      <Op id="multiply" op="*" dispatch={dispatch} />
      <Num id="four" num="4" dispatch={dispatch} />
      <Num id="five" num="5" dispatch={dispatch} />
      <Num id="six" num="6" dispatch={dispatch} />
      <Op id="subtract" op="-" dispatch={dispatch} />
      <Num id="one" num="1" dispatch={dispatch} />
      <Num id="two" num="2" dispatch={dispatch} />
      <Num id="three" num="3" dispatch={dispatch} />
      <Op id="add" op="+" dispatch={dispatch} />
      <Num0 id="zero" num="0" dispatch={dispatch} />
      <Num id="decimal" num="." dispatch={dispatch} />
      <button
        className="bigBtn"
        id="equals"
        onClick={() => dispatch({ type: ACTIONS.EVAL })}
      >
        =
      </button>
    </div>
  );
}

export default App;
