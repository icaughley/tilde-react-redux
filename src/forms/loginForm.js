import MobxReactForm from "mobx-react-form";
import validatorjs from "validatorjs";

import {login} from "../actions/authActions";

const plugins = {dvr: validatorjs};

const fields = [{
    name: 'username',
    label: 'Username',
    rules: 'required|string'
}, {
    name: 'password',
    label: 'Password',
    rules: 'required|string'
}];

const hooks = {
    onSuccess(form) {
        login( form.values().username, form.values().password );
    },
    onError(form) {
        alert('Form has errors!');
    }
};

export default new MobxReactForm({fields}, {plugins, hooks});