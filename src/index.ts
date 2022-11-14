/**
 * typed-file-system-paths
 */

// ---- ts utils ----
type Head<T> = T extends [infer FirstItem, ...infer _Rest] ? FirstItem : never
type Tail<T> = T extends [infer _FirstItem, ...infer Rest] ? Rest : never
type FirstLetter<T> = T extends `${infer F}${infer rest}` ? F : never
type Cast<T, U> = T extends U ? T : U

type Join<T extends string[], Delimiter extends string> = T extends [infer F]
  ? F
  : // @ts-expect-error
    `${Head<T>}${Delimiter}${Join<Tail<T>, Delimiter>}`

type NiceMerge<T, U, T0 = T & U, T1 = { [K in keyof T0]: T0[K] }> = T1

// --------------------
// TS typed-fs-paths
// --------------------
type JoinPath<T extends string[]> = Join<T, '/'>
type IsDynamicPath<T> = FirstLetter<T> extends ':' ? true : false

export type TypedFSPaths<Path extends string[], O> = O extends Record<string, any>
  ? NiceMerge<
      {
        [K in keyof O]: IsDynamicPath<K> extends true
          ? <N extends string>(folderName: N) => TypedFSPaths<[...Path, N], O[K]>
          : TypedFSPaths<[...Path, Cast<K, string>], O[K]>
      },
      {
        ['/']: JoinPath<[...Path, '']>
        [':file']: <N extends string>(fileName: N) => JoinPath<[...Path, N]>
      }
    >
  : JoinPath<Path>

// --------------------
// JS typed-fs-paths
// ---------------------

const isObject = (a: any) => typeof a === 'object' && a !== null && !Array.isArray(a)
const joinPath = (path: string[]) => path.join('/')

const isDynamicPath = (name?: string | null) => name?.[0] === ':'

const mapEntries = (fn: (v: any, k: any) => any, obj: any) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]))

const _typedFSPaths = <P extends string, T>(path: P[], o: T): TypedFSPaths<[P], T> => {
  if (isObject(o)) {
    return {
      ...mapEntries(
        (v, k) =>
          isDynamicPath(k)
            ? (folderName: string) => _typedFSPaths([...path, folderName], v)
            : _typedFSPaths([...path, k], v),
        o
      ),
      ['/']: joinPath([...path, '']),
      [':file']: (fileName: string) => joinPath([...path, fileName]),
    } as any
  }
  return joinPath(path) as any
}

// TODO: should the api take first arg as a string or array of strings?
// wrap first arg to arr
export const typedFSPaths = <A extends string, B>(a: A, b: B) => _typedFSPaths([a], b)
