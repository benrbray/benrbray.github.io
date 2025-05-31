# `benrbray.github.io`

## Local Setup

* Astro VSCode extension
* Make sure `vscode` is configured to use the workspace version of TypeScript.  Compiler plugins like `typescript-plugin-css-modules` depend on it.

## Fetching from the GitHub Package Registry

Some of my posts use content loaded from public packages hosted in the GitHub Package Registry.  This registry requires authentication, so you must add the following `.npmrc` file to your project, replacing `YOUR_TOKEN_HERE` with a Personal Access Token (Classic) having `read:packages` permission.

```
@benrbray:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
```

Ideally, I would include this `.npmrc` in the repository itself and the secret token would be stored in a `.env` file, but this is not supported by `npm`.  Instead, `.npmrc` is listed in `.gitignore` and must be added manually whenever the repository is cloned.