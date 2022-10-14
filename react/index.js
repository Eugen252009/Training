import React from "react";
import ReactDOM from "react-dom";

const today = new Date();
const year = today.getFullYear();

ReactDOM.render(
  <div>
    <p>Created by Eugen Lupricht</p>
    <p>Copyright {year}</p>
  </div>,
  document.getElementById("root")
);
