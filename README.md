# Client Hook JS

Welcome to **Client Hook JS**! 🎉

## Overview

**Client Hook JS** is a lightweight library designed for managing global state and reactive effects in JavaScript applications. It’s a tool I created primarily for learning purposes and to use in my personal projects. The library provides a simple way to manage global state and handle side effects, akin to React hooks but with a global scope.

## Features

- **Global State Management**: Define and manage global state variables with the `useState()` function.
- **Reactive Effects**: Register and handle side effects based on state changes using the `useEffect()` function.

## Installation

To use **Client Hook JS** in your project, simply include the file `lib/*-min.js` or `lib/*-app.js` in your project directory and import it into your JavaScript files.

## Usage

### `useState(name, value)`

Creates a global state variable with a specified name and initial value. Allows retrieval and updating of the state from anywhere in your code.

### `useEffect(callback, variables)`

Registers a callback function to be executed whenever any of the specified state variables change. The callback is called immediately with the current values of these variables and is triggered on subsequent updates.

### Automatic `HTML Updates`

If you declare the client-hook attribute on an HTML element, such as:

```html
<h1 client-hook="count"></h1>
```

When the value of the count state variable changes, the `<h1>` tag will automatically update to reflect the new value of count. This provides a simple way to bind HTML elements to global state without needing additional code to manually update the DOM.

## Example

Here’s a quick example of how you might use Client Hook JS:

![Client Hooks JS](https://raw.githubusercontent.com/cttricks/client-hooks-js/main/screenshot.png)


## Contributing
Since this library was created primarily for my own learning and personal projects, it is provided as-is. However, I encourage like-minded developers to explore, use, and modify this library as they see fit.

If you find any issues, have suggestions for improvements, or would like to add new features, please feel free to:

- **Open an Issue:** Describe the problem or feature request. Your feedback helps in identifying areas for improvement.
- **Submit a Pull Request:** If you have a fix or enhancement, submit a pull request. Contributions are welcome and greatly appreciated!

## License
Client Hook JS is provided under the MIT License. Use it at your own risk, and please make sure to review the code to ensure it fits your needs.

## Contact
If you have any questions or need further assistance, don’t hesitate to reach out. Let’s build something amazing together!

Happy coding! 🚀
