
// --------------------
// tests
// --------------------

import { typedFSPaths } from "../src/index"

const paths = typedFSPaths(`app`, {
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



const settingsJson = paths.data.app1["settings.json"]

const tsconfig = paths.data.app1["tsconfig.json"]


const gitIgnore = paths.data.app1[":file"]('.gitignore')

const app1 = paths.data.app1['/']


const x = settingsJson + gitIgnore
// 
// 
// 
// 
const testData = [
  {
    a: paths.data.app1[":dynamic-file"]('my-file.txt'),
    b: "app/data/app1/my-file.txt"
  },
  {
    a: paths.data.app2["/"],
    b: "app/data/app2/"
  },
  {
    a: paths["/"],
    b: "app/"
  },
  {
    a: paths[":file"]('xxx'),
    b: "app/xxx"
  },
  {
    a: paths.data[":dynamic-folder"]('xxx')["output.txt"],
    b: "app/data/xxx/output.txt"
  },
  {
    a: paths.data.app2.vendor["index.html"],
    b: "app/data/app2/vendor/index.html"
  },
]

testData.forEach(test => {
  if (  test.a !== test.b ) {
    console.log(paths)
    throw new Error(test.a + ' !== ' + test.b)
  }
})

console.info('all tests are success')
console.info(testData)
const t1 = paths.data.app1[":dynamic-file"]('my-file.txt')


// TODO: add ts types tests
// $ExpectType "app/data/app1/my-file.txt"
const o1 = paths.data[":dynamic-folder"]('xxx')["output.txt"]
//    ^?
const o2 = paths.data.app1[":dynamic-file"]('my-file.txt')
//    ^?
const o3 = paths.data.app2["/"]
//    ^?
const o4 = paths["/"]
//    ^?
const o5 = paths[":file"]('xxx')
//    ^?
const o6 = paths.data[":dynamic-folder"]('xxx')["output.txt"]
//    ^?
const o7 = paths.data.app2.vendor["index.html"]
//    ^?

export {}
