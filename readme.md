# typed-fs-paths

typed file system paths in your nodejs app

## Usage

### 1. define file structure model

```ts
const paths = typedFSPaths('app', {
  data: {
    app1: {
      ':dynamic-file': null,
      'settings.json': null,
      'tsconfig.json': null,
    },
    app2: {
      vendor: {
        'index.js': null,
        'index.html': null,
        'index.css': null,
      }
    },
    ':dynamic-folder': {
      'output.txt': null,
    },
  },
})
```

### 2. get file path based on the file system model

![type inferring 1](./imgs/1.png)
![type inferring 1](./imgs/2.png)
![type inferring 1](./imgs/3.png)

```ts
const settingsJson = paths.data.app1["settings.json"]
const tsconfig = paths.data.app1["tsconfig.json"]
const gitIgnore = paths.data.app1[":file"]('.gitignore')
const app1 = paths.data.app1["/"]
```


## Benefits of typed-fs-paths
- typed querying of your file tree
- typed return types of your file system paths
- single source of truth for all paths 
- simple, non virtual file tree
