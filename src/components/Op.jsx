import React from "react";
import { ACTIONS } from "../App";

function Op({ dispatch, op, id }) {
  return (
    <button
      className="bigBtn"
      id={id}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OP, pack: { op } })}
    >
      {op}
    </button>
  );
}

export default Op;
