# angular1-template-loader
Loader for webpack that inlines all html in angular 1 components and routes. 

This is a backport of the [angular2-template-loader](https://github.com/TheLarkInn/angular2-template-loader)

### Quick Links
- [Installation](#installation)
- [Requirements](#requirements)
- [Example markup](#example-markup)
- [How does it work](#how-does-it-work)

### Installation
Install the webpack loader from [npm](https://www.npmjs.com/package/angular1-template-loader).
- `npm install angular1-template-loader --save-dev`

Chain the `angular1-template-loader` to your currently used typescript loader.

```js
loaders: ['awesome-typescript-loader', 'angular1-template-loader'],
```

### Requirements
To be able to use the template loader you must have a loader registered, which can handle `.html` files.

### Example Markup
Here is an example markup of the `webpack.config.js`, which chains the `angular1-template-loader` to the `babel-loader`

```js
module: {
  rules: [
    {
        test: /\.js$/,
        use: [
            {
                loader: 'babel-loader',
                options: { presets: ['env'] }
            },
            {
                loader: 'angular1-template-loader'
            }
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.html$/,
        loader: 'html-loader'
    },
  ]
}
```

### How does it work
The `angular1-template-loader` searches for `templateUrl`  declarations inside of the Angular 1 Component and route metadata and replaces the paths with the corresponding `require` statement.

The generated `require` statements will be handled by the given loader for `.html` and `.js` files.
