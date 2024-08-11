/**
 * Client Hook JS
 * 
 * A lightweight library for managing global state and effects in JavaScript applications.
 * 
 * **Features:**
 * - **Global State Management**: Define and manage global state variables using `useState()`.
 * - **Reactive Effects**: Register and handle side effects based on changes to state variables with `useEffect()`.
 * 
 * **Usage:**
 * - **`useState(name, value)`**: Creates a global state variable with a specified name and initial value. Allows for retrieval and update of state from anywhere in your code.
 * - **`useEffect(callback, variables)`**: Registers a callback to be executed whenever any of the specified state variables change. The callback is invoked immediately with the current values of these variables and is triggered on subsequent updates.
 * 
 * This library provides a simple and effective way to handle state management and reactive programming in your JavaScript applications, similar to React hooks but with a global scope.
 *
 */

const clientHooks = {};

function callbackHandler(name) {

    const newValue = clientHooks[name].value;

    document.querySelectorAll(`[client-hook="${name}"]`).forEach(element => {

        if (!['INPUT', 'TEXTAREA'].includes(element.tagName)) {
            element.innerHTML = newValue;
            return;
        }

        switch (element.type) {
            case 'checkbox':
            case 'radio':
                element.checked = Boolean(newValue);
                break;
            default:
                element.value = newValue;
                break;
        }

    });

    clientHooks[name].callbacks.forEach(callback => {
        callback(newValue);
    });
}

/**
 * Custom hook to create and manage a global state with a specified name.
 *
 * This function allows you to define a global state variable that can be accessed and updated anywhere in your code.
 * It also ensures that the state name is unique and handles errors if the name is already used or if the type is incorrect.
 *
 * @param {string} [name=''] - The name associated with the state. This should be a unique string identifier for the state.
 * @param {*} [value=null] - The initial value of the state. Can be any type (string, number, object, array, etc.).
 *
 * @throws {Error} Throws an error if the provided name is not a string or if the name is already defined.
 * 
 */
export function useState(name = '', value = null) {

    try {

        if (typeof name !== 'string') throw new Error(`Invalid state name: Expected a string but received a ${typeof name}.`);
        if (typeof window[name] !== 'undefined') throw new Error(`'${name}' is already defined on your code, Kindly use another name.`);

        clientHooks[name] = {
            value: value,
            callbacks: []
        }

        Object.defineProperty(window, name, {
            get: function () {
                return value;
            },
            set: function (_value) {
                value = _value;
                clientHooks[name].value = value;
                callbackHandler(name);
            }
        });

        if (value !== null) callbackHandler(name);

    } catch (e) {
        console.error('Error in useState:', e.message);
    }

}

/**
 * Custom hook to execute a callback function in response to changes in specified state variables.
 *
 * This function registers a callback to be called when any of the provided state variables change.
 * The callback is invoked immediately with the current values of the state variables, and
 * will be triggered again whenever any of these state variables are updated.
 *
 * @param {Function} callback - The function to execute when the state variables change. This function receives the current values of the state variables as arguments.
 * @param {Object} [variables={}] - An object where keys are state names and values are their current values. The callback will be registered to listen for changes in these state variables.
 *
 * @throws {Error} Throws an error if the provided `callback` is not a function or if any of the specified state variables are not defined in `useState`.
 *
 */
export function useEffect(callback, variables = {}) {
    try {

        if (typeof callback !== 'function') throw new Error(`Invalid argument: Expected a function but received a ${typeof callback}.`);

        if (Object.keys(variables).length < 1) return callback();

        Object.entries(variables).forEach(([key, value]) => {
            if (!clientHooks[key]) throw new Error(`'${key}' is not defined in useState.`);
            clientHooks[key].callbacks.push(callback);
            callback(value);
        });

    } catch (e) {
        console.error('Error in useEffect:', e.message);
    }
}
