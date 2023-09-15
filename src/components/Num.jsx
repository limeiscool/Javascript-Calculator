import React from "react";
import { ACTIONS } from "../App";
function Num({ dispatch, num, id }) {
  return (
    <button
      id={id}
      onClick={() => dispatch({ type: ACTIONS.ADD_NUM, pack: { num } })}
    >
      {num}
    </button>
  );
}

export default Num;
