import axios from "axios";
import qs from "qs";

import errorStore from "../stores/errorStore";

export default function callServer(verb, url, data, handler) {
    axios[verb](url, data ? qs.stringify(data) : null)
        .then(response => {
            errorStore.errorText = null;
            handler(response.data);
        })
        .catch(err => {
                errorStore.errorText = err.data ? err.data.statusText : "Error contacting server";
            }
        );
}