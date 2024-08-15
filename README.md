# webpack-template

This repository is a template for front-end projects using webpack.

Run the following to install the dependencies:

```console
npm install
```

Run the following to remove any unneeded dependencies:

```console
npm uninstall dependency-name
```

replacing dependency-name with the name of the dependency

The following scripts are also included in the package.json file

```console
npm start
```

Starts the development server and runs the code

```console
npm run build
```

Creates the production build

```console
npm run deploy
```

Does a subtree push of the dist folder to the gh-pages branch.
Note, in order to commit changes to the dist folder, it will need to be removed
from the .gitignore file.
