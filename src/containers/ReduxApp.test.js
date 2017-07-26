import React from "react";
import ReactDOM from "react-dom";
import ReduxApp from "./ReduxApp";

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReduxApp />, div);
});
