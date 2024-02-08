# Local Plans Timetable

This repository is a component library publishing two components as part of the Local Plans Timetable private beta:

- **Timetable form:** Used by LPAs to produce timetable data for a local plan that meets the [data standard](https://digital-land.github.io/specification/specification/development-plan/)
- **Timetable visualisation:** A tool to visualise timetable data that follows the data standard

See the wiki [here](https://github.com/digital-land/local-plans-timetable/wiki).

## Deployment

Assuming a successful lint/test run, all commits to `main` will trigger a new deployment workflow run.

The Storybook for this library is deployed to GitHub Pages: https://digital-land.github.io/local-plans-timetable/

The visualisation component is distributed by the [Statically](https://statically.io/) CDN, with the built files living in the `master` branch. The files distributed by the CDN are cached for one day and are available here:

```
https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.js
https://cdn.statically.io/gh/digital-land/local-plans-timetable/master/timetable-visualisation.min.css
```

## Available Scripts

In the project directory, you can run:

### `npm run preview`

Shows a preview of the build locally.

### `npm run build`

Builds the library for production to the `dist` folder.

### `npm test`

Runs all unit tests

### `npm run storybook`

Starts Storybook. Open [http://localhost:6006](http://localhost:6006) to view it in your browser.

### `npm run build:storybook`

Builds Storybook to the `storybook-static` folder.

### `npm run build:cdn`

Builds the visualisation component for the CDN to the `dist-cdn` folder.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
