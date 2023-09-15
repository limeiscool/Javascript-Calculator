import React from "react";
import { ACTIONS } from "../App";

function Num0({ dispatch, num, id }) {
  return (
    <button
      id={id}
      className="span2"
      onClick={() => dispatch({ type: ACTIONS.ADD_NUM, pack: { num } })}
    >
      {num}
    </button>
  );
}

export default Num0;
