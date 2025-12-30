
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MediaResource
 * 
 */
export type MediaResource = $Result.DefaultSelection<Prisma.$MediaResourcePayload>
/**
 * Model TaskPackage
 * 
 */
export type TaskPackage = $Result.DefaultSelection<Prisma.$TaskPackagePayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Annotation
 * 
 */
export type Annotation = $Result.DefaultSelection<Prisma.$AnnotationPayload>
/**
 * Model TaskMetadata
 * 
 */
export type TaskMetadata = $Result.DefaultSelection<Prisma.$TaskMetadataPayload>
/**
 * Model QualityScore
 * 
 */
export type QualityScore = $Result.DefaultSelection<Prisma.$QualityScorePayload>
/**
 * Model OperationLog
 * 
 */
export type OperationLog = $Result.DefaultSelection<Prisma.$OperationLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  LABELER: 'LABELER',
  CHECKER: 'CHECKER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const UserStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const MediaType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]


export const PackageStatus: {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
};

export type PackageStatus = (typeof PackageStatus)[keyof typeof PackageStatus]


export const TaskStatus: {
  PENDING: 'PENDING',
  LABELING: 'LABELING',
  LABELED: 'LABELED',
  CHECKING: 'CHECKING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const AnnotationType: {
  RECT: 'RECT',
  ELLIPSE: 'ELLIPSE'
};

export type AnnotationType = (typeof AnnotationType)[keyof typeof AnnotationType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type MediaType = $Enums.MediaType

export const MediaType: typeof $Enums.MediaType

export type PackageStatus = $Enums.PackageStatus

export const PackageStatus: typeof $Enums.PackageStatus

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type AnnotationType = $Enums.AnnotationType

export const AnnotationType: typeof $Enums.AnnotationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaResource`: Exposes CRUD operations for the **MediaResource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaResources
    * const mediaResources = await prisma.mediaResource.findMany()
    * ```
    */
  get mediaResource(): Prisma.MediaResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskPackage`: Exposes CRUD operations for the **TaskPackage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskPackages
    * const taskPackages = await prisma.taskPackage.findMany()
    * ```
    */
  get taskPackage(): Prisma.TaskPackageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.annotation`: Exposes CRUD operations for the **Annotation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Annotations
    * const annotations = await prisma.annotation.findMany()
    * ```
    */
  get annotation(): Prisma.AnnotationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskMetadata`: Exposes CRUD operations for the **TaskMetadata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskMetadata
    * const taskMetadata = await prisma.taskMetadata.findMany()
    * ```
    */
  get taskMetadata(): Prisma.TaskMetadataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qualityScore`: Exposes CRUD operations for the **QualityScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QualityScores
    * const qualityScores = await prisma.qualityScore.findMany()
    * ```
    */
  get qualityScore(): Prisma.QualityScoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.operationLog`: Exposes CRUD operations for the **OperationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OperationLogs
    * const operationLogs = await prisma.operationLog.findMany()
    * ```
    */
  get operationLog(): Prisma.OperationLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    MediaResource: 'MediaResource',
    TaskPackage: 'TaskPackage',
    Task: 'Task',
    Annotation: 'Annotation',
    TaskMetadata: 'TaskMetadata',
    QualityScore: 'QualityScore',
    OperationLog: 'OperationLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "mediaResource" | "taskPackage" | "task" | "annotation" | "taskMetadata" | "qualityScore" | "operationLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MediaResource: {
        payload: Prisma.$MediaResourcePayload<ExtArgs>
        fields: Prisma.MediaResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          findFirst: {
            args: Prisma.MediaResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          findMany: {
            args: Prisma.MediaResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>[]
          }
          create: {
            args: Prisma.MediaResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          createMany: {
            args: Prisma.MediaResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>[]
          }
          delete: {
            args: Prisma.MediaResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          update: {
            args: Prisma.MediaResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          deleteMany: {
            args: Prisma.MediaResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>[]
          }
          upsert: {
            args: Prisma.MediaResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaResourcePayload>
          }
          aggregate: {
            args: Prisma.MediaResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaResource>
          }
          groupBy: {
            args: Prisma.MediaResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaResourceCountArgs<ExtArgs>
            result: $Utils.Optional<MediaResourceCountAggregateOutputType> | number
          }
        }
      }
      TaskPackage: {
        payload: Prisma.$TaskPackagePayload<ExtArgs>
        fields: Prisma.TaskPackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskPackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskPackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>
          }
          findFirst: {
            args: Prisma.TaskPackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskPackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>
          }
          findMany: {
            args: Prisma.TaskPackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>[]
          }
          create: {
            args: Prisma.TaskPackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>
          }
          createMany: {
            args: Prisma.TaskPackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskPackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>[]
          }
          delete: {
            args: Prisma.TaskPackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>
          }
          update: {
            args: Prisma.TaskPackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>
          }
          deleteMany: {
            args: Prisma.TaskPackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskPackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskPackageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>[]
          }
          upsert: {
            args: Prisma.TaskPackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPackagePayload>
          }
          aggregate: {
            args: Prisma.TaskPackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskPackage>
          }
          groupBy: {
            args: Prisma.TaskPackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskPackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskPackageCountArgs<ExtArgs>
            result: $Utils.Optional<TaskPackageCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Annotation: {
        payload: Prisma.$AnnotationPayload<ExtArgs>
        fields: Prisma.AnnotationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnotationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnotationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>
          }
          findFirst: {
            args: Prisma.AnnotationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnotationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>
          }
          findMany: {
            args: Prisma.AnnotationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>[]
          }
          create: {
            args: Prisma.AnnotationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>
          }
          createMany: {
            args: Prisma.AnnotationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnnotationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>[]
          }
          delete: {
            args: Prisma.AnnotationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>
          }
          update: {
            args: Prisma.AnnotationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>
          }
          deleteMany: {
            args: Prisma.AnnotationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnotationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnnotationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>[]
          }
          upsert: {
            args: Prisma.AnnotationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnotationPayload>
          }
          aggregate: {
            args: Prisma.AnnotationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnotation>
          }
          groupBy: {
            args: Prisma.AnnotationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnotationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnotationCountArgs<ExtArgs>
            result: $Utils.Optional<AnnotationCountAggregateOutputType> | number
          }
        }
      }
      TaskMetadata: {
        payload: Prisma.$TaskMetadataPayload<ExtArgs>
        fields: Prisma.TaskMetadataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskMetadataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskMetadataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>
          }
          findFirst: {
            args: Prisma.TaskMetadataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskMetadataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>
          }
          findMany: {
            args: Prisma.TaskMetadataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>[]
          }
          create: {
            args: Prisma.TaskMetadataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>
          }
          createMany: {
            args: Prisma.TaskMetadataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskMetadataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>[]
          }
          delete: {
            args: Prisma.TaskMetadataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>
          }
          update: {
            args: Prisma.TaskMetadataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>
          }
          deleteMany: {
            args: Prisma.TaskMetadataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskMetadataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskMetadataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>[]
          }
          upsert: {
            args: Prisma.TaskMetadataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMetadataPayload>
          }
          aggregate: {
            args: Prisma.TaskMetadataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskMetadata>
          }
          groupBy: {
            args: Prisma.TaskMetadataGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskMetadataGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskMetadataCountArgs<ExtArgs>
            result: $Utils.Optional<TaskMetadataCountAggregateOutputType> | number
          }
        }
      }
      QualityScore: {
        payload: Prisma.$QualityScorePayload<ExtArgs>
        fields: Prisma.QualityScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QualityScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QualityScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>
          }
          findFirst: {
            args: Prisma.QualityScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QualityScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>
          }
          findMany: {
            args: Prisma.QualityScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>[]
          }
          create: {
            args: Prisma.QualityScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>
          }
          createMany: {
            args: Prisma.QualityScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QualityScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>[]
          }
          delete: {
            args: Prisma.QualityScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>
          }
          update: {
            args: Prisma.QualityScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>
          }
          deleteMany: {
            args: Prisma.QualityScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QualityScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QualityScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>[]
          }
          upsert: {
            args: Prisma.QualityScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualityScorePayload>
          }
          aggregate: {
            args: Prisma.QualityScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQualityScore>
          }
          groupBy: {
            args: Prisma.QualityScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<QualityScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.QualityScoreCountArgs<ExtArgs>
            result: $Utils.Optional<QualityScoreCountAggregateOutputType> | number
          }
        }
      }
      OperationLog: {
        payload: Prisma.$OperationLogPayload<ExtArgs>
        fields: Prisma.OperationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OperationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OperationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          findFirst: {
            args: Prisma.OperationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OperationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          findMany: {
            args: Prisma.OperationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>[]
          }
          create: {
            args: Prisma.OperationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          createMany: {
            args: Prisma.OperationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OperationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>[]
          }
          delete: {
            args: Prisma.OperationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          update: {
            args: Prisma.OperationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          deleteMany: {
            args: Prisma.OperationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OperationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OperationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>[]
          }
          upsert: {
            args: Prisma.OperationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          aggregate: {
            args: Prisma.OperationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOperationLog>
          }
          groupBy: {
            args: Prisma.OperationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<OperationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.OperationLogCountArgs<ExtArgs>
            result: $Utils.Optional<OperationLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    mediaResource?: MediaResourceOmit
    taskPackage?: TaskPackageOmit
    task?: TaskOmit
    annotation?: AnnotationOmit
    taskMetadata?: TaskMetadataOmit
    qualityScore?: QualityScoreOmit
    operationLog?: OperationLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdPackages: number
    labeledTasks: number
    checkedTasks: number
    annotations: number
    qualityScores: number
    operationLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdPackages?: boolean | UserCountOutputTypeCountCreatedPackagesArgs
    labeledTasks?: boolean | UserCountOutputTypeCountLabeledTasksArgs
    checkedTasks?: boolean | UserCountOutputTypeCountCheckedTasksArgs
    annotations?: boolean | UserCountOutputTypeCountAnnotationsArgs
    qualityScores?: boolean | UserCountOutputTypeCountQualityScoresArgs
    operationLogs?: boolean | UserCountOutputTypeCountOperationLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedPackagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskPackageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLabeledTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCheckedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnnotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnotationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQualityScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QualityScoreWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOperationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperationLogWhereInput
  }


  /**
   * Count Type TaskPackageCountOutputType
   */

  export type TaskPackageCountOutputType = {
    tasks: number
  }

  export type TaskPackageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | TaskPackageCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * TaskPackageCountOutputType without action
   */
  export type TaskPackageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackageCountOutputType
     */
    select?: TaskPackageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskPackageCountOutputType without action
   */
  export type TaskPackageCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    annotations: number
    qualityScores: number
    operationLogs: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    annotations?: boolean | TaskCountOutputTypeCountAnnotationsArgs
    qualityScores?: boolean | TaskCountOutputTypeCountQualityScoresArgs
    operationLogs?: boolean | TaskCountOutputTypeCountOperationLogsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountAnnotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnotationWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountQualityScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QualityScoreWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountOperationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperationLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    status: $Enums.UserStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    status: $Enums.UserStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    passwordHash: number
    role: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.Role
    status: $Enums.UserStatus
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdPackages?: boolean | User$createdPackagesArgs<ExtArgs>
    labeledTasks?: boolean | User$labeledTasksArgs<ExtArgs>
    checkedTasks?: boolean | User$checkedTasksArgs<ExtArgs>
    annotations?: boolean | User$annotationsArgs<ExtArgs>
    qualityScores?: boolean | User$qualityScoresArgs<ExtArgs>
    operationLogs?: boolean | User$operationLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "passwordHash" | "role" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdPackages?: boolean | User$createdPackagesArgs<ExtArgs>
    labeledTasks?: boolean | User$labeledTasksArgs<ExtArgs>
    checkedTasks?: boolean | User$checkedTasksArgs<ExtArgs>
    annotations?: boolean | User$annotationsArgs<ExtArgs>
    qualityScores?: boolean | User$qualityScoresArgs<ExtArgs>
    operationLogs?: boolean | User$operationLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdPackages: Prisma.$TaskPackagePayload<ExtArgs>[]
      labeledTasks: Prisma.$TaskPayload<ExtArgs>[]
      checkedTasks: Prisma.$TaskPayload<ExtArgs>[]
      annotations: Prisma.$AnnotationPayload<ExtArgs>[]
      qualityScores: Prisma.$QualityScorePayload<ExtArgs>[]
      operationLogs: Prisma.$OperationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      passwordHash: string
      role: $Enums.Role
      status: $Enums.UserStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdPackages<T extends User$createdPackagesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdPackagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    labeledTasks<T extends User$labeledTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$labeledTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    checkedTasks<T extends User$checkedTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$checkedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    annotations<T extends User$annotationsArgs<ExtArgs> = {}>(args?: Subset<T, User$annotationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    qualityScores<T extends User$qualityScoresArgs<ExtArgs> = {}>(args?: Subset<T, User$qualityScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    operationLogs<T extends User$operationLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$operationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.createdPackages
   */
  export type User$createdPackagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    where?: TaskPackageWhereInput
    orderBy?: TaskPackageOrderByWithRelationInput | TaskPackageOrderByWithRelationInput[]
    cursor?: TaskPackageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskPackageScalarFieldEnum | TaskPackageScalarFieldEnum[]
  }

  /**
   * User.labeledTasks
   */
  export type User$labeledTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.checkedTasks
   */
  export type User$checkedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.annotations
   */
  export type User$annotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    where?: AnnotationWhereInput
    orderBy?: AnnotationOrderByWithRelationInput | AnnotationOrderByWithRelationInput[]
    cursor?: AnnotationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnotationScalarFieldEnum | AnnotationScalarFieldEnum[]
  }

  /**
   * User.qualityScores
   */
  export type User$qualityScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    where?: QualityScoreWhereInput
    orderBy?: QualityScoreOrderByWithRelationInput | QualityScoreOrderByWithRelationInput[]
    cursor?: QualityScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QualityScoreScalarFieldEnum | QualityScoreScalarFieldEnum[]
  }

  /**
   * User.operationLogs
   */
  export type User$operationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    where?: OperationLogWhereInput
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    cursor?: OperationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OperationLogScalarFieldEnum | OperationLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model MediaResource
   */

  export type AggregateMediaResource = {
    _count: MediaResourceCountAggregateOutputType | null
    _avg: MediaResourceAvgAggregateOutputType | null
    _sum: MediaResourceSumAggregateOutputType | null
    _min: MediaResourceMinAggregateOutputType | null
    _max: MediaResourceMaxAggregateOutputType | null
  }

  export type MediaResourceAvgAggregateOutputType = {
    fileSize: number | null
    duration: number | null
    width: number | null
    height: number | null
    autoNumber: number | null
  }

  export type MediaResourceSumAggregateOutputType = {
    fileSize: number | null
    duration: number | null
    width: number | null
    height: number | null
    autoNumber: number | null
  }

  export type MediaResourceMinAggregateOutputType = {
    id: string | null
    s3Key: string | null
    s3Url: string | null
    type: $Enums.MediaType | null
    fileName: string | null
    fileSize: number | null
    duration: number | null
    width: number | null
    height: number | null
    autoNumber: number | null
    createdAt: Date | null
  }

  export type MediaResourceMaxAggregateOutputType = {
    id: string | null
    s3Key: string | null
    s3Url: string | null
    type: $Enums.MediaType | null
    fileName: string | null
    fileSize: number | null
    duration: number | null
    width: number | null
    height: number | null
    autoNumber: number | null
    createdAt: Date | null
  }

  export type MediaResourceCountAggregateOutputType = {
    id: number
    s3Key: number
    s3Url: number
    type: number
    fileName: number
    fileSize: number
    duration: number
    width: number
    height: number
    autoNumber: number
    createdAt: number
    _all: number
  }


  export type MediaResourceAvgAggregateInputType = {
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    autoNumber?: true
  }

  export type MediaResourceSumAggregateInputType = {
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    autoNumber?: true
  }

  export type MediaResourceMinAggregateInputType = {
    id?: true
    s3Key?: true
    s3Url?: true
    type?: true
    fileName?: true
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    autoNumber?: true
    createdAt?: true
  }

  export type MediaResourceMaxAggregateInputType = {
    id?: true
    s3Key?: true
    s3Url?: true
    type?: true
    fileName?: true
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    autoNumber?: true
    createdAt?: true
  }

  export type MediaResourceCountAggregateInputType = {
    id?: true
    s3Key?: true
    s3Url?: true
    type?: true
    fileName?: true
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    autoNumber?: true
    createdAt?: true
    _all?: true
  }

  export type MediaResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaResource to aggregate.
     */
    where?: MediaResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaResources to fetch.
     */
    orderBy?: MediaResourceOrderByWithRelationInput | MediaResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaResources
    **/
    _count?: true | MediaResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaResourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaResourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaResourceMaxAggregateInputType
  }

  export type GetMediaResourceAggregateType<T extends MediaResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaResource[P]>
      : GetScalarType<T[P], AggregateMediaResource[P]>
  }




  export type MediaResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaResourceWhereInput
    orderBy?: MediaResourceOrderByWithAggregationInput | MediaResourceOrderByWithAggregationInput[]
    by: MediaResourceScalarFieldEnum[] | MediaResourceScalarFieldEnum
    having?: MediaResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaResourceCountAggregateInputType | true
    _avg?: MediaResourceAvgAggregateInputType
    _sum?: MediaResourceSumAggregateInputType
    _min?: MediaResourceMinAggregateInputType
    _max?: MediaResourceMaxAggregateInputType
  }

  export type MediaResourceGroupByOutputType = {
    id: string
    s3Key: string
    s3Url: string
    type: $Enums.MediaType
    fileName: string
    fileSize: number
    duration: number | null
    width: number | null
    height: number | null
    autoNumber: number
    createdAt: Date
    _count: MediaResourceCountAggregateOutputType | null
    _avg: MediaResourceAvgAggregateOutputType | null
    _sum: MediaResourceSumAggregateOutputType | null
    _min: MediaResourceMinAggregateOutputType | null
    _max: MediaResourceMaxAggregateOutputType | null
  }

  type GetMediaResourceGroupByPayload<T extends MediaResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaResourceGroupByOutputType[P]>
            : GetScalarType<T[P], MediaResourceGroupByOutputType[P]>
        }
      >
    >


  export type MediaResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    s3Key?: boolean
    s3Url?: boolean
    type?: boolean
    fileName?: boolean
    fileSize?: boolean
    duration?: boolean
    width?: boolean
    height?: boolean
    autoNumber?: boolean
    createdAt?: boolean
    task?: boolean | MediaResource$taskArgs<ExtArgs>
  }, ExtArgs["result"]["mediaResource"]>

  export type MediaResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    s3Key?: boolean
    s3Url?: boolean
    type?: boolean
    fileName?: boolean
    fileSize?: boolean
    duration?: boolean
    width?: boolean
    height?: boolean
    autoNumber?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mediaResource"]>

  export type MediaResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    s3Key?: boolean
    s3Url?: boolean
    type?: boolean
    fileName?: boolean
    fileSize?: boolean
    duration?: boolean
    width?: boolean
    height?: boolean
    autoNumber?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mediaResource"]>

  export type MediaResourceSelectScalar = {
    id?: boolean
    s3Key?: boolean
    s3Url?: boolean
    type?: boolean
    fileName?: boolean
    fileSize?: boolean
    duration?: boolean
    width?: boolean
    height?: boolean
    autoNumber?: boolean
    createdAt?: boolean
  }

  export type MediaResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "s3Key" | "s3Url" | "type" | "fileName" | "fileSize" | "duration" | "width" | "height" | "autoNumber" | "createdAt", ExtArgs["result"]["mediaResource"]>
  export type MediaResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | MediaResource$taskArgs<ExtArgs>
  }
  export type MediaResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MediaResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MediaResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaResource"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      s3Key: string
      s3Url: string
      type: $Enums.MediaType
      fileName: string
      fileSize: number
      duration: number | null
      width: number | null
      height: number | null
      autoNumber: number
      createdAt: Date
    }, ExtArgs["result"]["mediaResource"]>
    composites: {}
  }

  type MediaResourceGetPayload<S extends boolean | null | undefined | MediaResourceDefaultArgs> = $Result.GetResult<Prisma.$MediaResourcePayload, S>

  type MediaResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaResourceCountAggregateInputType | true
    }

  export interface MediaResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaResource'], meta: { name: 'MediaResource' } }
    /**
     * Find zero or one MediaResource that matches the filter.
     * @param {MediaResourceFindUniqueArgs} args - Arguments to find a MediaResource
     * @example
     * // Get one MediaResource
     * const mediaResource = await prisma.mediaResource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaResourceFindUniqueArgs>(args: SelectSubset<T, MediaResourceFindUniqueArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaResource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaResourceFindUniqueOrThrowArgs} args - Arguments to find a MediaResource
     * @example
     * // Get one MediaResource
     * const mediaResource = await prisma.mediaResource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaResource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceFindFirstArgs} args - Arguments to find a MediaResource
     * @example
     * // Get one MediaResource
     * const mediaResource = await prisma.mediaResource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaResourceFindFirstArgs>(args?: SelectSubset<T, MediaResourceFindFirstArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaResource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceFindFirstOrThrowArgs} args - Arguments to find a MediaResource
     * @example
     * // Get one MediaResource
     * const mediaResource = await prisma.mediaResource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaResources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaResources
     * const mediaResources = await prisma.mediaResource.findMany()
     * 
     * // Get first 10 MediaResources
     * const mediaResources = await prisma.mediaResource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaResourceWithIdOnly = await prisma.mediaResource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaResourceFindManyArgs>(args?: SelectSubset<T, MediaResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaResource.
     * @param {MediaResourceCreateArgs} args - Arguments to create a MediaResource.
     * @example
     * // Create one MediaResource
     * const MediaResource = await prisma.mediaResource.create({
     *   data: {
     *     // ... data to create a MediaResource
     *   }
     * })
     * 
     */
    create<T extends MediaResourceCreateArgs>(args: SelectSubset<T, MediaResourceCreateArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaResources.
     * @param {MediaResourceCreateManyArgs} args - Arguments to create many MediaResources.
     * @example
     * // Create many MediaResources
     * const mediaResource = await prisma.mediaResource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaResourceCreateManyArgs>(args?: SelectSubset<T, MediaResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaResources and returns the data saved in the database.
     * @param {MediaResourceCreateManyAndReturnArgs} args - Arguments to create many MediaResources.
     * @example
     * // Create many MediaResources
     * const mediaResource = await prisma.mediaResource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaResources and only return the `id`
     * const mediaResourceWithIdOnly = await prisma.mediaResource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaResource.
     * @param {MediaResourceDeleteArgs} args - Arguments to delete one MediaResource.
     * @example
     * // Delete one MediaResource
     * const MediaResource = await prisma.mediaResource.delete({
     *   where: {
     *     // ... filter to delete one MediaResource
     *   }
     * })
     * 
     */
    delete<T extends MediaResourceDeleteArgs>(args: SelectSubset<T, MediaResourceDeleteArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaResource.
     * @param {MediaResourceUpdateArgs} args - Arguments to update one MediaResource.
     * @example
     * // Update one MediaResource
     * const mediaResource = await prisma.mediaResource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaResourceUpdateArgs>(args: SelectSubset<T, MediaResourceUpdateArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaResources.
     * @param {MediaResourceDeleteManyArgs} args - Arguments to filter MediaResources to delete.
     * @example
     * // Delete a few MediaResources
     * const { count } = await prisma.mediaResource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaResourceDeleteManyArgs>(args?: SelectSubset<T, MediaResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaResources
     * const mediaResource = await prisma.mediaResource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaResourceUpdateManyArgs>(args: SelectSubset<T, MediaResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaResources and returns the data updated in the database.
     * @param {MediaResourceUpdateManyAndReturnArgs} args - Arguments to update many MediaResources.
     * @example
     * // Update many MediaResources
     * const mediaResource = await prisma.mediaResource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaResources and only return the `id`
     * const mediaResourceWithIdOnly = await prisma.mediaResource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaResource.
     * @param {MediaResourceUpsertArgs} args - Arguments to update or create a MediaResource.
     * @example
     * // Update or create a MediaResource
     * const mediaResource = await prisma.mediaResource.upsert({
     *   create: {
     *     // ... data to create a MediaResource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaResource we want to update
     *   }
     * })
     */
    upsert<T extends MediaResourceUpsertArgs>(args: SelectSubset<T, MediaResourceUpsertArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceCountArgs} args - Arguments to filter MediaResources to count.
     * @example
     * // Count the number of MediaResources
     * const count = await prisma.mediaResource.count({
     *   where: {
     *     // ... the filter for the MediaResources we want to count
     *   }
     * })
    **/
    count<T extends MediaResourceCountArgs>(
      args?: Subset<T, MediaResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaResourceAggregateArgs>(args: Subset<T, MediaResourceAggregateArgs>): Prisma.PrismaPromise<GetMediaResourceAggregateType<T>>

    /**
     * Group by MediaResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaResourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaResourceGroupByArgs['orderBy'] }
        : { orderBy?: MediaResourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaResource model
   */
  readonly fields: MediaResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaResource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends MediaResource$taskArgs<ExtArgs> = {}>(args?: Subset<T, MediaResource$taskArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaResource model
   */
  interface MediaResourceFieldRefs {
    readonly id: FieldRef<"MediaResource", 'String'>
    readonly s3Key: FieldRef<"MediaResource", 'String'>
    readonly s3Url: FieldRef<"MediaResource", 'String'>
    readonly type: FieldRef<"MediaResource", 'MediaType'>
    readonly fileName: FieldRef<"MediaResource", 'String'>
    readonly fileSize: FieldRef<"MediaResource", 'Int'>
    readonly duration: FieldRef<"MediaResource", 'Float'>
    readonly width: FieldRef<"MediaResource", 'Int'>
    readonly height: FieldRef<"MediaResource", 'Int'>
    readonly autoNumber: FieldRef<"MediaResource", 'Int'>
    readonly createdAt: FieldRef<"MediaResource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaResource findUnique
   */
  export type MediaResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResource to fetch.
     */
    where: MediaResourceWhereUniqueInput
  }

  /**
   * MediaResource findUniqueOrThrow
   */
  export type MediaResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResource to fetch.
     */
    where: MediaResourceWhereUniqueInput
  }

  /**
   * MediaResource findFirst
   */
  export type MediaResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResource to fetch.
     */
    where?: MediaResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaResources to fetch.
     */
    orderBy?: MediaResourceOrderByWithRelationInput | MediaResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaResources.
     */
    cursor?: MediaResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaResources.
     */
    distinct?: MediaResourceScalarFieldEnum | MediaResourceScalarFieldEnum[]
  }

  /**
   * MediaResource findFirstOrThrow
   */
  export type MediaResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResource to fetch.
     */
    where?: MediaResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaResources to fetch.
     */
    orderBy?: MediaResourceOrderByWithRelationInput | MediaResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaResources.
     */
    cursor?: MediaResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaResources.
     */
    distinct?: MediaResourceScalarFieldEnum | MediaResourceScalarFieldEnum[]
  }

  /**
   * MediaResource findMany
   */
  export type MediaResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter, which MediaResources to fetch.
     */
    where?: MediaResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaResources to fetch.
     */
    orderBy?: MediaResourceOrderByWithRelationInput | MediaResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaResources.
     */
    cursor?: MediaResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaResources.
     */
    skip?: number
    distinct?: MediaResourceScalarFieldEnum | MediaResourceScalarFieldEnum[]
  }

  /**
   * MediaResource create
   */
  export type MediaResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaResource.
     */
    data: XOR<MediaResourceCreateInput, MediaResourceUncheckedCreateInput>
  }

  /**
   * MediaResource createMany
   */
  export type MediaResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaResources.
     */
    data: MediaResourceCreateManyInput | MediaResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaResource createManyAndReturn
   */
  export type MediaResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * The data used to create many MediaResources.
     */
    data: MediaResourceCreateManyInput | MediaResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaResource update
   */
  export type MediaResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaResource.
     */
    data: XOR<MediaResourceUpdateInput, MediaResourceUncheckedUpdateInput>
    /**
     * Choose, which MediaResource to update.
     */
    where: MediaResourceWhereUniqueInput
  }

  /**
   * MediaResource updateMany
   */
  export type MediaResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaResources.
     */
    data: XOR<MediaResourceUpdateManyMutationInput, MediaResourceUncheckedUpdateManyInput>
    /**
     * Filter which MediaResources to update
     */
    where?: MediaResourceWhereInput
    /**
     * Limit how many MediaResources to update.
     */
    limit?: number
  }

  /**
   * MediaResource updateManyAndReturn
   */
  export type MediaResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * The data used to update MediaResources.
     */
    data: XOR<MediaResourceUpdateManyMutationInput, MediaResourceUncheckedUpdateManyInput>
    /**
     * Filter which MediaResources to update
     */
    where?: MediaResourceWhereInput
    /**
     * Limit how many MediaResources to update.
     */
    limit?: number
  }

  /**
   * MediaResource upsert
   */
  export type MediaResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaResource to update in case it exists.
     */
    where: MediaResourceWhereUniqueInput
    /**
     * In case the MediaResource found by the `where` argument doesn't exist, create a new MediaResource with this data.
     */
    create: XOR<MediaResourceCreateInput, MediaResourceUncheckedCreateInput>
    /**
     * In case the MediaResource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaResourceUpdateInput, MediaResourceUncheckedUpdateInput>
  }

  /**
   * MediaResource delete
   */
  export type MediaResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
    /**
     * Filter which MediaResource to delete.
     */
    where: MediaResourceWhereUniqueInput
  }

  /**
   * MediaResource deleteMany
   */
  export type MediaResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaResources to delete
     */
    where?: MediaResourceWhereInput
    /**
     * Limit how many MediaResources to delete.
     */
    limit?: number
  }

  /**
   * MediaResource.task
   */
  export type MediaResource$taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * MediaResource without action
   */
  export type MediaResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaResource
     */
    select?: MediaResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaResource
     */
    omit?: MediaResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaResourceInclude<ExtArgs> | null
  }


  /**
   * Model TaskPackage
   */

  export type AggregateTaskPackage = {
    _count: TaskPackageCountAggregateOutputType | null
    _avg: TaskPackageAvgAggregateOutputType | null
    _sum: TaskPackageSumAggregateOutputType | null
    _min: TaskPackageMinAggregateOutputType | null
    _max: TaskPackageMaxAggregateOutputType | null
  }

  export type TaskPackageAvgAggregateOutputType = {
    totalCount: number | null
  }

  export type TaskPackageSumAggregateOutputType = {
    totalCount: number | null
  }

  export type TaskPackageMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: $Enums.PackageStatus | null
    totalCount: number | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskPackageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: $Enums.PackageStatus | null
    totalCount: number | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskPackageCountAggregateOutputType = {
    id: number
    name: number
    description: number
    status: number
    totalCount: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskPackageAvgAggregateInputType = {
    totalCount?: true
  }

  export type TaskPackageSumAggregateInputType = {
    totalCount?: true
  }

  export type TaskPackageMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    totalCount?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskPackageMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    totalCount?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskPackageCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    totalCount?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskPackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskPackage to aggregate.
     */
    where?: TaskPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskPackages to fetch.
     */
    orderBy?: TaskPackageOrderByWithRelationInput | TaskPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskPackages
    **/
    _count?: true | TaskPackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskPackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskPackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskPackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskPackageMaxAggregateInputType
  }

  export type GetTaskPackageAggregateType<T extends TaskPackageAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskPackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskPackage[P]>
      : GetScalarType<T[P], AggregateTaskPackage[P]>
  }




  export type TaskPackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskPackageWhereInput
    orderBy?: TaskPackageOrderByWithAggregationInput | TaskPackageOrderByWithAggregationInput[]
    by: TaskPackageScalarFieldEnum[] | TaskPackageScalarFieldEnum
    having?: TaskPackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskPackageCountAggregateInputType | true
    _avg?: TaskPackageAvgAggregateInputType
    _sum?: TaskPackageSumAggregateInputType
    _min?: TaskPackageMinAggregateInputType
    _max?: TaskPackageMaxAggregateInputType
  }

  export type TaskPackageGroupByOutputType = {
    id: string
    name: string
    description: string | null
    status: $Enums.PackageStatus
    totalCount: number
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: TaskPackageCountAggregateOutputType | null
    _avg: TaskPackageAvgAggregateOutputType | null
    _sum: TaskPackageSumAggregateOutputType | null
    _min: TaskPackageMinAggregateOutputType | null
    _max: TaskPackageMaxAggregateOutputType | null
  }

  type GetTaskPackageGroupByPayload<T extends TaskPackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskPackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskPackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskPackageGroupByOutputType[P]>
            : GetScalarType<T[P], TaskPackageGroupByOutputType[P]>
        }
      >
    >


  export type TaskPackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    totalCount?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | TaskPackage$tasksArgs<ExtArgs>
    _count?: boolean | TaskPackageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskPackage"]>

  export type TaskPackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    totalCount?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskPackage"]>

  export type TaskPackageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    totalCount?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskPackage"]>

  export type TaskPackageSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    totalCount?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskPackageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "status" | "totalCount" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["taskPackage"]>
  export type TaskPackageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | TaskPackage$tasksArgs<ExtArgs>
    _count?: boolean | TaskPackageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskPackageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskPackageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskPackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskPackage"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      status: $Enums.PackageStatus
      totalCount: number
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskPackage"]>
    composites: {}
  }

  type TaskPackageGetPayload<S extends boolean | null | undefined | TaskPackageDefaultArgs> = $Result.GetResult<Prisma.$TaskPackagePayload, S>

  type TaskPackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskPackageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskPackageCountAggregateInputType | true
    }

  export interface TaskPackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskPackage'], meta: { name: 'TaskPackage' } }
    /**
     * Find zero or one TaskPackage that matches the filter.
     * @param {TaskPackageFindUniqueArgs} args - Arguments to find a TaskPackage
     * @example
     * // Get one TaskPackage
     * const taskPackage = await prisma.taskPackage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskPackageFindUniqueArgs>(args: SelectSubset<T, TaskPackageFindUniqueArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskPackage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskPackageFindUniqueOrThrowArgs} args - Arguments to find a TaskPackage
     * @example
     * // Get one TaskPackage
     * const taskPackage = await prisma.taskPackage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskPackageFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskPackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskPackage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPackageFindFirstArgs} args - Arguments to find a TaskPackage
     * @example
     * // Get one TaskPackage
     * const taskPackage = await prisma.taskPackage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskPackageFindFirstArgs>(args?: SelectSubset<T, TaskPackageFindFirstArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskPackage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPackageFindFirstOrThrowArgs} args - Arguments to find a TaskPackage
     * @example
     * // Get one TaskPackage
     * const taskPackage = await prisma.taskPackage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskPackageFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskPackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskPackages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskPackages
     * const taskPackages = await prisma.taskPackage.findMany()
     * 
     * // Get first 10 TaskPackages
     * const taskPackages = await prisma.taskPackage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskPackageWithIdOnly = await prisma.taskPackage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskPackageFindManyArgs>(args?: SelectSubset<T, TaskPackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskPackage.
     * @param {TaskPackageCreateArgs} args - Arguments to create a TaskPackage.
     * @example
     * // Create one TaskPackage
     * const TaskPackage = await prisma.taskPackage.create({
     *   data: {
     *     // ... data to create a TaskPackage
     *   }
     * })
     * 
     */
    create<T extends TaskPackageCreateArgs>(args: SelectSubset<T, TaskPackageCreateArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskPackages.
     * @param {TaskPackageCreateManyArgs} args - Arguments to create many TaskPackages.
     * @example
     * // Create many TaskPackages
     * const taskPackage = await prisma.taskPackage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskPackageCreateManyArgs>(args?: SelectSubset<T, TaskPackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskPackages and returns the data saved in the database.
     * @param {TaskPackageCreateManyAndReturnArgs} args - Arguments to create many TaskPackages.
     * @example
     * // Create many TaskPackages
     * const taskPackage = await prisma.taskPackage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskPackages and only return the `id`
     * const taskPackageWithIdOnly = await prisma.taskPackage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskPackageCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskPackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskPackage.
     * @param {TaskPackageDeleteArgs} args - Arguments to delete one TaskPackage.
     * @example
     * // Delete one TaskPackage
     * const TaskPackage = await prisma.taskPackage.delete({
     *   where: {
     *     // ... filter to delete one TaskPackage
     *   }
     * })
     * 
     */
    delete<T extends TaskPackageDeleteArgs>(args: SelectSubset<T, TaskPackageDeleteArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskPackage.
     * @param {TaskPackageUpdateArgs} args - Arguments to update one TaskPackage.
     * @example
     * // Update one TaskPackage
     * const taskPackage = await prisma.taskPackage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskPackageUpdateArgs>(args: SelectSubset<T, TaskPackageUpdateArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskPackages.
     * @param {TaskPackageDeleteManyArgs} args - Arguments to filter TaskPackages to delete.
     * @example
     * // Delete a few TaskPackages
     * const { count } = await prisma.taskPackage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskPackageDeleteManyArgs>(args?: SelectSubset<T, TaskPackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskPackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskPackages
     * const taskPackage = await prisma.taskPackage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskPackageUpdateManyArgs>(args: SelectSubset<T, TaskPackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskPackages and returns the data updated in the database.
     * @param {TaskPackageUpdateManyAndReturnArgs} args - Arguments to update many TaskPackages.
     * @example
     * // Update many TaskPackages
     * const taskPackage = await prisma.taskPackage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskPackages and only return the `id`
     * const taskPackageWithIdOnly = await prisma.taskPackage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskPackageUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskPackageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskPackage.
     * @param {TaskPackageUpsertArgs} args - Arguments to update or create a TaskPackage.
     * @example
     * // Update or create a TaskPackage
     * const taskPackage = await prisma.taskPackage.upsert({
     *   create: {
     *     // ... data to create a TaskPackage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskPackage we want to update
     *   }
     * })
     */
    upsert<T extends TaskPackageUpsertArgs>(args: SelectSubset<T, TaskPackageUpsertArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskPackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPackageCountArgs} args - Arguments to filter TaskPackages to count.
     * @example
     * // Count the number of TaskPackages
     * const count = await prisma.taskPackage.count({
     *   where: {
     *     // ... the filter for the TaskPackages we want to count
     *   }
     * })
    **/
    count<T extends TaskPackageCountArgs>(
      args?: Subset<T, TaskPackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskPackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskPackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskPackageAggregateArgs>(args: Subset<T, TaskPackageAggregateArgs>): Prisma.PrismaPromise<GetTaskPackageAggregateType<T>>

    /**
     * Group by TaskPackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPackageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskPackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskPackageGroupByArgs['orderBy'] }
        : { orderBy?: TaskPackageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskPackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskPackage model
   */
  readonly fields: TaskPackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskPackage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskPackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends TaskPackage$tasksArgs<ExtArgs> = {}>(args?: Subset<T, TaskPackage$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskPackage model
   */
  interface TaskPackageFieldRefs {
    readonly id: FieldRef<"TaskPackage", 'String'>
    readonly name: FieldRef<"TaskPackage", 'String'>
    readonly description: FieldRef<"TaskPackage", 'String'>
    readonly status: FieldRef<"TaskPackage", 'PackageStatus'>
    readonly totalCount: FieldRef<"TaskPackage", 'Int'>
    readonly createdById: FieldRef<"TaskPackage", 'String'>
    readonly createdAt: FieldRef<"TaskPackage", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskPackage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskPackage findUnique
   */
  export type TaskPackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * Filter, which TaskPackage to fetch.
     */
    where: TaskPackageWhereUniqueInput
  }

  /**
   * TaskPackage findUniqueOrThrow
   */
  export type TaskPackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * Filter, which TaskPackage to fetch.
     */
    where: TaskPackageWhereUniqueInput
  }

  /**
   * TaskPackage findFirst
   */
  export type TaskPackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * Filter, which TaskPackage to fetch.
     */
    where?: TaskPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskPackages to fetch.
     */
    orderBy?: TaskPackageOrderByWithRelationInput | TaskPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskPackages.
     */
    cursor?: TaskPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskPackages.
     */
    distinct?: TaskPackageScalarFieldEnum | TaskPackageScalarFieldEnum[]
  }

  /**
   * TaskPackage findFirstOrThrow
   */
  export type TaskPackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * Filter, which TaskPackage to fetch.
     */
    where?: TaskPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskPackages to fetch.
     */
    orderBy?: TaskPackageOrderByWithRelationInput | TaskPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskPackages.
     */
    cursor?: TaskPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskPackages.
     */
    distinct?: TaskPackageScalarFieldEnum | TaskPackageScalarFieldEnum[]
  }

  /**
   * TaskPackage findMany
   */
  export type TaskPackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * Filter, which TaskPackages to fetch.
     */
    where?: TaskPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskPackages to fetch.
     */
    orderBy?: TaskPackageOrderByWithRelationInput | TaskPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskPackages.
     */
    cursor?: TaskPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskPackages.
     */
    skip?: number
    distinct?: TaskPackageScalarFieldEnum | TaskPackageScalarFieldEnum[]
  }

  /**
   * TaskPackage create
   */
  export type TaskPackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskPackage.
     */
    data: XOR<TaskPackageCreateInput, TaskPackageUncheckedCreateInput>
  }

  /**
   * TaskPackage createMany
   */
  export type TaskPackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskPackages.
     */
    data: TaskPackageCreateManyInput | TaskPackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskPackage createManyAndReturn
   */
  export type TaskPackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * The data used to create many TaskPackages.
     */
    data: TaskPackageCreateManyInput | TaskPackageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskPackage update
   */
  export type TaskPackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskPackage.
     */
    data: XOR<TaskPackageUpdateInput, TaskPackageUncheckedUpdateInput>
    /**
     * Choose, which TaskPackage to update.
     */
    where: TaskPackageWhereUniqueInput
  }

  /**
   * TaskPackage updateMany
   */
  export type TaskPackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskPackages.
     */
    data: XOR<TaskPackageUpdateManyMutationInput, TaskPackageUncheckedUpdateManyInput>
    /**
     * Filter which TaskPackages to update
     */
    where?: TaskPackageWhereInput
    /**
     * Limit how many TaskPackages to update.
     */
    limit?: number
  }

  /**
   * TaskPackage updateManyAndReturn
   */
  export type TaskPackageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * The data used to update TaskPackages.
     */
    data: XOR<TaskPackageUpdateManyMutationInput, TaskPackageUncheckedUpdateManyInput>
    /**
     * Filter which TaskPackages to update
     */
    where?: TaskPackageWhereInput
    /**
     * Limit how many TaskPackages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskPackage upsert
   */
  export type TaskPackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskPackage to update in case it exists.
     */
    where: TaskPackageWhereUniqueInput
    /**
     * In case the TaskPackage found by the `where` argument doesn't exist, create a new TaskPackage with this data.
     */
    create: XOR<TaskPackageCreateInput, TaskPackageUncheckedCreateInput>
    /**
     * In case the TaskPackage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskPackageUpdateInput, TaskPackageUncheckedUpdateInput>
  }

  /**
   * TaskPackage delete
   */
  export type TaskPackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
    /**
     * Filter which TaskPackage to delete.
     */
    where: TaskPackageWhereUniqueInput
  }

  /**
   * TaskPackage deleteMany
   */
  export type TaskPackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskPackages to delete
     */
    where?: TaskPackageWhereInput
    /**
     * Limit how many TaskPackages to delete.
     */
    limit?: number
  }

  /**
   * TaskPackage.tasks
   */
  export type TaskPackage$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * TaskPackage without action
   */
  export type TaskPackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPackage
     */
    select?: TaskPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskPackage
     */
    omit?: TaskPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPackageInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    packageId: string | null
    mediaId: string | null
    status: $Enums.TaskStatus | null
    labelerId: string | null
    checkerId: string | null
    assignedAt: Date | null
    labeledAt: Date | null
    checkedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    packageId: string | null
    mediaId: string | null
    status: $Enums.TaskStatus | null
    labelerId: string | null
    checkerId: string | null
    assignedAt: Date | null
    labeledAt: Date | null
    checkedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    packageId: number
    mediaId: number
    status: number
    labelerId: number
    checkerId: number
    assignedAt: number
    labeledAt: number
    checkedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    packageId?: true
    mediaId?: true
    status?: true
    labelerId?: true
    checkerId?: true
    assignedAt?: true
    labeledAt?: true
    checkedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    packageId?: true
    mediaId?: true
    status?: true
    labelerId?: true
    checkerId?: true
    assignedAt?: true
    labeledAt?: true
    checkedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    packageId?: true
    mediaId?: true
    status?: true
    labelerId?: true
    checkerId?: true
    assignedAt?: true
    labeledAt?: true
    checkedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    packageId: string
    mediaId: string
    status: $Enums.TaskStatus
    labelerId: string | null
    checkerId: string | null
    assignedAt: Date | null
    labeledAt: Date | null
    checkedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    mediaId?: boolean
    status?: boolean
    labelerId?: boolean
    checkerId?: boolean
    assignedAt?: boolean
    labeledAt?: boolean
    checkedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    package?: boolean | TaskPackageDefaultArgs<ExtArgs>
    media?: boolean | MediaResourceDefaultArgs<ExtArgs>
    labeler?: boolean | Task$labelerArgs<ExtArgs>
    checker?: boolean | Task$checkerArgs<ExtArgs>
    annotations?: boolean | Task$annotationsArgs<ExtArgs>
    metadata?: boolean | Task$metadataArgs<ExtArgs>
    qualityScores?: boolean | Task$qualityScoresArgs<ExtArgs>
    operationLogs?: boolean | Task$operationLogsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    mediaId?: boolean
    status?: boolean
    labelerId?: boolean
    checkerId?: boolean
    assignedAt?: boolean
    labeledAt?: boolean
    checkedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    package?: boolean | TaskPackageDefaultArgs<ExtArgs>
    media?: boolean | MediaResourceDefaultArgs<ExtArgs>
    labeler?: boolean | Task$labelerArgs<ExtArgs>
    checker?: boolean | Task$checkerArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packageId?: boolean
    mediaId?: boolean
    status?: boolean
    labelerId?: boolean
    checkerId?: boolean
    assignedAt?: boolean
    labeledAt?: boolean
    checkedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    package?: boolean | TaskPackageDefaultArgs<ExtArgs>
    media?: boolean | MediaResourceDefaultArgs<ExtArgs>
    labeler?: boolean | Task$labelerArgs<ExtArgs>
    checker?: boolean | Task$checkerArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    packageId?: boolean
    mediaId?: boolean
    status?: boolean
    labelerId?: boolean
    checkerId?: boolean
    assignedAt?: boolean
    labeledAt?: boolean
    checkedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "packageId" | "mediaId" | "status" | "labelerId" | "checkerId" | "assignedAt" | "labeledAt" | "checkedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | TaskPackageDefaultArgs<ExtArgs>
    media?: boolean | MediaResourceDefaultArgs<ExtArgs>
    labeler?: boolean | Task$labelerArgs<ExtArgs>
    checker?: boolean | Task$checkerArgs<ExtArgs>
    annotations?: boolean | Task$annotationsArgs<ExtArgs>
    metadata?: boolean | Task$metadataArgs<ExtArgs>
    qualityScores?: boolean | Task$qualityScoresArgs<ExtArgs>
    operationLogs?: boolean | Task$operationLogsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | TaskPackageDefaultArgs<ExtArgs>
    media?: boolean | MediaResourceDefaultArgs<ExtArgs>
    labeler?: boolean | Task$labelerArgs<ExtArgs>
    checker?: boolean | Task$checkerArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | TaskPackageDefaultArgs<ExtArgs>
    media?: boolean | MediaResourceDefaultArgs<ExtArgs>
    labeler?: boolean | Task$labelerArgs<ExtArgs>
    checker?: boolean | Task$checkerArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      package: Prisma.$TaskPackagePayload<ExtArgs>
      media: Prisma.$MediaResourcePayload<ExtArgs>
      labeler: Prisma.$UserPayload<ExtArgs> | null
      checker: Prisma.$UserPayload<ExtArgs> | null
      annotations: Prisma.$AnnotationPayload<ExtArgs>[]
      metadata: Prisma.$TaskMetadataPayload<ExtArgs> | null
      qualityScores: Prisma.$QualityScorePayload<ExtArgs>[]
      operationLogs: Prisma.$OperationLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      packageId: string
      mediaId: string
      status: $Enums.TaskStatus
      labelerId: string | null
      checkerId: string | null
      assignedAt: Date | null
      labeledAt: Date | null
      checkedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    package<T extends TaskPackageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskPackageDefaultArgs<ExtArgs>>): Prisma__TaskPackageClient<$Result.GetResult<Prisma.$TaskPackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    media<T extends MediaResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaResourceDefaultArgs<ExtArgs>>): Prisma__MediaResourceClient<$Result.GetResult<Prisma.$MediaResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    labeler<T extends Task$labelerArgs<ExtArgs> = {}>(args?: Subset<T, Task$labelerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    checker<T extends Task$checkerArgs<ExtArgs> = {}>(args?: Subset<T, Task$checkerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    annotations<T extends Task$annotationsArgs<ExtArgs> = {}>(args?: Subset<T, Task$annotationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    metadata<T extends Task$metadataArgs<ExtArgs> = {}>(args?: Subset<T, Task$metadataArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    qualityScores<T extends Task$qualityScoresArgs<ExtArgs> = {}>(args?: Subset<T, Task$qualityScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    operationLogs<T extends Task$operationLogsArgs<ExtArgs> = {}>(args?: Subset<T, Task$operationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly packageId: FieldRef<"Task", 'String'>
    readonly mediaId: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'TaskStatus'>
    readonly labelerId: FieldRef<"Task", 'String'>
    readonly checkerId: FieldRef<"Task", 'String'>
    readonly assignedAt: FieldRef<"Task", 'DateTime'>
    readonly labeledAt: FieldRef<"Task", 'DateTime'>
    readonly checkedAt: FieldRef<"Task", 'DateTime'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.labeler
   */
  export type Task$labelerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task.checker
   */
  export type Task$checkerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task.annotations
   */
  export type Task$annotationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    where?: AnnotationWhereInput
    orderBy?: AnnotationOrderByWithRelationInput | AnnotationOrderByWithRelationInput[]
    cursor?: AnnotationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnotationScalarFieldEnum | AnnotationScalarFieldEnum[]
  }

  /**
   * Task.metadata
   */
  export type Task$metadataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    where?: TaskMetadataWhereInput
  }

  /**
   * Task.qualityScores
   */
  export type Task$qualityScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    where?: QualityScoreWhereInput
    orderBy?: QualityScoreOrderByWithRelationInput | QualityScoreOrderByWithRelationInput[]
    cursor?: QualityScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QualityScoreScalarFieldEnum | QualityScoreScalarFieldEnum[]
  }

  /**
   * Task.operationLogs
   */
  export type Task$operationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    where?: OperationLogWhereInput
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    cursor?: OperationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OperationLogScalarFieldEnum | OperationLogScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Annotation
   */

  export type AggregateAnnotation = {
    _count: AnnotationCountAggregateOutputType | null
    _avg: AnnotationAvgAggregateOutputType | null
    _sum: AnnotationSumAggregateOutputType | null
    _min: AnnotationMinAggregateOutputType | null
    _max: AnnotationMaxAggregateOutputType | null
  }

  export type AnnotationAvgAggregateOutputType = {
    frameTime: number | null
  }

  export type AnnotationSumAggregateOutputType = {
    frameTime: number | null
  }

  export type AnnotationMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    type: $Enums.AnnotationType | null
    label: string | null
    frameTime: number | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnnotationMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    type: $Enums.AnnotationType | null
    label: string | null
    frameTime: number | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnnotationCountAggregateOutputType = {
    id: number
    taskId: number
    type: number
    coordinates: number
    label: number
    frameTime: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnnotationAvgAggregateInputType = {
    frameTime?: true
  }

  export type AnnotationSumAggregateInputType = {
    frameTime?: true
  }

  export type AnnotationMinAggregateInputType = {
    id?: true
    taskId?: true
    type?: true
    label?: true
    frameTime?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnnotationMaxAggregateInputType = {
    id?: true
    taskId?: true
    type?: true
    label?: true
    frameTime?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnnotationCountAggregateInputType = {
    id?: true
    taskId?: true
    type?: true
    coordinates?: true
    label?: true
    frameTime?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnnotationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Annotation to aggregate.
     */
    where?: AnnotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Annotations to fetch.
     */
    orderBy?: AnnotationOrderByWithRelationInput | AnnotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Annotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Annotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Annotations
    **/
    _count?: true | AnnotationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnnotationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnnotationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnotationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnotationMaxAggregateInputType
  }

  export type GetAnnotationAggregateType<T extends AnnotationAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnotation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnotation[P]>
      : GetScalarType<T[P], AggregateAnnotation[P]>
  }




  export type AnnotationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnotationWhereInput
    orderBy?: AnnotationOrderByWithAggregationInput | AnnotationOrderByWithAggregationInput[]
    by: AnnotationScalarFieldEnum[] | AnnotationScalarFieldEnum
    having?: AnnotationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnotationCountAggregateInputType | true
    _avg?: AnnotationAvgAggregateInputType
    _sum?: AnnotationSumAggregateInputType
    _min?: AnnotationMinAggregateInputType
    _max?: AnnotationMaxAggregateInputType
  }

  export type AnnotationGroupByOutputType = {
    id: string
    taskId: string
    type: $Enums.AnnotationType
    coordinates: JsonValue
    label: string | null
    frameTime: number | null
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: AnnotationCountAggregateOutputType | null
    _avg: AnnotationAvgAggregateOutputType | null
    _sum: AnnotationSumAggregateOutputType | null
    _min: AnnotationMinAggregateOutputType | null
    _max: AnnotationMaxAggregateOutputType | null
  }

  type GetAnnotationGroupByPayload<T extends AnnotationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnotationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnotationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnotationGroupByOutputType[P]>
            : GetScalarType<T[P], AnnotationGroupByOutputType[P]>
        }
      >
    >


  export type AnnotationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    type?: boolean
    coordinates?: boolean
    label?: boolean
    frameTime?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["annotation"]>

  export type AnnotationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    type?: boolean
    coordinates?: boolean
    label?: boolean
    frameTime?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["annotation"]>

  export type AnnotationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    type?: boolean
    coordinates?: boolean
    label?: boolean
    frameTime?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["annotation"]>

  export type AnnotationSelectScalar = {
    id?: boolean
    taskId?: boolean
    type?: boolean
    coordinates?: boolean
    label?: boolean
    frameTime?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnnotationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "type" | "coordinates" | "label" | "frameTime" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["annotation"]>
  export type AnnotationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnnotationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnnotationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AnnotationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Annotation"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      type: $Enums.AnnotationType
      coordinates: Prisma.JsonValue
      label: string | null
      frameTime: number | null
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["annotation"]>
    composites: {}
  }

  type AnnotationGetPayload<S extends boolean | null | undefined | AnnotationDefaultArgs> = $Result.GetResult<Prisma.$AnnotationPayload, S>

  type AnnotationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnotationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnotationCountAggregateInputType | true
    }

  export interface AnnotationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Annotation'], meta: { name: 'Annotation' } }
    /**
     * Find zero or one Annotation that matches the filter.
     * @param {AnnotationFindUniqueArgs} args - Arguments to find a Annotation
     * @example
     * // Get one Annotation
     * const annotation = await prisma.annotation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnotationFindUniqueArgs>(args: SelectSubset<T, AnnotationFindUniqueArgs<ExtArgs>>): Prisma__AnnotationClient<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Annotation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnotationFindUniqueOrThrowArgs} args - Arguments to find a Annotation
     * @example
     * // Get one Annotation
     * const annotation = await prisma.annotation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnotationFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnotationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnotationClient<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Annotation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnotationFindFirstArgs} args - Arguments to find a Annotation
     * @example
     * // Get one Annotation
     * const annotation = await prisma.annotation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnotationFindFirstArgs>(args?: SelectSubset<T, AnnotationFindFirstArgs<ExtArgs>>): Prisma__AnnotationClient<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Annotation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnotationFindFirstOrThrowArgs} args - Arguments to find a Annotation
     * @example
     * // Get one Annotation
     * const annotation = await prisma.annotation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnotationFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnotationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnotationClient<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Annotations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnotationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Annotations
     * const annotations = await prisma.annotation.findMany()
     * 
     * // Get first 10 Annotations
     * const annotations = await prisma.annotation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const annotationWithIdOnly = await prisma.annotation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnotationFindManyArgs>(args?: SelectSubset<T, AnnotationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Annotation.
     * @param {AnnotationCreateArgs} args - Arguments to create a Annotation.
     * @example
     * // Create one Annotation
     * const Annotation = await prisma.annotation.create({
     *   data: {
     *     // ... data to create a Annotation
     *   }
     * })
     * 
     */
    create<T extends AnnotationCreateArgs>(args: SelectSubset<T, AnnotationCreateArgs<ExtArgs>>): Prisma__AnnotationClient<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Annotations.
     * @param {AnnotationCreateManyArgs} args - Arguments to create many Annotations.
     * @example
     * // Create many Annotations
     * const annotation = await prisma.annotation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnotationCreateManyArgs>(args?: SelectSubset<T, AnnotationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Annotations and returns the data saved in the database.
     * @param {AnnotationCreateManyAndReturnArgs} args - Arguments to create many Annotations.
     * @example
     * // Create many Annotations
     * const annotation = await prisma.annotation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Annotations and only return the `id`
     * const annotationWithIdOnly = await prisma.annotation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnnotationCreateManyAndReturnArgs>(args?: SelectSubset<T, AnnotationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Annotation.
     * @param {AnnotationDeleteArgs} args - Arguments to delete one Annotation.
     * @example
     * // Delete one Annotation
     * const Annotation = await prisma.annotation.delete({
     *   where: {
     *     // ... filter to delete one Annotation
     *   }
     * })
     * 
     */
    delete<T extends AnnotationDeleteArgs>(args: SelectSubset<T, AnnotationDeleteArgs<ExtArgs>>): Prisma__AnnotationClient<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Annotation.
     * @param {AnnotationUpdateArgs} args - Arguments to update one Annotation.
     * @example
     * // Update one Annotation
     * const annotation = await prisma.annotation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnotationUpdateArgs>(args: SelectSubset<T, AnnotationUpdateArgs<ExtArgs>>): Prisma__AnnotationClient<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Annotations.
     * @param {AnnotationDeleteManyArgs} args - Arguments to filter Annotations to delete.
     * @example
     * // Delete a few Annotations
     * const { count } = await prisma.annotation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnotationDeleteManyArgs>(args?: SelectSubset<T, AnnotationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Annotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnotationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Annotations
     * const annotation = await prisma.annotation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnotationUpdateManyArgs>(args: SelectSubset<T, AnnotationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Annotations and returns the data updated in the database.
     * @param {AnnotationUpdateManyAndReturnArgs} args - Arguments to update many Annotations.
     * @example
     * // Update many Annotations
     * const annotation = await prisma.annotation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Annotations and only return the `id`
     * const annotationWithIdOnly = await prisma.annotation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnnotationUpdateManyAndReturnArgs>(args: SelectSubset<T, AnnotationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Annotation.
     * @param {AnnotationUpsertArgs} args - Arguments to update or create a Annotation.
     * @example
     * // Update or create a Annotation
     * const annotation = await prisma.annotation.upsert({
     *   create: {
     *     // ... data to create a Annotation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Annotation we want to update
     *   }
     * })
     */
    upsert<T extends AnnotationUpsertArgs>(args: SelectSubset<T, AnnotationUpsertArgs<ExtArgs>>): Prisma__AnnotationClient<$Result.GetResult<Prisma.$AnnotationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Annotations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnotationCountArgs} args - Arguments to filter Annotations to count.
     * @example
     * // Count the number of Annotations
     * const count = await prisma.annotation.count({
     *   where: {
     *     // ... the filter for the Annotations we want to count
     *   }
     * })
    **/
    count<T extends AnnotationCountArgs>(
      args?: Subset<T, AnnotationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnotationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Annotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnotationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnnotationAggregateArgs>(args: Subset<T, AnnotationAggregateArgs>): Prisma.PrismaPromise<GetAnnotationAggregateType<T>>

    /**
     * Group by Annotation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnotationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnnotationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnotationGroupByArgs['orderBy'] }
        : { orderBy?: AnnotationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnnotationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnotationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Annotation model
   */
  readonly fields: AnnotationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Annotation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnotationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Annotation model
   */
  interface AnnotationFieldRefs {
    readonly id: FieldRef<"Annotation", 'String'>
    readonly taskId: FieldRef<"Annotation", 'String'>
    readonly type: FieldRef<"Annotation", 'AnnotationType'>
    readonly coordinates: FieldRef<"Annotation", 'Json'>
    readonly label: FieldRef<"Annotation", 'String'>
    readonly frameTime: FieldRef<"Annotation", 'Float'>
    readonly createdById: FieldRef<"Annotation", 'String'>
    readonly createdAt: FieldRef<"Annotation", 'DateTime'>
    readonly updatedAt: FieldRef<"Annotation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Annotation findUnique
   */
  export type AnnotationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * Filter, which Annotation to fetch.
     */
    where: AnnotationWhereUniqueInput
  }

  /**
   * Annotation findUniqueOrThrow
   */
  export type AnnotationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * Filter, which Annotation to fetch.
     */
    where: AnnotationWhereUniqueInput
  }

  /**
   * Annotation findFirst
   */
  export type AnnotationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * Filter, which Annotation to fetch.
     */
    where?: AnnotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Annotations to fetch.
     */
    orderBy?: AnnotationOrderByWithRelationInput | AnnotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Annotations.
     */
    cursor?: AnnotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Annotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Annotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Annotations.
     */
    distinct?: AnnotationScalarFieldEnum | AnnotationScalarFieldEnum[]
  }

  /**
   * Annotation findFirstOrThrow
   */
  export type AnnotationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * Filter, which Annotation to fetch.
     */
    where?: AnnotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Annotations to fetch.
     */
    orderBy?: AnnotationOrderByWithRelationInput | AnnotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Annotations.
     */
    cursor?: AnnotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Annotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Annotations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Annotations.
     */
    distinct?: AnnotationScalarFieldEnum | AnnotationScalarFieldEnum[]
  }

  /**
   * Annotation findMany
   */
  export type AnnotationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * Filter, which Annotations to fetch.
     */
    where?: AnnotationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Annotations to fetch.
     */
    orderBy?: AnnotationOrderByWithRelationInput | AnnotationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Annotations.
     */
    cursor?: AnnotationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Annotations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Annotations.
     */
    skip?: number
    distinct?: AnnotationScalarFieldEnum | AnnotationScalarFieldEnum[]
  }

  /**
   * Annotation create
   */
  export type AnnotationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * The data needed to create a Annotation.
     */
    data: XOR<AnnotationCreateInput, AnnotationUncheckedCreateInput>
  }

  /**
   * Annotation createMany
   */
  export type AnnotationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Annotations.
     */
    data: AnnotationCreateManyInput | AnnotationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Annotation createManyAndReturn
   */
  export type AnnotationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * The data used to create many Annotations.
     */
    data: AnnotationCreateManyInput | AnnotationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Annotation update
   */
  export type AnnotationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * The data needed to update a Annotation.
     */
    data: XOR<AnnotationUpdateInput, AnnotationUncheckedUpdateInput>
    /**
     * Choose, which Annotation to update.
     */
    where: AnnotationWhereUniqueInput
  }

  /**
   * Annotation updateMany
   */
  export type AnnotationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Annotations.
     */
    data: XOR<AnnotationUpdateManyMutationInput, AnnotationUncheckedUpdateManyInput>
    /**
     * Filter which Annotations to update
     */
    where?: AnnotationWhereInput
    /**
     * Limit how many Annotations to update.
     */
    limit?: number
  }

  /**
   * Annotation updateManyAndReturn
   */
  export type AnnotationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * The data used to update Annotations.
     */
    data: XOR<AnnotationUpdateManyMutationInput, AnnotationUncheckedUpdateManyInput>
    /**
     * Filter which Annotations to update
     */
    where?: AnnotationWhereInput
    /**
     * Limit how many Annotations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Annotation upsert
   */
  export type AnnotationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * The filter to search for the Annotation to update in case it exists.
     */
    where: AnnotationWhereUniqueInput
    /**
     * In case the Annotation found by the `where` argument doesn't exist, create a new Annotation with this data.
     */
    create: XOR<AnnotationCreateInput, AnnotationUncheckedCreateInput>
    /**
     * In case the Annotation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnotationUpdateInput, AnnotationUncheckedUpdateInput>
  }

  /**
   * Annotation delete
   */
  export type AnnotationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
    /**
     * Filter which Annotation to delete.
     */
    where: AnnotationWhereUniqueInput
  }

  /**
   * Annotation deleteMany
   */
  export type AnnotationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Annotations to delete
     */
    where?: AnnotationWhereInput
    /**
     * Limit how many Annotations to delete.
     */
    limit?: number
  }

  /**
   * Annotation without action
   */
  export type AnnotationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Annotation
     */
    select?: AnnotationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Annotation
     */
    omit?: AnnotationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnotationInclude<ExtArgs> | null
  }


  /**
   * Model TaskMetadata
   */

  export type AggregateTaskMetadata = {
    _count: TaskMetadataCountAggregateOutputType | null
    _min: TaskMetadataMinAggregateOutputType | null
    _max: TaskMetadataMaxAggregateOutputType | null
  }

  export type TaskMetadataMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    remarks: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMetadataMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    remarks: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMetadataCountAggregateOutputType = {
    id: number
    taskId: number
    remarks: number
    videoClips: number
    croppedAreas: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskMetadataMinAggregateInputType = {
    id?: true
    taskId?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMetadataMaxAggregateInputType = {
    id?: true
    taskId?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMetadataCountAggregateInputType = {
    id?: true
    taskId?: true
    remarks?: true
    videoClips?: true
    croppedAreas?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskMetadataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskMetadata to aggregate.
     */
    where?: TaskMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskMetadata to fetch.
     */
    orderBy?: TaskMetadataOrderByWithRelationInput | TaskMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskMetadata
    **/
    _count?: true | TaskMetadataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMetadataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMetadataMaxAggregateInputType
  }

  export type GetTaskMetadataAggregateType<T extends TaskMetadataAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskMetadata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskMetadata[P]>
      : GetScalarType<T[P], AggregateTaskMetadata[P]>
  }




  export type TaskMetadataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskMetadataWhereInput
    orderBy?: TaskMetadataOrderByWithAggregationInput | TaskMetadataOrderByWithAggregationInput[]
    by: TaskMetadataScalarFieldEnum[] | TaskMetadataScalarFieldEnum
    having?: TaskMetadataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskMetadataCountAggregateInputType | true
    _min?: TaskMetadataMinAggregateInputType
    _max?: TaskMetadataMaxAggregateInputType
  }

  export type TaskMetadataGroupByOutputType = {
    id: string
    taskId: string
    remarks: string | null
    videoClips: JsonValue | null
    croppedAreas: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: TaskMetadataCountAggregateOutputType | null
    _min: TaskMetadataMinAggregateOutputType | null
    _max: TaskMetadataMaxAggregateOutputType | null
  }

  type GetTaskMetadataGroupByPayload<T extends TaskMetadataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskMetadataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskMetadataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskMetadataGroupByOutputType[P]>
            : GetScalarType<T[P], TaskMetadataGroupByOutputType[P]>
        }
      >
    >


  export type TaskMetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    remarks?: boolean
    videoClips?: boolean
    croppedAreas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskMetadata"]>

  export type TaskMetadataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    remarks?: boolean
    videoClips?: boolean
    croppedAreas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskMetadata"]>

  export type TaskMetadataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    remarks?: boolean
    videoClips?: boolean
    croppedAreas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskMetadata"]>

  export type TaskMetadataSelectScalar = {
    id?: boolean
    taskId?: boolean
    remarks?: boolean
    videoClips?: boolean
    croppedAreas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskMetadataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "remarks" | "videoClips" | "croppedAreas" | "createdAt" | "updatedAt", ExtArgs["result"]["taskMetadata"]>
  export type TaskMetadataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TaskMetadataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TaskMetadataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $TaskMetadataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskMetadata"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      remarks: string | null
      videoClips: Prisma.JsonValue | null
      croppedAreas: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskMetadata"]>
    composites: {}
  }

  type TaskMetadataGetPayload<S extends boolean | null | undefined | TaskMetadataDefaultArgs> = $Result.GetResult<Prisma.$TaskMetadataPayload, S>

  type TaskMetadataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskMetadataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskMetadataCountAggregateInputType | true
    }

  export interface TaskMetadataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskMetadata'], meta: { name: 'TaskMetadata' } }
    /**
     * Find zero or one TaskMetadata that matches the filter.
     * @param {TaskMetadataFindUniqueArgs} args - Arguments to find a TaskMetadata
     * @example
     * // Get one TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskMetadataFindUniqueArgs>(args: SelectSubset<T, TaskMetadataFindUniqueArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskMetadata that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskMetadataFindUniqueOrThrowArgs} args - Arguments to find a TaskMetadata
     * @example
     * // Get one TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskMetadataFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskMetadataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMetadataFindFirstArgs} args - Arguments to find a TaskMetadata
     * @example
     * // Get one TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskMetadataFindFirstArgs>(args?: SelectSubset<T, TaskMetadataFindFirstArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskMetadata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMetadataFindFirstOrThrowArgs} args - Arguments to find a TaskMetadata
     * @example
     * // Get one TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskMetadataFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskMetadataFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMetadataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.findMany()
     * 
     * // Get first 10 TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskMetadataWithIdOnly = await prisma.taskMetadata.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskMetadataFindManyArgs>(args?: SelectSubset<T, TaskMetadataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskMetadata.
     * @param {TaskMetadataCreateArgs} args - Arguments to create a TaskMetadata.
     * @example
     * // Create one TaskMetadata
     * const TaskMetadata = await prisma.taskMetadata.create({
     *   data: {
     *     // ... data to create a TaskMetadata
     *   }
     * })
     * 
     */
    create<T extends TaskMetadataCreateArgs>(args: SelectSubset<T, TaskMetadataCreateArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskMetadata.
     * @param {TaskMetadataCreateManyArgs} args - Arguments to create many TaskMetadata.
     * @example
     * // Create many TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskMetadataCreateManyArgs>(args?: SelectSubset<T, TaskMetadataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskMetadata and returns the data saved in the database.
     * @param {TaskMetadataCreateManyAndReturnArgs} args - Arguments to create many TaskMetadata.
     * @example
     * // Create many TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskMetadata and only return the `id`
     * const taskMetadataWithIdOnly = await prisma.taskMetadata.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskMetadataCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskMetadataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskMetadata.
     * @param {TaskMetadataDeleteArgs} args - Arguments to delete one TaskMetadata.
     * @example
     * // Delete one TaskMetadata
     * const TaskMetadata = await prisma.taskMetadata.delete({
     *   where: {
     *     // ... filter to delete one TaskMetadata
     *   }
     * })
     * 
     */
    delete<T extends TaskMetadataDeleteArgs>(args: SelectSubset<T, TaskMetadataDeleteArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskMetadata.
     * @param {TaskMetadataUpdateArgs} args - Arguments to update one TaskMetadata.
     * @example
     * // Update one TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskMetadataUpdateArgs>(args: SelectSubset<T, TaskMetadataUpdateArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskMetadata.
     * @param {TaskMetadataDeleteManyArgs} args - Arguments to filter TaskMetadata to delete.
     * @example
     * // Delete a few TaskMetadata
     * const { count } = await prisma.taskMetadata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskMetadataDeleteManyArgs>(args?: SelectSubset<T, TaskMetadataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMetadataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskMetadataUpdateManyArgs>(args: SelectSubset<T, TaskMetadataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskMetadata and returns the data updated in the database.
     * @param {TaskMetadataUpdateManyAndReturnArgs} args - Arguments to update many TaskMetadata.
     * @example
     * // Update many TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskMetadata and only return the `id`
     * const taskMetadataWithIdOnly = await prisma.taskMetadata.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskMetadataUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskMetadataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskMetadata.
     * @param {TaskMetadataUpsertArgs} args - Arguments to update or create a TaskMetadata.
     * @example
     * // Update or create a TaskMetadata
     * const taskMetadata = await prisma.taskMetadata.upsert({
     *   create: {
     *     // ... data to create a TaskMetadata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskMetadata we want to update
     *   }
     * })
     */
    upsert<T extends TaskMetadataUpsertArgs>(args: SelectSubset<T, TaskMetadataUpsertArgs<ExtArgs>>): Prisma__TaskMetadataClient<$Result.GetResult<Prisma.$TaskMetadataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMetadataCountArgs} args - Arguments to filter TaskMetadata to count.
     * @example
     * // Count the number of TaskMetadata
     * const count = await prisma.taskMetadata.count({
     *   where: {
     *     // ... the filter for the TaskMetadata we want to count
     *   }
     * })
    **/
    count<T extends TaskMetadataCountArgs>(
      args?: Subset<T, TaskMetadataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskMetadataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMetadataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskMetadataAggregateArgs>(args: Subset<T, TaskMetadataAggregateArgs>): Prisma.PrismaPromise<GetTaskMetadataAggregateType<T>>

    /**
     * Group by TaskMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMetadataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskMetadataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskMetadataGroupByArgs['orderBy'] }
        : { orderBy?: TaskMetadataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskMetadataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskMetadataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskMetadata model
   */
  readonly fields: TaskMetadataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskMetadata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskMetadataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskMetadata model
   */
  interface TaskMetadataFieldRefs {
    readonly id: FieldRef<"TaskMetadata", 'String'>
    readonly taskId: FieldRef<"TaskMetadata", 'String'>
    readonly remarks: FieldRef<"TaskMetadata", 'String'>
    readonly videoClips: FieldRef<"TaskMetadata", 'Json'>
    readonly croppedAreas: FieldRef<"TaskMetadata", 'Json'>
    readonly createdAt: FieldRef<"TaskMetadata", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskMetadata", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskMetadata findUnique
   */
  export type TaskMetadataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * Filter, which TaskMetadata to fetch.
     */
    where: TaskMetadataWhereUniqueInput
  }

  /**
   * TaskMetadata findUniqueOrThrow
   */
  export type TaskMetadataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * Filter, which TaskMetadata to fetch.
     */
    where: TaskMetadataWhereUniqueInput
  }

  /**
   * TaskMetadata findFirst
   */
  export type TaskMetadataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * Filter, which TaskMetadata to fetch.
     */
    where?: TaskMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskMetadata to fetch.
     */
    orderBy?: TaskMetadataOrderByWithRelationInput | TaskMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskMetadata.
     */
    cursor?: TaskMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskMetadata.
     */
    distinct?: TaskMetadataScalarFieldEnum | TaskMetadataScalarFieldEnum[]
  }

  /**
   * TaskMetadata findFirstOrThrow
   */
  export type TaskMetadataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * Filter, which TaskMetadata to fetch.
     */
    where?: TaskMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskMetadata to fetch.
     */
    orderBy?: TaskMetadataOrderByWithRelationInput | TaskMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskMetadata.
     */
    cursor?: TaskMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskMetadata.
     */
    distinct?: TaskMetadataScalarFieldEnum | TaskMetadataScalarFieldEnum[]
  }

  /**
   * TaskMetadata findMany
   */
  export type TaskMetadataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * Filter, which TaskMetadata to fetch.
     */
    where?: TaskMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskMetadata to fetch.
     */
    orderBy?: TaskMetadataOrderByWithRelationInput | TaskMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskMetadata.
     */
    cursor?: TaskMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskMetadata.
     */
    skip?: number
    distinct?: TaskMetadataScalarFieldEnum | TaskMetadataScalarFieldEnum[]
  }

  /**
   * TaskMetadata create
   */
  export type TaskMetadataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskMetadata.
     */
    data: XOR<TaskMetadataCreateInput, TaskMetadataUncheckedCreateInput>
  }

  /**
   * TaskMetadata createMany
   */
  export type TaskMetadataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskMetadata.
     */
    data: TaskMetadataCreateManyInput | TaskMetadataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskMetadata createManyAndReturn
   */
  export type TaskMetadataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * The data used to create many TaskMetadata.
     */
    data: TaskMetadataCreateManyInput | TaskMetadataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskMetadata update
   */
  export type TaskMetadataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskMetadata.
     */
    data: XOR<TaskMetadataUpdateInput, TaskMetadataUncheckedUpdateInput>
    /**
     * Choose, which TaskMetadata to update.
     */
    where: TaskMetadataWhereUniqueInput
  }

  /**
   * TaskMetadata updateMany
   */
  export type TaskMetadataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskMetadata.
     */
    data: XOR<TaskMetadataUpdateManyMutationInput, TaskMetadataUncheckedUpdateManyInput>
    /**
     * Filter which TaskMetadata to update
     */
    where?: TaskMetadataWhereInput
    /**
     * Limit how many TaskMetadata to update.
     */
    limit?: number
  }

  /**
   * TaskMetadata updateManyAndReturn
   */
  export type TaskMetadataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * The data used to update TaskMetadata.
     */
    data: XOR<TaskMetadataUpdateManyMutationInput, TaskMetadataUncheckedUpdateManyInput>
    /**
     * Filter which TaskMetadata to update
     */
    where?: TaskMetadataWhereInput
    /**
     * Limit how many TaskMetadata to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskMetadata upsert
   */
  export type TaskMetadataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskMetadata to update in case it exists.
     */
    where: TaskMetadataWhereUniqueInput
    /**
     * In case the TaskMetadata found by the `where` argument doesn't exist, create a new TaskMetadata with this data.
     */
    create: XOR<TaskMetadataCreateInput, TaskMetadataUncheckedCreateInput>
    /**
     * In case the TaskMetadata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskMetadataUpdateInput, TaskMetadataUncheckedUpdateInput>
  }

  /**
   * TaskMetadata delete
   */
  export type TaskMetadataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
    /**
     * Filter which TaskMetadata to delete.
     */
    where: TaskMetadataWhereUniqueInput
  }

  /**
   * TaskMetadata deleteMany
   */
  export type TaskMetadataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskMetadata to delete
     */
    where?: TaskMetadataWhereInput
    /**
     * Limit how many TaskMetadata to delete.
     */
    limit?: number
  }

  /**
   * TaskMetadata without action
   */
  export type TaskMetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMetadata
     */
    select?: TaskMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMetadata
     */
    omit?: TaskMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMetadataInclude<ExtArgs> | null
  }


  /**
   * Model QualityScore
   */

  export type AggregateQualityScore = {
    _count: QualityScoreCountAggregateOutputType | null
    _avg: QualityScoreAvgAggregateOutputType | null
    _sum: QualityScoreSumAggregateOutputType | null
    _min: QualityScoreMinAggregateOutputType | null
    _max: QualityScoreMaxAggregateOutputType | null
  }

  export type QualityScoreAvgAggregateOutputType = {
    score: number | null
  }

  export type QualityScoreSumAggregateOutputType = {
    score: number | null
  }

  export type QualityScoreMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    score: number | null
    createdById: string | null
    createdAt: Date | null
  }

  export type QualityScoreMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    score: number | null
    createdById: string | null
    createdAt: Date | null
  }

  export type QualityScoreCountAggregateOutputType = {
    id: number
    taskId: number
    score: number
    createdById: number
    createdAt: number
    _all: number
  }


  export type QualityScoreAvgAggregateInputType = {
    score?: true
  }

  export type QualityScoreSumAggregateInputType = {
    score?: true
  }

  export type QualityScoreMinAggregateInputType = {
    id?: true
    taskId?: true
    score?: true
    createdById?: true
    createdAt?: true
  }

  export type QualityScoreMaxAggregateInputType = {
    id?: true
    taskId?: true
    score?: true
    createdById?: true
    createdAt?: true
  }

  export type QualityScoreCountAggregateInputType = {
    id?: true
    taskId?: true
    score?: true
    createdById?: true
    createdAt?: true
    _all?: true
  }

  export type QualityScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QualityScore to aggregate.
     */
    where?: QualityScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QualityScores to fetch.
     */
    orderBy?: QualityScoreOrderByWithRelationInput | QualityScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QualityScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QualityScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QualityScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QualityScores
    **/
    _count?: true | QualityScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QualityScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QualityScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QualityScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QualityScoreMaxAggregateInputType
  }

  export type GetQualityScoreAggregateType<T extends QualityScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateQualityScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQualityScore[P]>
      : GetScalarType<T[P], AggregateQualityScore[P]>
  }




  export type QualityScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QualityScoreWhereInput
    orderBy?: QualityScoreOrderByWithAggregationInput | QualityScoreOrderByWithAggregationInput[]
    by: QualityScoreScalarFieldEnum[] | QualityScoreScalarFieldEnum
    having?: QualityScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QualityScoreCountAggregateInputType | true
    _avg?: QualityScoreAvgAggregateInputType
    _sum?: QualityScoreSumAggregateInputType
    _min?: QualityScoreMinAggregateInputType
    _max?: QualityScoreMaxAggregateInputType
  }

  export type QualityScoreGroupByOutputType = {
    id: string
    taskId: string
    score: number
    createdById: string
    createdAt: Date
    _count: QualityScoreCountAggregateOutputType | null
    _avg: QualityScoreAvgAggregateOutputType | null
    _sum: QualityScoreSumAggregateOutputType | null
    _min: QualityScoreMinAggregateOutputType | null
    _max: QualityScoreMaxAggregateOutputType | null
  }

  type GetQualityScoreGroupByPayload<T extends QualityScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QualityScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QualityScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QualityScoreGroupByOutputType[P]>
            : GetScalarType<T[P], QualityScoreGroupByOutputType[P]>
        }
      >
    >


  export type QualityScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    score?: boolean
    createdById?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qualityScore"]>

  export type QualityScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    score?: boolean
    createdById?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qualityScore"]>

  export type QualityScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    score?: boolean
    createdById?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qualityScore"]>

  export type QualityScoreSelectScalar = {
    id?: boolean
    taskId?: boolean
    score?: boolean
    createdById?: boolean
    createdAt?: boolean
  }

  export type QualityScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "score" | "createdById" | "createdAt", ExtArgs["result"]["qualityScore"]>
  export type QualityScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QualityScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QualityScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QualityScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QualityScore"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      score: number
      createdById: string
      createdAt: Date
    }, ExtArgs["result"]["qualityScore"]>
    composites: {}
  }

  type QualityScoreGetPayload<S extends boolean | null | undefined | QualityScoreDefaultArgs> = $Result.GetResult<Prisma.$QualityScorePayload, S>

  type QualityScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QualityScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QualityScoreCountAggregateInputType | true
    }

  export interface QualityScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QualityScore'], meta: { name: 'QualityScore' } }
    /**
     * Find zero or one QualityScore that matches the filter.
     * @param {QualityScoreFindUniqueArgs} args - Arguments to find a QualityScore
     * @example
     * // Get one QualityScore
     * const qualityScore = await prisma.qualityScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QualityScoreFindUniqueArgs>(args: SelectSubset<T, QualityScoreFindUniqueArgs<ExtArgs>>): Prisma__QualityScoreClient<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QualityScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QualityScoreFindUniqueOrThrowArgs} args - Arguments to find a QualityScore
     * @example
     * // Get one QualityScore
     * const qualityScore = await prisma.qualityScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QualityScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, QualityScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QualityScoreClient<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QualityScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityScoreFindFirstArgs} args - Arguments to find a QualityScore
     * @example
     * // Get one QualityScore
     * const qualityScore = await prisma.qualityScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QualityScoreFindFirstArgs>(args?: SelectSubset<T, QualityScoreFindFirstArgs<ExtArgs>>): Prisma__QualityScoreClient<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QualityScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityScoreFindFirstOrThrowArgs} args - Arguments to find a QualityScore
     * @example
     * // Get one QualityScore
     * const qualityScore = await prisma.qualityScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QualityScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, QualityScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__QualityScoreClient<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QualityScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QualityScores
     * const qualityScores = await prisma.qualityScore.findMany()
     * 
     * // Get first 10 QualityScores
     * const qualityScores = await prisma.qualityScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qualityScoreWithIdOnly = await prisma.qualityScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QualityScoreFindManyArgs>(args?: SelectSubset<T, QualityScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QualityScore.
     * @param {QualityScoreCreateArgs} args - Arguments to create a QualityScore.
     * @example
     * // Create one QualityScore
     * const QualityScore = await prisma.qualityScore.create({
     *   data: {
     *     // ... data to create a QualityScore
     *   }
     * })
     * 
     */
    create<T extends QualityScoreCreateArgs>(args: SelectSubset<T, QualityScoreCreateArgs<ExtArgs>>): Prisma__QualityScoreClient<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QualityScores.
     * @param {QualityScoreCreateManyArgs} args - Arguments to create many QualityScores.
     * @example
     * // Create many QualityScores
     * const qualityScore = await prisma.qualityScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QualityScoreCreateManyArgs>(args?: SelectSubset<T, QualityScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QualityScores and returns the data saved in the database.
     * @param {QualityScoreCreateManyAndReturnArgs} args - Arguments to create many QualityScores.
     * @example
     * // Create many QualityScores
     * const qualityScore = await prisma.qualityScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QualityScores and only return the `id`
     * const qualityScoreWithIdOnly = await prisma.qualityScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QualityScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, QualityScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QualityScore.
     * @param {QualityScoreDeleteArgs} args - Arguments to delete one QualityScore.
     * @example
     * // Delete one QualityScore
     * const QualityScore = await prisma.qualityScore.delete({
     *   where: {
     *     // ... filter to delete one QualityScore
     *   }
     * })
     * 
     */
    delete<T extends QualityScoreDeleteArgs>(args: SelectSubset<T, QualityScoreDeleteArgs<ExtArgs>>): Prisma__QualityScoreClient<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QualityScore.
     * @param {QualityScoreUpdateArgs} args - Arguments to update one QualityScore.
     * @example
     * // Update one QualityScore
     * const qualityScore = await prisma.qualityScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QualityScoreUpdateArgs>(args: SelectSubset<T, QualityScoreUpdateArgs<ExtArgs>>): Prisma__QualityScoreClient<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QualityScores.
     * @param {QualityScoreDeleteManyArgs} args - Arguments to filter QualityScores to delete.
     * @example
     * // Delete a few QualityScores
     * const { count } = await prisma.qualityScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QualityScoreDeleteManyArgs>(args?: SelectSubset<T, QualityScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QualityScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QualityScores
     * const qualityScore = await prisma.qualityScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QualityScoreUpdateManyArgs>(args: SelectSubset<T, QualityScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QualityScores and returns the data updated in the database.
     * @param {QualityScoreUpdateManyAndReturnArgs} args - Arguments to update many QualityScores.
     * @example
     * // Update many QualityScores
     * const qualityScore = await prisma.qualityScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QualityScores and only return the `id`
     * const qualityScoreWithIdOnly = await prisma.qualityScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QualityScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, QualityScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QualityScore.
     * @param {QualityScoreUpsertArgs} args - Arguments to update or create a QualityScore.
     * @example
     * // Update or create a QualityScore
     * const qualityScore = await prisma.qualityScore.upsert({
     *   create: {
     *     // ... data to create a QualityScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QualityScore we want to update
     *   }
     * })
     */
    upsert<T extends QualityScoreUpsertArgs>(args: SelectSubset<T, QualityScoreUpsertArgs<ExtArgs>>): Prisma__QualityScoreClient<$Result.GetResult<Prisma.$QualityScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QualityScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityScoreCountArgs} args - Arguments to filter QualityScores to count.
     * @example
     * // Count the number of QualityScores
     * const count = await prisma.qualityScore.count({
     *   where: {
     *     // ... the filter for the QualityScores we want to count
     *   }
     * })
    **/
    count<T extends QualityScoreCountArgs>(
      args?: Subset<T, QualityScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QualityScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QualityScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QualityScoreAggregateArgs>(args: Subset<T, QualityScoreAggregateArgs>): Prisma.PrismaPromise<GetQualityScoreAggregateType<T>>

    /**
     * Group by QualityScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualityScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QualityScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QualityScoreGroupByArgs['orderBy'] }
        : { orderBy?: QualityScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QualityScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQualityScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QualityScore model
   */
  readonly fields: QualityScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QualityScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QualityScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QualityScore model
   */
  interface QualityScoreFieldRefs {
    readonly id: FieldRef<"QualityScore", 'String'>
    readonly taskId: FieldRef<"QualityScore", 'String'>
    readonly score: FieldRef<"QualityScore", 'Int'>
    readonly createdById: FieldRef<"QualityScore", 'String'>
    readonly createdAt: FieldRef<"QualityScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QualityScore findUnique
   */
  export type QualityScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * Filter, which QualityScore to fetch.
     */
    where: QualityScoreWhereUniqueInput
  }

  /**
   * QualityScore findUniqueOrThrow
   */
  export type QualityScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * Filter, which QualityScore to fetch.
     */
    where: QualityScoreWhereUniqueInput
  }

  /**
   * QualityScore findFirst
   */
  export type QualityScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * Filter, which QualityScore to fetch.
     */
    where?: QualityScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QualityScores to fetch.
     */
    orderBy?: QualityScoreOrderByWithRelationInput | QualityScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QualityScores.
     */
    cursor?: QualityScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QualityScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QualityScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QualityScores.
     */
    distinct?: QualityScoreScalarFieldEnum | QualityScoreScalarFieldEnum[]
  }

  /**
   * QualityScore findFirstOrThrow
   */
  export type QualityScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * Filter, which QualityScore to fetch.
     */
    where?: QualityScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QualityScores to fetch.
     */
    orderBy?: QualityScoreOrderByWithRelationInput | QualityScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QualityScores.
     */
    cursor?: QualityScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QualityScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QualityScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QualityScores.
     */
    distinct?: QualityScoreScalarFieldEnum | QualityScoreScalarFieldEnum[]
  }

  /**
   * QualityScore findMany
   */
  export type QualityScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * Filter, which QualityScores to fetch.
     */
    where?: QualityScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QualityScores to fetch.
     */
    orderBy?: QualityScoreOrderByWithRelationInput | QualityScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QualityScores.
     */
    cursor?: QualityScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QualityScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QualityScores.
     */
    skip?: number
    distinct?: QualityScoreScalarFieldEnum | QualityScoreScalarFieldEnum[]
  }

  /**
   * QualityScore create
   */
  export type QualityScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a QualityScore.
     */
    data: XOR<QualityScoreCreateInput, QualityScoreUncheckedCreateInput>
  }

  /**
   * QualityScore createMany
   */
  export type QualityScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QualityScores.
     */
    data: QualityScoreCreateManyInput | QualityScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QualityScore createManyAndReturn
   */
  export type QualityScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * The data used to create many QualityScores.
     */
    data: QualityScoreCreateManyInput | QualityScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QualityScore update
   */
  export type QualityScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a QualityScore.
     */
    data: XOR<QualityScoreUpdateInput, QualityScoreUncheckedUpdateInput>
    /**
     * Choose, which QualityScore to update.
     */
    where: QualityScoreWhereUniqueInput
  }

  /**
   * QualityScore updateMany
   */
  export type QualityScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QualityScores.
     */
    data: XOR<QualityScoreUpdateManyMutationInput, QualityScoreUncheckedUpdateManyInput>
    /**
     * Filter which QualityScores to update
     */
    where?: QualityScoreWhereInput
    /**
     * Limit how many QualityScores to update.
     */
    limit?: number
  }

  /**
   * QualityScore updateManyAndReturn
   */
  export type QualityScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * The data used to update QualityScores.
     */
    data: XOR<QualityScoreUpdateManyMutationInput, QualityScoreUncheckedUpdateManyInput>
    /**
     * Filter which QualityScores to update
     */
    where?: QualityScoreWhereInput
    /**
     * Limit how many QualityScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QualityScore upsert
   */
  export type QualityScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the QualityScore to update in case it exists.
     */
    where: QualityScoreWhereUniqueInput
    /**
     * In case the QualityScore found by the `where` argument doesn't exist, create a new QualityScore with this data.
     */
    create: XOR<QualityScoreCreateInput, QualityScoreUncheckedCreateInput>
    /**
     * In case the QualityScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QualityScoreUpdateInput, QualityScoreUncheckedUpdateInput>
  }

  /**
   * QualityScore delete
   */
  export type QualityScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
    /**
     * Filter which QualityScore to delete.
     */
    where: QualityScoreWhereUniqueInput
  }

  /**
   * QualityScore deleteMany
   */
  export type QualityScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QualityScores to delete
     */
    where?: QualityScoreWhereInput
    /**
     * Limit how many QualityScores to delete.
     */
    limit?: number
  }

  /**
   * QualityScore without action
   */
  export type QualityScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualityScore
     */
    select?: QualityScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QualityScore
     */
    omit?: QualityScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualityScoreInclude<ExtArgs> | null
  }


  /**
   * Model OperationLog
   */

  export type AggregateOperationLog = {
    _count: OperationLogCountAggregateOutputType | null
    _min: OperationLogMinAggregateOutputType | null
    _max: OperationLogMaxAggregateOutputType | null
  }

  export type OperationLogMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    userId: string | null
    action: string | null
    oldStatus: string | null
    newStatus: string | null
    createdAt: Date | null
  }

  export type OperationLogMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    userId: string | null
    action: string | null
    oldStatus: string | null
    newStatus: string | null
    createdAt: Date | null
  }

  export type OperationLogCountAggregateOutputType = {
    id: number
    taskId: number
    userId: number
    action: number
    oldStatus: number
    newStatus: number
    details: number
    createdAt: number
    _all: number
  }


  export type OperationLogMinAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    action?: true
    oldStatus?: true
    newStatus?: true
    createdAt?: true
  }

  export type OperationLogMaxAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    action?: true
    oldStatus?: true
    newStatus?: true
    createdAt?: true
  }

  export type OperationLogCountAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    action?: true
    oldStatus?: true
    newStatus?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type OperationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLog to aggregate.
     */
    where?: OperationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OperationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OperationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OperationLogs
    **/
    _count?: true | OperationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OperationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OperationLogMaxAggregateInputType
  }

  export type GetOperationLogAggregateType<T extends OperationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateOperationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOperationLog[P]>
      : GetScalarType<T[P], AggregateOperationLog[P]>
  }




  export type OperationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperationLogWhereInput
    orderBy?: OperationLogOrderByWithAggregationInput | OperationLogOrderByWithAggregationInput[]
    by: OperationLogScalarFieldEnum[] | OperationLogScalarFieldEnum
    having?: OperationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OperationLogCountAggregateInputType | true
    _min?: OperationLogMinAggregateInputType
    _max?: OperationLogMaxAggregateInputType
  }

  export type OperationLogGroupByOutputType = {
    id: string
    taskId: string
    userId: string
    action: string
    oldStatus: string | null
    newStatus: string | null
    details: JsonValue | null
    createdAt: Date
    _count: OperationLogCountAggregateOutputType | null
    _min: OperationLogMinAggregateOutputType | null
    _max: OperationLogMaxAggregateOutputType | null
  }

  type GetOperationLogGroupByPayload<T extends OperationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OperationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OperationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OperationLogGroupByOutputType[P]>
            : GetScalarType<T[P], OperationLogGroupByOutputType[P]>
        }
      >
    >


  export type OperationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    action?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    details?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operationLog"]>

  export type OperationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    action?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    details?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operationLog"]>

  export type OperationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    action?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    details?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operationLog"]>

  export type OperationLogSelectScalar = {
    id?: boolean
    taskId?: boolean
    userId?: boolean
    action?: boolean
    oldStatus?: boolean
    newStatus?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type OperationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "userId" | "action" | "oldStatus" | "newStatus" | "details" | "createdAt", ExtArgs["result"]["operationLog"]>
  export type OperationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OperationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OperationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OperationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OperationLog"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      userId: string
      action: string
      oldStatus: string | null
      newStatus: string | null
      details: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["operationLog"]>
    composites: {}
  }

  type OperationLogGetPayload<S extends boolean | null | undefined | OperationLogDefaultArgs> = $Result.GetResult<Prisma.$OperationLogPayload, S>

  type OperationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OperationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OperationLogCountAggregateInputType | true
    }

  export interface OperationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OperationLog'], meta: { name: 'OperationLog' } }
    /**
     * Find zero or one OperationLog that matches the filter.
     * @param {OperationLogFindUniqueArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationLogFindUniqueArgs>(args: SelectSubset<T, OperationLogFindUniqueArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OperationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationLogFindUniqueOrThrowArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, OperationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OperationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindFirstArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationLogFindFirstArgs>(args?: SelectSubset<T, OperationLogFindFirstArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OperationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindFirstOrThrowArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, OperationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OperationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OperationLogs
     * const operationLogs = await prisma.operationLog.findMany()
     * 
     * // Get first 10 OperationLogs
     * const operationLogs = await prisma.operationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const operationLogWithIdOnly = await prisma.operationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OperationLogFindManyArgs>(args?: SelectSubset<T, OperationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OperationLog.
     * @param {OperationLogCreateArgs} args - Arguments to create a OperationLog.
     * @example
     * // Create one OperationLog
     * const OperationLog = await prisma.operationLog.create({
     *   data: {
     *     // ... data to create a OperationLog
     *   }
     * })
     * 
     */
    create<T extends OperationLogCreateArgs>(args: SelectSubset<T, OperationLogCreateArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OperationLogs.
     * @param {OperationLogCreateManyArgs} args - Arguments to create many OperationLogs.
     * @example
     * // Create many OperationLogs
     * const operationLog = await prisma.operationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OperationLogCreateManyArgs>(args?: SelectSubset<T, OperationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OperationLogs and returns the data saved in the database.
     * @param {OperationLogCreateManyAndReturnArgs} args - Arguments to create many OperationLogs.
     * @example
     * // Create many OperationLogs
     * const operationLog = await prisma.operationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OperationLogs and only return the `id`
     * const operationLogWithIdOnly = await prisma.operationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OperationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, OperationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OperationLog.
     * @param {OperationLogDeleteArgs} args - Arguments to delete one OperationLog.
     * @example
     * // Delete one OperationLog
     * const OperationLog = await prisma.operationLog.delete({
     *   where: {
     *     // ... filter to delete one OperationLog
     *   }
     * })
     * 
     */
    delete<T extends OperationLogDeleteArgs>(args: SelectSubset<T, OperationLogDeleteArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OperationLog.
     * @param {OperationLogUpdateArgs} args - Arguments to update one OperationLog.
     * @example
     * // Update one OperationLog
     * const operationLog = await prisma.operationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OperationLogUpdateArgs>(args: SelectSubset<T, OperationLogUpdateArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OperationLogs.
     * @param {OperationLogDeleteManyArgs} args - Arguments to filter OperationLogs to delete.
     * @example
     * // Delete a few OperationLogs
     * const { count } = await prisma.operationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OperationLogDeleteManyArgs>(args?: SelectSubset<T, OperationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OperationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OperationLogs
     * const operationLog = await prisma.operationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OperationLogUpdateManyArgs>(args: SelectSubset<T, OperationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OperationLogs and returns the data updated in the database.
     * @param {OperationLogUpdateManyAndReturnArgs} args - Arguments to update many OperationLogs.
     * @example
     * // Update many OperationLogs
     * const operationLog = await prisma.operationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OperationLogs and only return the `id`
     * const operationLogWithIdOnly = await prisma.operationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OperationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, OperationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OperationLog.
     * @param {OperationLogUpsertArgs} args - Arguments to update or create a OperationLog.
     * @example
     * // Update or create a OperationLog
     * const operationLog = await prisma.operationLog.upsert({
     *   create: {
     *     // ... data to create a OperationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OperationLog we want to update
     *   }
     * })
     */
    upsert<T extends OperationLogUpsertArgs>(args: SelectSubset<T, OperationLogUpsertArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OperationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogCountArgs} args - Arguments to filter OperationLogs to count.
     * @example
     * // Count the number of OperationLogs
     * const count = await prisma.operationLog.count({
     *   where: {
     *     // ... the filter for the OperationLogs we want to count
     *   }
     * })
    **/
    count<T extends OperationLogCountArgs>(
      args?: Subset<T, OperationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OperationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OperationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OperationLogAggregateArgs>(args: Subset<T, OperationLogAggregateArgs>): Prisma.PrismaPromise<GetOperationLogAggregateType<T>>

    /**
     * Group by OperationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OperationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OperationLogGroupByArgs['orderBy'] }
        : { orderBy?: OperationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OperationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OperationLog model
   */
  readonly fields: OperationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OperationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OperationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OperationLog model
   */
  interface OperationLogFieldRefs {
    readonly id: FieldRef<"OperationLog", 'String'>
    readonly taskId: FieldRef<"OperationLog", 'String'>
    readonly userId: FieldRef<"OperationLog", 'String'>
    readonly action: FieldRef<"OperationLog", 'String'>
    readonly oldStatus: FieldRef<"OperationLog", 'String'>
    readonly newStatus: FieldRef<"OperationLog", 'String'>
    readonly details: FieldRef<"OperationLog", 'Json'>
    readonly createdAt: FieldRef<"OperationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OperationLog findUnique
   */
  export type OperationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * Filter, which OperationLog to fetch.
     */
    where: OperationLogWhereUniqueInput
  }

  /**
   * OperationLog findUniqueOrThrow
   */
  export type OperationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * Filter, which OperationLog to fetch.
     */
    where: OperationLogWhereUniqueInput
  }

  /**
   * OperationLog findFirst
   */
  export type OperationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * Filter, which OperationLog to fetch.
     */
    where?: OperationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OperationLogs.
     */
    cursor?: OperationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OperationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OperationLogs.
     */
    distinct?: OperationLogScalarFieldEnum | OperationLogScalarFieldEnum[]
  }

  /**
   * OperationLog findFirstOrThrow
   */
  export type OperationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * Filter, which OperationLog to fetch.
     */
    where?: OperationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OperationLogs.
     */
    cursor?: OperationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OperationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OperationLogs.
     */
    distinct?: OperationLogScalarFieldEnum | OperationLogScalarFieldEnum[]
  }

  /**
   * OperationLog findMany
   */
  export type OperationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * Filter, which OperationLogs to fetch.
     */
    where?: OperationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OperationLogs.
     */
    cursor?: OperationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OperationLogs.
     */
    skip?: number
    distinct?: OperationLogScalarFieldEnum | OperationLogScalarFieldEnum[]
  }

  /**
   * OperationLog create
   */
  export type OperationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a OperationLog.
     */
    data: XOR<OperationLogCreateInput, OperationLogUncheckedCreateInput>
  }

  /**
   * OperationLog createMany
   */
  export type OperationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OperationLogs.
     */
    data: OperationLogCreateManyInput | OperationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OperationLog createManyAndReturn
   */
  export type OperationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * The data used to create many OperationLogs.
     */
    data: OperationLogCreateManyInput | OperationLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OperationLog update
   */
  export type OperationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a OperationLog.
     */
    data: XOR<OperationLogUpdateInput, OperationLogUncheckedUpdateInput>
    /**
     * Choose, which OperationLog to update.
     */
    where: OperationLogWhereUniqueInput
  }

  /**
   * OperationLog updateMany
   */
  export type OperationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OperationLogs.
     */
    data: XOR<OperationLogUpdateManyMutationInput, OperationLogUncheckedUpdateManyInput>
    /**
     * Filter which OperationLogs to update
     */
    where?: OperationLogWhereInput
    /**
     * Limit how many OperationLogs to update.
     */
    limit?: number
  }

  /**
   * OperationLog updateManyAndReturn
   */
  export type OperationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * The data used to update OperationLogs.
     */
    data: XOR<OperationLogUpdateManyMutationInput, OperationLogUncheckedUpdateManyInput>
    /**
     * Filter which OperationLogs to update
     */
    where?: OperationLogWhereInput
    /**
     * Limit how many OperationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OperationLog upsert
   */
  export type OperationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the OperationLog to update in case it exists.
     */
    where: OperationLogWhereUniqueInput
    /**
     * In case the OperationLog found by the `where` argument doesn't exist, create a new OperationLog with this data.
     */
    create: XOR<OperationLogCreateInput, OperationLogUncheckedCreateInput>
    /**
     * In case the OperationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OperationLogUpdateInput, OperationLogUncheckedUpdateInput>
  }

  /**
   * OperationLog delete
   */
  export type OperationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
    /**
     * Filter which OperationLog to delete.
     */
    where: OperationLogWhereUniqueInput
  }

  /**
   * OperationLog deleteMany
   */
  export type OperationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLogs to delete
     */
    where?: OperationLogWhereInput
    /**
     * Limit how many OperationLogs to delete.
     */
    limit?: number
  }

  /**
   * OperationLog without action
   */
  export type OperationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperationLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MediaResourceScalarFieldEnum: {
    id: 'id',
    s3Key: 's3Key',
    s3Url: 's3Url',
    type: 'type',
    fileName: 'fileName',
    fileSize: 'fileSize',
    duration: 'duration',
    width: 'width',
    height: 'height',
    autoNumber: 'autoNumber',
    createdAt: 'createdAt'
  };

  export type MediaResourceScalarFieldEnum = (typeof MediaResourceScalarFieldEnum)[keyof typeof MediaResourceScalarFieldEnum]


  export const TaskPackageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    totalCount: 'totalCount',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskPackageScalarFieldEnum = (typeof TaskPackageScalarFieldEnum)[keyof typeof TaskPackageScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    packageId: 'packageId',
    mediaId: 'mediaId',
    status: 'status',
    labelerId: 'labelerId',
    checkerId: 'checkerId',
    assignedAt: 'assignedAt',
    labeledAt: 'labeledAt',
    checkedAt: 'checkedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const AnnotationScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    type: 'type',
    coordinates: 'coordinates',
    label: 'label',
    frameTime: 'frameTime',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnnotationScalarFieldEnum = (typeof AnnotationScalarFieldEnum)[keyof typeof AnnotationScalarFieldEnum]


  export const TaskMetadataScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    remarks: 'remarks',
    videoClips: 'videoClips',
    croppedAreas: 'croppedAreas',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskMetadataScalarFieldEnum = (typeof TaskMetadataScalarFieldEnum)[keyof typeof TaskMetadataScalarFieldEnum]


  export const QualityScoreScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    score: 'score',
    createdById: 'createdById',
    createdAt: 'createdAt'
  };

  export type QualityScoreScalarFieldEnum = (typeof QualityScoreScalarFieldEnum)[keyof typeof QualityScoreScalarFieldEnum]


  export const OperationLogScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    userId: 'userId',
    action: 'action',
    oldStatus: 'oldStatus',
    newStatus: 'newStatus',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type OperationLogScalarFieldEnum = (typeof OperationLogScalarFieldEnum)[keyof typeof OperationLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'MediaType'
   */
  export type EnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType'>
    


  /**
   * Reference to a field of type 'MediaType[]'
   */
  export type ListEnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PackageStatus'
   */
  export type EnumPackageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PackageStatus'>
    


  /**
   * Reference to a field of type 'PackageStatus[]'
   */
  export type ListEnumPackageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PackageStatus[]'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskStatus[]'
   */
  export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>
    


  /**
   * Reference to a field of type 'AnnotationType'
   */
  export type EnumAnnotationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnnotationType'>
    


  /**
   * Reference to a field of type 'AnnotationType[]'
   */
  export type ListEnumAnnotationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnnotationType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdPackages?: TaskPackageListRelationFilter
    labeledTasks?: TaskListRelationFilter
    checkedTasks?: TaskListRelationFilter
    annotations?: AnnotationListRelationFilter
    qualityScores?: QualityScoreListRelationFilter
    operationLogs?: OperationLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdPackages?: TaskPackageOrderByRelationAggregateInput
    labeledTasks?: TaskOrderByRelationAggregateInput
    checkedTasks?: TaskOrderByRelationAggregateInput
    annotations?: AnnotationOrderByRelationAggregateInput
    qualityScores?: QualityScoreOrderByRelationAggregateInput
    operationLogs?: OperationLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdPackages?: TaskPackageListRelationFilter
    labeledTasks?: TaskListRelationFilter
    checkedTasks?: TaskListRelationFilter
    annotations?: AnnotationListRelationFilter
    qualityScores?: QualityScoreListRelationFilter
    operationLogs?: OperationLogListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MediaResourceWhereInput = {
    AND?: MediaResourceWhereInput | MediaResourceWhereInput[]
    OR?: MediaResourceWhereInput[]
    NOT?: MediaResourceWhereInput | MediaResourceWhereInput[]
    id?: StringFilter<"MediaResource"> | string
    s3Key?: StringFilter<"MediaResource"> | string
    s3Url?: StringFilter<"MediaResource"> | string
    type?: EnumMediaTypeFilter<"MediaResource"> | $Enums.MediaType
    fileName?: StringFilter<"MediaResource"> | string
    fileSize?: IntFilter<"MediaResource"> | number
    duration?: FloatNullableFilter<"MediaResource"> | number | null
    width?: IntNullableFilter<"MediaResource"> | number | null
    height?: IntNullableFilter<"MediaResource"> | number | null
    autoNumber?: IntFilter<"MediaResource"> | number
    createdAt?: DateTimeFilter<"MediaResource"> | Date | string
    task?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
  }

  export type MediaResourceOrderByWithRelationInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    type?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    autoNumber?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type MediaResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    s3Key?: string
    autoNumber?: number
    AND?: MediaResourceWhereInput | MediaResourceWhereInput[]
    OR?: MediaResourceWhereInput[]
    NOT?: MediaResourceWhereInput | MediaResourceWhereInput[]
    s3Url?: StringFilter<"MediaResource"> | string
    type?: EnumMediaTypeFilter<"MediaResource"> | $Enums.MediaType
    fileName?: StringFilter<"MediaResource"> | string
    fileSize?: IntFilter<"MediaResource"> | number
    duration?: FloatNullableFilter<"MediaResource"> | number | null
    width?: IntNullableFilter<"MediaResource"> | number | null
    height?: IntNullableFilter<"MediaResource"> | number | null
    createdAt?: DateTimeFilter<"MediaResource"> | Date | string
    task?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
  }, "id" | "s3Key" | "autoNumber">

  export type MediaResourceOrderByWithAggregationInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    type?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    autoNumber?: SortOrder
    createdAt?: SortOrder
    _count?: MediaResourceCountOrderByAggregateInput
    _avg?: MediaResourceAvgOrderByAggregateInput
    _max?: MediaResourceMaxOrderByAggregateInput
    _min?: MediaResourceMinOrderByAggregateInput
    _sum?: MediaResourceSumOrderByAggregateInput
  }

  export type MediaResourceScalarWhereWithAggregatesInput = {
    AND?: MediaResourceScalarWhereWithAggregatesInput | MediaResourceScalarWhereWithAggregatesInput[]
    OR?: MediaResourceScalarWhereWithAggregatesInput[]
    NOT?: MediaResourceScalarWhereWithAggregatesInput | MediaResourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediaResource"> | string
    s3Key?: StringWithAggregatesFilter<"MediaResource"> | string
    s3Url?: StringWithAggregatesFilter<"MediaResource"> | string
    type?: EnumMediaTypeWithAggregatesFilter<"MediaResource"> | $Enums.MediaType
    fileName?: StringWithAggregatesFilter<"MediaResource"> | string
    fileSize?: IntWithAggregatesFilter<"MediaResource"> | number
    duration?: FloatNullableWithAggregatesFilter<"MediaResource"> | number | null
    width?: IntNullableWithAggregatesFilter<"MediaResource"> | number | null
    height?: IntNullableWithAggregatesFilter<"MediaResource"> | number | null
    autoNumber?: IntWithAggregatesFilter<"MediaResource"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MediaResource"> | Date | string
  }

  export type TaskPackageWhereInput = {
    AND?: TaskPackageWhereInput | TaskPackageWhereInput[]
    OR?: TaskPackageWhereInput[]
    NOT?: TaskPackageWhereInput | TaskPackageWhereInput[]
    id?: StringFilter<"TaskPackage"> | string
    name?: StringFilter<"TaskPackage"> | string
    description?: StringNullableFilter<"TaskPackage"> | string | null
    status?: EnumPackageStatusFilter<"TaskPackage"> | $Enums.PackageStatus
    totalCount?: IntFilter<"TaskPackage"> | number
    createdById?: StringFilter<"TaskPackage"> | string
    createdAt?: DateTimeFilter<"TaskPackage"> | Date | string
    updatedAt?: DateTimeFilter<"TaskPackage"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    tasks?: TaskListRelationFilter
  }

  export type TaskPackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    totalCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type TaskPackageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskPackageWhereInput | TaskPackageWhereInput[]
    OR?: TaskPackageWhereInput[]
    NOT?: TaskPackageWhereInput | TaskPackageWhereInput[]
    name?: StringFilter<"TaskPackage"> | string
    description?: StringNullableFilter<"TaskPackage"> | string | null
    status?: EnumPackageStatusFilter<"TaskPackage"> | $Enums.PackageStatus
    totalCount?: IntFilter<"TaskPackage"> | number
    createdById?: StringFilter<"TaskPackage"> | string
    createdAt?: DateTimeFilter<"TaskPackage"> | Date | string
    updatedAt?: DateTimeFilter<"TaskPackage"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    tasks?: TaskListRelationFilter
  }, "id">

  export type TaskPackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    totalCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskPackageCountOrderByAggregateInput
    _avg?: TaskPackageAvgOrderByAggregateInput
    _max?: TaskPackageMaxOrderByAggregateInput
    _min?: TaskPackageMinOrderByAggregateInput
    _sum?: TaskPackageSumOrderByAggregateInput
  }

  export type TaskPackageScalarWhereWithAggregatesInput = {
    AND?: TaskPackageScalarWhereWithAggregatesInput | TaskPackageScalarWhereWithAggregatesInput[]
    OR?: TaskPackageScalarWhereWithAggregatesInput[]
    NOT?: TaskPackageScalarWhereWithAggregatesInput | TaskPackageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskPackage"> | string
    name?: StringWithAggregatesFilter<"TaskPackage"> | string
    description?: StringNullableWithAggregatesFilter<"TaskPackage"> | string | null
    status?: EnumPackageStatusWithAggregatesFilter<"TaskPackage"> | $Enums.PackageStatus
    totalCount?: IntWithAggregatesFilter<"TaskPackage"> | number
    createdById?: StringWithAggregatesFilter<"TaskPackage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TaskPackage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskPackage"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    packageId?: StringFilter<"Task"> | string
    mediaId?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    labelerId?: StringNullableFilter<"Task"> | string | null
    checkerId?: StringNullableFilter<"Task"> | string | null
    assignedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    labeledAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    checkedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    package?: XOR<TaskPackageScalarRelationFilter, TaskPackageWhereInput>
    media?: XOR<MediaResourceScalarRelationFilter, MediaResourceWhereInput>
    labeler?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    checker?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    annotations?: AnnotationListRelationFilter
    metadata?: XOR<TaskMetadataNullableScalarRelationFilter, TaskMetadataWhereInput> | null
    qualityScores?: QualityScoreListRelationFilter
    operationLogs?: OperationLogListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    packageId?: SortOrder
    mediaId?: SortOrder
    status?: SortOrder
    labelerId?: SortOrderInput | SortOrder
    checkerId?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    labeledAt?: SortOrderInput | SortOrder
    checkedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    package?: TaskPackageOrderByWithRelationInput
    media?: MediaResourceOrderByWithRelationInput
    labeler?: UserOrderByWithRelationInput
    checker?: UserOrderByWithRelationInput
    annotations?: AnnotationOrderByRelationAggregateInput
    metadata?: TaskMetadataOrderByWithRelationInput
    qualityScores?: QualityScoreOrderByRelationAggregateInput
    operationLogs?: OperationLogOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mediaId?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    packageId?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    labelerId?: StringNullableFilter<"Task"> | string | null
    checkerId?: StringNullableFilter<"Task"> | string | null
    assignedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    labeledAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    checkedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    package?: XOR<TaskPackageScalarRelationFilter, TaskPackageWhereInput>
    media?: XOR<MediaResourceScalarRelationFilter, MediaResourceWhereInput>
    labeler?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    checker?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    annotations?: AnnotationListRelationFilter
    metadata?: XOR<TaskMetadataNullableScalarRelationFilter, TaskMetadataWhereInput> | null
    qualityScores?: QualityScoreListRelationFilter
    operationLogs?: OperationLogListRelationFilter
  }, "id" | "mediaId">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    packageId?: SortOrder
    mediaId?: SortOrder
    status?: SortOrder
    labelerId?: SortOrderInput | SortOrder
    checkerId?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    labeledAt?: SortOrderInput | SortOrder
    checkedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    packageId?: StringWithAggregatesFilter<"Task"> | string
    mediaId?: StringWithAggregatesFilter<"Task"> | string
    status?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    labelerId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    checkerId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    assignedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    labeledAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    checkedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type AnnotationWhereInput = {
    AND?: AnnotationWhereInput | AnnotationWhereInput[]
    OR?: AnnotationWhereInput[]
    NOT?: AnnotationWhereInput | AnnotationWhereInput[]
    id?: StringFilter<"Annotation"> | string
    taskId?: StringFilter<"Annotation"> | string
    type?: EnumAnnotationTypeFilter<"Annotation"> | $Enums.AnnotationType
    coordinates?: JsonFilter<"Annotation">
    label?: StringNullableFilter<"Annotation"> | string | null
    frameTime?: FloatNullableFilter<"Annotation"> | number | null
    createdById?: StringFilter<"Annotation"> | string
    createdAt?: DateTimeFilter<"Annotation"> | Date | string
    updatedAt?: DateTimeFilter<"Annotation"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AnnotationOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    type?: SortOrder
    coordinates?: SortOrder
    label?: SortOrderInput | SortOrder
    frameTime?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type AnnotationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnnotationWhereInput | AnnotationWhereInput[]
    OR?: AnnotationWhereInput[]
    NOT?: AnnotationWhereInput | AnnotationWhereInput[]
    taskId?: StringFilter<"Annotation"> | string
    type?: EnumAnnotationTypeFilter<"Annotation"> | $Enums.AnnotationType
    coordinates?: JsonFilter<"Annotation">
    label?: StringNullableFilter<"Annotation"> | string | null
    frameTime?: FloatNullableFilter<"Annotation"> | number | null
    createdById?: StringFilter<"Annotation"> | string
    createdAt?: DateTimeFilter<"Annotation"> | Date | string
    updatedAt?: DateTimeFilter<"Annotation"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AnnotationOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    type?: SortOrder
    coordinates?: SortOrder
    label?: SortOrderInput | SortOrder
    frameTime?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnnotationCountOrderByAggregateInput
    _avg?: AnnotationAvgOrderByAggregateInput
    _max?: AnnotationMaxOrderByAggregateInput
    _min?: AnnotationMinOrderByAggregateInput
    _sum?: AnnotationSumOrderByAggregateInput
  }

  export type AnnotationScalarWhereWithAggregatesInput = {
    AND?: AnnotationScalarWhereWithAggregatesInput | AnnotationScalarWhereWithAggregatesInput[]
    OR?: AnnotationScalarWhereWithAggregatesInput[]
    NOT?: AnnotationScalarWhereWithAggregatesInput | AnnotationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Annotation"> | string
    taskId?: StringWithAggregatesFilter<"Annotation"> | string
    type?: EnumAnnotationTypeWithAggregatesFilter<"Annotation"> | $Enums.AnnotationType
    coordinates?: JsonWithAggregatesFilter<"Annotation">
    label?: StringNullableWithAggregatesFilter<"Annotation"> | string | null
    frameTime?: FloatNullableWithAggregatesFilter<"Annotation"> | number | null
    createdById?: StringWithAggregatesFilter<"Annotation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Annotation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Annotation"> | Date | string
  }

  export type TaskMetadataWhereInput = {
    AND?: TaskMetadataWhereInput | TaskMetadataWhereInput[]
    OR?: TaskMetadataWhereInput[]
    NOT?: TaskMetadataWhereInput | TaskMetadataWhereInput[]
    id?: StringFilter<"TaskMetadata"> | string
    taskId?: StringFilter<"TaskMetadata"> | string
    remarks?: StringNullableFilter<"TaskMetadata"> | string | null
    videoClips?: JsonNullableFilter<"TaskMetadata">
    croppedAreas?: JsonNullableFilter<"TaskMetadata">
    createdAt?: DateTimeFilter<"TaskMetadata"> | Date | string
    updatedAt?: DateTimeFilter<"TaskMetadata"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type TaskMetadataOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    remarks?: SortOrderInput | SortOrder
    videoClips?: SortOrderInput | SortOrder
    croppedAreas?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type TaskMetadataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    taskId?: string
    AND?: TaskMetadataWhereInput | TaskMetadataWhereInput[]
    OR?: TaskMetadataWhereInput[]
    NOT?: TaskMetadataWhereInput | TaskMetadataWhereInput[]
    remarks?: StringNullableFilter<"TaskMetadata"> | string | null
    videoClips?: JsonNullableFilter<"TaskMetadata">
    croppedAreas?: JsonNullableFilter<"TaskMetadata">
    createdAt?: DateTimeFilter<"TaskMetadata"> | Date | string
    updatedAt?: DateTimeFilter<"TaskMetadata"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id" | "taskId">

  export type TaskMetadataOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    remarks?: SortOrderInput | SortOrder
    videoClips?: SortOrderInput | SortOrder
    croppedAreas?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskMetadataCountOrderByAggregateInput
    _max?: TaskMetadataMaxOrderByAggregateInput
    _min?: TaskMetadataMinOrderByAggregateInput
  }

  export type TaskMetadataScalarWhereWithAggregatesInput = {
    AND?: TaskMetadataScalarWhereWithAggregatesInput | TaskMetadataScalarWhereWithAggregatesInput[]
    OR?: TaskMetadataScalarWhereWithAggregatesInput[]
    NOT?: TaskMetadataScalarWhereWithAggregatesInput | TaskMetadataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskMetadata"> | string
    taskId?: StringWithAggregatesFilter<"TaskMetadata"> | string
    remarks?: StringNullableWithAggregatesFilter<"TaskMetadata"> | string | null
    videoClips?: JsonNullableWithAggregatesFilter<"TaskMetadata">
    croppedAreas?: JsonNullableWithAggregatesFilter<"TaskMetadata">
    createdAt?: DateTimeWithAggregatesFilter<"TaskMetadata"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskMetadata"> | Date | string
  }

  export type QualityScoreWhereInput = {
    AND?: QualityScoreWhereInput | QualityScoreWhereInput[]
    OR?: QualityScoreWhereInput[]
    NOT?: QualityScoreWhereInput | QualityScoreWhereInput[]
    id?: StringFilter<"QualityScore"> | string
    taskId?: StringFilter<"QualityScore"> | string
    score?: IntFilter<"QualityScore"> | number
    createdById?: StringFilter<"QualityScore"> | string
    createdAt?: DateTimeFilter<"QualityScore"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type QualityScoreOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    score?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type QualityScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QualityScoreWhereInput | QualityScoreWhereInput[]
    OR?: QualityScoreWhereInput[]
    NOT?: QualityScoreWhereInput | QualityScoreWhereInput[]
    taskId?: StringFilter<"QualityScore"> | string
    score?: IntFilter<"QualityScore"> | number
    createdById?: StringFilter<"QualityScore"> | string
    createdAt?: DateTimeFilter<"QualityScore"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type QualityScoreOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    score?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    _count?: QualityScoreCountOrderByAggregateInput
    _avg?: QualityScoreAvgOrderByAggregateInput
    _max?: QualityScoreMaxOrderByAggregateInput
    _min?: QualityScoreMinOrderByAggregateInput
    _sum?: QualityScoreSumOrderByAggregateInput
  }

  export type QualityScoreScalarWhereWithAggregatesInput = {
    AND?: QualityScoreScalarWhereWithAggregatesInput | QualityScoreScalarWhereWithAggregatesInput[]
    OR?: QualityScoreScalarWhereWithAggregatesInput[]
    NOT?: QualityScoreScalarWhereWithAggregatesInput | QualityScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QualityScore"> | string
    taskId?: StringWithAggregatesFilter<"QualityScore"> | string
    score?: IntWithAggregatesFilter<"QualityScore"> | number
    createdById?: StringWithAggregatesFilter<"QualityScore"> | string
    createdAt?: DateTimeWithAggregatesFilter<"QualityScore"> | Date | string
  }

  export type OperationLogWhereInput = {
    AND?: OperationLogWhereInput | OperationLogWhereInput[]
    OR?: OperationLogWhereInput[]
    NOT?: OperationLogWhereInput | OperationLogWhereInput[]
    id?: StringFilter<"OperationLog"> | string
    taskId?: StringFilter<"OperationLog"> | string
    userId?: StringFilter<"OperationLog"> | string
    action?: StringFilter<"OperationLog"> | string
    oldStatus?: StringNullableFilter<"OperationLog"> | string | null
    newStatus?: StringNullableFilter<"OperationLog"> | string | null
    details?: JsonNullableFilter<"OperationLog">
    createdAt?: DateTimeFilter<"OperationLog"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OperationLogOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    oldStatus?: SortOrderInput | SortOrder
    newStatus?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OperationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OperationLogWhereInput | OperationLogWhereInput[]
    OR?: OperationLogWhereInput[]
    NOT?: OperationLogWhereInput | OperationLogWhereInput[]
    taskId?: StringFilter<"OperationLog"> | string
    userId?: StringFilter<"OperationLog"> | string
    action?: StringFilter<"OperationLog"> | string
    oldStatus?: StringNullableFilter<"OperationLog"> | string | null
    newStatus?: StringNullableFilter<"OperationLog"> | string | null
    details?: JsonNullableFilter<"OperationLog">
    createdAt?: DateTimeFilter<"OperationLog"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OperationLogOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    oldStatus?: SortOrderInput | SortOrder
    newStatus?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OperationLogCountOrderByAggregateInput
    _max?: OperationLogMaxOrderByAggregateInput
    _min?: OperationLogMinOrderByAggregateInput
  }

  export type OperationLogScalarWhereWithAggregatesInput = {
    AND?: OperationLogScalarWhereWithAggregatesInput | OperationLogScalarWhereWithAggregatesInput[]
    OR?: OperationLogScalarWhereWithAggregatesInput[]
    NOT?: OperationLogScalarWhereWithAggregatesInput | OperationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OperationLog"> | string
    taskId?: StringWithAggregatesFilter<"OperationLog"> | string
    userId?: StringWithAggregatesFilter<"OperationLog"> | string
    action?: StringWithAggregatesFilter<"OperationLog"> | string
    oldStatus?: StringNullableWithAggregatesFilter<"OperationLog"> | string | null
    newStatus?: StringNullableWithAggregatesFilter<"OperationLog"> | string | null
    details?: JsonNullableWithAggregatesFilter<"OperationLog">
    createdAt?: DateTimeWithAggregatesFilter<"OperationLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageUncheckedCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskUncheckedCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskUncheckedCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationUncheckedCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUncheckedUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUncheckedUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUncheckedUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUncheckedUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaResourceCreateInput = {
    id?: string
    s3Key: string
    s3Url: string
    type: $Enums.MediaType
    fileName: string
    fileSize: number
    duration?: number | null
    width?: number | null
    height?: number | null
    autoNumber?: number
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutMediaInput
  }

  export type MediaResourceUncheckedCreateInput = {
    id?: string
    s3Key: string
    s3Url: string
    type: $Enums.MediaType
    fileName: string
    fileSize: number
    duration?: number | null
    width?: number | null
    height?: number | null
    autoNumber?: number
    createdAt?: Date | string
    task?: TaskUncheckedCreateNestedOneWithoutMediaInput
  }

  export type MediaResourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutMediaNestedInput
  }

  export type MediaResourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    autoNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUncheckedUpdateOneWithoutMediaNestedInput
  }

  export type MediaResourceCreateManyInput = {
    id?: string
    s3Key: string
    s3Url: string
    type: $Enums.MediaType
    fileName: string
    fileSize: number
    duration?: number | null
    width?: number | null
    height?: number | null
    autoNumber?: number
    createdAt?: Date | string
  }

  export type MediaResourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaResourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    autoNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskPackageCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.PackageStatus
    totalCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedPackagesInput
    tasks?: TaskCreateNestedManyWithoutPackageInput
  }

  export type TaskPackageUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.PackageStatus
    totalCount?: number
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutPackageInput
  }

  export type TaskPackageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedPackagesNestedInput
    tasks?: TaskUpdateManyWithoutPackageNestedInput
  }

  export type TaskPackageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type TaskPackageCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.PackageStatus
    totalCount?: number
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskPackageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskPackageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: TaskPackageCreateNestedOneWithoutTasksInput
    media: MediaResourceCreateNestedOneWithoutTaskInput
    labeler?: UserCreateNestedOneWithoutLabeledTasksInput
    checker?: UserCreateNestedOneWithoutCheckedTasksInput
    annotations?: AnnotationCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    annotations?: AnnotationUncheckedCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataUncheckedCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: TaskPackageUpdateOneRequiredWithoutTasksNestedInput
    media?: MediaResourceUpdateOneRequiredWithoutTaskNestedInput
    labeler?: UserUpdateOneWithoutLabeledTasksNestedInput
    checker?: UserUpdateOneWithoutCheckedTasksNestedInput
    annotations?: AnnotationUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    annotations?: AnnotationUncheckedUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnotationCreateInput = {
    id?: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutAnnotationsInput
    createdBy: UserCreateNestedOneWithoutAnnotationsInput
  }

  export type AnnotationUncheckedCreateInput = {
    id?: string
    taskId: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnotationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutAnnotationsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutAnnotationsNestedInput
  }

  export type AnnotationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnotationCreateManyInput = {
    id?: string
    taskId: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnotationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnotationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMetadataCreateInput = {
    id?: string
    remarks?: string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutMetadataInput
  }

  export type TaskMetadataUncheckedCreateInput = {
    id?: string
    taskId: string
    remarks?: string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskMetadataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutMetadataNestedInput
  }

  export type TaskMetadataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMetadataCreateManyInput = {
    id?: string
    taskId: string
    remarks?: string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskMetadataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMetadataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QualityScoreCreateInput = {
    id?: string
    score: number
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutQualityScoresInput
    createdBy: UserCreateNestedOneWithoutQualityScoresInput
  }

  export type QualityScoreUncheckedCreateInput = {
    id?: string
    taskId: string
    score: number
    createdById: string
    createdAt?: Date | string
  }

  export type QualityScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutQualityScoresNestedInput
    createdBy?: UserUpdateOneRequiredWithoutQualityScoresNestedInput
  }

  export type QualityScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QualityScoreCreateManyInput = {
    id?: string
    taskId: string
    score: number
    createdById: string
    createdAt?: Date | string
  }

  export type QualityScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QualityScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogCreateInput = {
    id?: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutOperationLogsInput
    user: UserCreateNestedOneWithoutOperationLogsInput
  }

  export type OperationLogUncheckedCreateInput = {
    id?: string
    taskId: string
    userId: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OperationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutOperationLogsNestedInput
    user?: UserUpdateOneRequiredWithoutOperationLogsNestedInput
  }

  export type OperationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogCreateManyInput = {
    id?: string
    taskId: string
    userId: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OperationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TaskPackageListRelationFilter = {
    every?: TaskPackageWhereInput
    some?: TaskPackageWhereInput
    none?: TaskPackageWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type AnnotationListRelationFilter = {
    every?: AnnotationWhereInput
    some?: AnnotationWhereInput
    none?: AnnotationWhereInput
  }

  export type QualityScoreListRelationFilter = {
    every?: QualityScoreWhereInput
    some?: QualityScoreWhereInput
    none?: QualityScoreWhereInput
  }

  export type OperationLogListRelationFilter = {
    every?: OperationLogWhereInput
    some?: OperationLogWhereInput
    none?: OperationLogWhereInput
  }

  export type TaskPackageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnnotationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QualityScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OperationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TaskNullableScalarRelationFilter = {
    is?: TaskWhereInput | null
    isNot?: TaskWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MediaResourceCountOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    type?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    autoNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaResourceAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    autoNumber?: SortOrder
  }

  export type MediaResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    type?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    autoNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaResourceMinOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    type?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    autoNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaResourceSumOrderByAggregateInput = {
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    autoNumber?: SortOrder
  }

  export type EnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPackageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PackageStatus | EnumPackageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PackageStatus[] | ListEnumPackageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackageStatus[] | ListEnumPackageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPackageStatusFilter<$PrismaModel> | $Enums.PackageStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TaskPackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskPackageAvgOrderByAggregateInput = {
    totalCount?: SortOrder
  }

  export type TaskPackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskPackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalCount?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskPackageSumOrderByAggregateInput = {
    totalCount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPackageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PackageStatus | EnumPackageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PackageStatus[] | ListEnumPackageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackageStatus[] | ListEnumPackageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPackageStatusWithAggregatesFilter<$PrismaModel> | $Enums.PackageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPackageStatusFilter<$PrismaModel>
    _max?: NestedEnumPackageStatusFilter<$PrismaModel>
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TaskPackageScalarRelationFilter = {
    is?: TaskPackageWhereInput
    isNot?: TaskPackageWhereInput
  }

  export type MediaResourceScalarRelationFilter = {
    is?: MediaResourceWhereInput
    isNot?: MediaResourceWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskMetadataNullableScalarRelationFilter = {
    is?: TaskMetadataWhereInput | null
    isNot?: TaskMetadataWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    mediaId?: SortOrder
    status?: SortOrder
    labelerId?: SortOrder
    checkerId?: SortOrder
    assignedAt?: SortOrder
    labeledAt?: SortOrder
    checkedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    mediaId?: SortOrder
    status?: SortOrder
    labelerId?: SortOrder
    checkerId?: SortOrder
    assignedAt?: SortOrder
    labeledAt?: SortOrder
    checkedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    mediaId?: SortOrder
    status?: SortOrder
    labelerId?: SortOrder
    checkerId?: SortOrder
    assignedAt?: SortOrder
    labeledAt?: SortOrder
    checkedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumAnnotationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnnotationType | EnumAnnotationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnnotationType[] | ListEnumAnnotationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnnotationType[] | ListEnumAnnotationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnnotationTypeFilter<$PrismaModel> | $Enums.AnnotationType
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type AnnotationCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    type?: SortOrder
    coordinates?: SortOrder
    label?: SortOrder
    frameTime?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnnotationAvgOrderByAggregateInput = {
    frameTime?: SortOrder
  }

  export type AnnotationMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    frameTime?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnnotationMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    frameTime?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnnotationSumOrderByAggregateInput = {
    frameTime?: SortOrder
  }

  export type EnumAnnotationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnnotationType | EnumAnnotationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnnotationType[] | ListEnumAnnotationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnnotationType[] | ListEnumAnnotationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnnotationTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnnotationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnnotationTypeFilter<$PrismaModel>
    _max?: NestedEnumAnnotationTypeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TaskMetadataCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    remarks?: SortOrder
    videoClips?: SortOrder
    croppedAreas?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMetadataMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMetadataMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type QualityScoreCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    score?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type QualityScoreAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type QualityScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    score?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type QualityScoreMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    score?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type QualityScoreSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type OperationLogCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type OperationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type OperationLogMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    oldStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskPackageCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TaskPackageCreateWithoutCreatedByInput, TaskPackageUncheckedCreateWithoutCreatedByInput> | TaskPackageCreateWithoutCreatedByInput[] | TaskPackageUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskPackageCreateOrConnectWithoutCreatedByInput | TaskPackageCreateOrConnectWithoutCreatedByInput[]
    createMany?: TaskPackageCreateManyCreatedByInputEnvelope
    connect?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutLabelerInput = {
    create?: XOR<TaskCreateWithoutLabelerInput, TaskUncheckedCreateWithoutLabelerInput> | TaskCreateWithoutLabelerInput[] | TaskUncheckedCreateWithoutLabelerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLabelerInput | TaskCreateOrConnectWithoutLabelerInput[]
    createMany?: TaskCreateManyLabelerInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutCheckerInput = {
    create?: XOR<TaskCreateWithoutCheckerInput, TaskUncheckedCreateWithoutCheckerInput> | TaskCreateWithoutCheckerInput[] | TaskUncheckedCreateWithoutCheckerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCheckerInput | TaskCreateOrConnectWithoutCheckerInput[]
    createMany?: TaskCreateManyCheckerInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type AnnotationCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<AnnotationCreateWithoutCreatedByInput, AnnotationUncheckedCreateWithoutCreatedByInput> | AnnotationCreateWithoutCreatedByInput[] | AnnotationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AnnotationCreateOrConnectWithoutCreatedByInput | AnnotationCreateOrConnectWithoutCreatedByInput[]
    createMany?: AnnotationCreateManyCreatedByInputEnvelope
    connect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
  }

  export type QualityScoreCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<QualityScoreCreateWithoutCreatedByInput, QualityScoreUncheckedCreateWithoutCreatedByInput> | QualityScoreCreateWithoutCreatedByInput[] | QualityScoreUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QualityScoreCreateOrConnectWithoutCreatedByInput | QualityScoreCreateOrConnectWithoutCreatedByInput[]
    createMany?: QualityScoreCreateManyCreatedByInputEnvelope
    connect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
  }

  export type OperationLogCreateNestedManyWithoutUserInput = {
    create?: XOR<OperationLogCreateWithoutUserInput, OperationLogUncheckedCreateWithoutUserInput> | OperationLogCreateWithoutUserInput[] | OperationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OperationLogCreateOrConnectWithoutUserInput | OperationLogCreateOrConnectWithoutUserInput[]
    createMany?: OperationLogCreateManyUserInputEnvelope
    connect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
  }

  export type TaskPackageUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TaskPackageCreateWithoutCreatedByInput, TaskPackageUncheckedCreateWithoutCreatedByInput> | TaskPackageCreateWithoutCreatedByInput[] | TaskPackageUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskPackageCreateOrConnectWithoutCreatedByInput | TaskPackageCreateOrConnectWithoutCreatedByInput[]
    createMany?: TaskPackageCreateManyCreatedByInputEnvelope
    connect?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutLabelerInput = {
    create?: XOR<TaskCreateWithoutLabelerInput, TaskUncheckedCreateWithoutLabelerInput> | TaskCreateWithoutLabelerInput[] | TaskUncheckedCreateWithoutLabelerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLabelerInput | TaskCreateOrConnectWithoutLabelerInput[]
    createMany?: TaskCreateManyLabelerInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutCheckerInput = {
    create?: XOR<TaskCreateWithoutCheckerInput, TaskUncheckedCreateWithoutCheckerInput> | TaskCreateWithoutCheckerInput[] | TaskUncheckedCreateWithoutCheckerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCheckerInput | TaskCreateOrConnectWithoutCheckerInput[]
    createMany?: TaskCreateManyCheckerInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type AnnotationUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<AnnotationCreateWithoutCreatedByInput, AnnotationUncheckedCreateWithoutCreatedByInput> | AnnotationCreateWithoutCreatedByInput[] | AnnotationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AnnotationCreateOrConnectWithoutCreatedByInput | AnnotationCreateOrConnectWithoutCreatedByInput[]
    createMany?: AnnotationCreateManyCreatedByInputEnvelope
    connect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
  }

  export type QualityScoreUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<QualityScoreCreateWithoutCreatedByInput, QualityScoreUncheckedCreateWithoutCreatedByInput> | QualityScoreCreateWithoutCreatedByInput[] | QualityScoreUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QualityScoreCreateOrConnectWithoutCreatedByInput | QualityScoreCreateOrConnectWithoutCreatedByInput[]
    createMany?: QualityScoreCreateManyCreatedByInputEnvelope
    connect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
  }

  export type OperationLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OperationLogCreateWithoutUserInput, OperationLogUncheckedCreateWithoutUserInput> | OperationLogCreateWithoutUserInput[] | OperationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OperationLogCreateOrConnectWithoutUserInput | OperationLogCreateOrConnectWithoutUserInput[]
    createMany?: OperationLogCreateManyUserInputEnvelope
    connect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TaskPackageUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TaskPackageCreateWithoutCreatedByInput, TaskPackageUncheckedCreateWithoutCreatedByInput> | TaskPackageCreateWithoutCreatedByInput[] | TaskPackageUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskPackageCreateOrConnectWithoutCreatedByInput | TaskPackageCreateOrConnectWithoutCreatedByInput[]
    upsert?: TaskPackageUpsertWithWhereUniqueWithoutCreatedByInput | TaskPackageUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TaskPackageCreateManyCreatedByInputEnvelope
    set?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
    disconnect?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
    delete?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
    connect?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
    update?: TaskPackageUpdateWithWhereUniqueWithoutCreatedByInput | TaskPackageUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TaskPackageUpdateManyWithWhereWithoutCreatedByInput | TaskPackageUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TaskPackageScalarWhereInput | TaskPackageScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutLabelerNestedInput = {
    create?: XOR<TaskCreateWithoutLabelerInput, TaskUncheckedCreateWithoutLabelerInput> | TaskCreateWithoutLabelerInput[] | TaskUncheckedCreateWithoutLabelerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLabelerInput | TaskCreateOrConnectWithoutLabelerInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutLabelerInput | TaskUpsertWithWhereUniqueWithoutLabelerInput[]
    createMany?: TaskCreateManyLabelerInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutLabelerInput | TaskUpdateWithWhereUniqueWithoutLabelerInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutLabelerInput | TaskUpdateManyWithWhereWithoutLabelerInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutCheckerNestedInput = {
    create?: XOR<TaskCreateWithoutCheckerInput, TaskUncheckedCreateWithoutCheckerInput> | TaskCreateWithoutCheckerInput[] | TaskUncheckedCreateWithoutCheckerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCheckerInput | TaskCreateOrConnectWithoutCheckerInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCheckerInput | TaskUpsertWithWhereUniqueWithoutCheckerInput[]
    createMany?: TaskCreateManyCheckerInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCheckerInput | TaskUpdateWithWhereUniqueWithoutCheckerInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCheckerInput | TaskUpdateManyWithWhereWithoutCheckerInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type AnnotationUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<AnnotationCreateWithoutCreatedByInput, AnnotationUncheckedCreateWithoutCreatedByInput> | AnnotationCreateWithoutCreatedByInput[] | AnnotationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AnnotationCreateOrConnectWithoutCreatedByInput | AnnotationCreateOrConnectWithoutCreatedByInput[]
    upsert?: AnnotationUpsertWithWhereUniqueWithoutCreatedByInput | AnnotationUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: AnnotationCreateManyCreatedByInputEnvelope
    set?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    disconnect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    delete?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    connect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    update?: AnnotationUpdateWithWhereUniqueWithoutCreatedByInput | AnnotationUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: AnnotationUpdateManyWithWhereWithoutCreatedByInput | AnnotationUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: AnnotationScalarWhereInput | AnnotationScalarWhereInput[]
  }

  export type QualityScoreUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<QualityScoreCreateWithoutCreatedByInput, QualityScoreUncheckedCreateWithoutCreatedByInput> | QualityScoreCreateWithoutCreatedByInput[] | QualityScoreUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QualityScoreCreateOrConnectWithoutCreatedByInput | QualityScoreCreateOrConnectWithoutCreatedByInput[]
    upsert?: QualityScoreUpsertWithWhereUniqueWithoutCreatedByInput | QualityScoreUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: QualityScoreCreateManyCreatedByInputEnvelope
    set?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    disconnect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    delete?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    connect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    update?: QualityScoreUpdateWithWhereUniqueWithoutCreatedByInput | QualityScoreUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: QualityScoreUpdateManyWithWhereWithoutCreatedByInput | QualityScoreUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: QualityScoreScalarWhereInput | QualityScoreScalarWhereInput[]
  }

  export type OperationLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<OperationLogCreateWithoutUserInput, OperationLogUncheckedCreateWithoutUserInput> | OperationLogCreateWithoutUserInput[] | OperationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OperationLogCreateOrConnectWithoutUserInput | OperationLogCreateOrConnectWithoutUserInput[]
    upsert?: OperationLogUpsertWithWhereUniqueWithoutUserInput | OperationLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OperationLogCreateManyUserInputEnvelope
    set?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    disconnect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    delete?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    connect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    update?: OperationLogUpdateWithWhereUniqueWithoutUserInput | OperationLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OperationLogUpdateManyWithWhereWithoutUserInput | OperationLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OperationLogScalarWhereInput | OperationLogScalarWhereInput[]
  }

  export type TaskPackageUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TaskPackageCreateWithoutCreatedByInput, TaskPackageUncheckedCreateWithoutCreatedByInput> | TaskPackageCreateWithoutCreatedByInput[] | TaskPackageUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TaskPackageCreateOrConnectWithoutCreatedByInput | TaskPackageCreateOrConnectWithoutCreatedByInput[]
    upsert?: TaskPackageUpsertWithWhereUniqueWithoutCreatedByInput | TaskPackageUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TaskPackageCreateManyCreatedByInputEnvelope
    set?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
    disconnect?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
    delete?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
    connect?: TaskPackageWhereUniqueInput | TaskPackageWhereUniqueInput[]
    update?: TaskPackageUpdateWithWhereUniqueWithoutCreatedByInput | TaskPackageUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TaskPackageUpdateManyWithWhereWithoutCreatedByInput | TaskPackageUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TaskPackageScalarWhereInput | TaskPackageScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutLabelerNestedInput = {
    create?: XOR<TaskCreateWithoutLabelerInput, TaskUncheckedCreateWithoutLabelerInput> | TaskCreateWithoutLabelerInput[] | TaskUncheckedCreateWithoutLabelerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutLabelerInput | TaskCreateOrConnectWithoutLabelerInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutLabelerInput | TaskUpsertWithWhereUniqueWithoutLabelerInput[]
    createMany?: TaskCreateManyLabelerInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutLabelerInput | TaskUpdateWithWhereUniqueWithoutLabelerInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutLabelerInput | TaskUpdateManyWithWhereWithoutLabelerInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutCheckerNestedInput = {
    create?: XOR<TaskCreateWithoutCheckerInput, TaskUncheckedCreateWithoutCheckerInput> | TaskCreateWithoutCheckerInput[] | TaskUncheckedCreateWithoutCheckerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCheckerInput | TaskCreateOrConnectWithoutCheckerInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCheckerInput | TaskUpsertWithWhereUniqueWithoutCheckerInput[]
    createMany?: TaskCreateManyCheckerInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCheckerInput | TaskUpdateWithWhereUniqueWithoutCheckerInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCheckerInput | TaskUpdateManyWithWhereWithoutCheckerInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type AnnotationUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<AnnotationCreateWithoutCreatedByInput, AnnotationUncheckedCreateWithoutCreatedByInput> | AnnotationCreateWithoutCreatedByInput[] | AnnotationUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AnnotationCreateOrConnectWithoutCreatedByInput | AnnotationCreateOrConnectWithoutCreatedByInput[]
    upsert?: AnnotationUpsertWithWhereUniqueWithoutCreatedByInput | AnnotationUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: AnnotationCreateManyCreatedByInputEnvelope
    set?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    disconnect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    delete?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    connect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    update?: AnnotationUpdateWithWhereUniqueWithoutCreatedByInput | AnnotationUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: AnnotationUpdateManyWithWhereWithoutCreatedByInput | AnnotationUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: AnnotationScalarWhereInput | AnnotationScalarWhereInput[]
  }

  export type QualityScoreUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<QualityScoreCreateWithoutCreatedByInput, QualityScoreUncheckedCreateWithoutCreatedByInput> | QualityScoreCreateWithoutCreatedByInput[] | QualityScoreUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: QualityScoreCreateOrConnectWithoutCreatedByInput | QualityScoreCreateOrConnectWithoutCreatedByInput[]
    upsert?: QualityScoreUpsertWithWhereUniqueWithoutCreatedByInput | QualityScoreUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: QualityScoreCreateManyCreatedByInputEnvelope
    set?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    disconnect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    delete?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    connect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    update?: QualityScoreUpdateWithWhereUniqueWithoutCreatedByInput | QualityScoreUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: QualityScoreUpdateManyWithWhereWithoutCreatedByInput | QualityScoreUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: QualityScoreScalarWhereInput | QualityScoreScalarWhereInput[]
  }

  export type OperationLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OperationLogCreateWithoutUserInput, OperationLogUncheckedCreateWithoutUserInput> | OperationLogCreateWithoutUserInput[] | OperationLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OperationLogCreateOrConnectWithoutUserInput | OperationLogCreateOrConnectWithoutUserInput[]
    upsert?: OperationLogUpsertWithWhereUniqueWithoutUserInput | OperationLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OperationLogCreateManyUserInputEnvelope
    set?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    disconnect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    delete?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    connect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    update?: OperationLogUpdateWithWhereUniqueWithoutUserInput | OperationLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OperationLogUpdateManyWithWhereWithoutUserInput | OperationLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OperationLogScalarWhereInput | OperationLogScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutMediaInput = {
    create?: XOR<TaskCreateWithoutMediaInput, TaskUncheckedCreateWithoutMediaInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMediaInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUncheckedCreateNestedOneWithoutMediaInput = {
    create?: XOR<TaskCreateWithoutMediaInput, TaskUncheckedCreateWithoutMediaInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMediaInput
    connect?: TaskWhereUniqueInput
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskUpdateOneWithoutMediaNestedInput = {
    create?: XOR<TaskCreateWithoutMediaInput, TaskUncheckedCreateWithoutMediaInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMediaInput
    upsert?: TaskUpsertWithoutMediaInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutMediaInput, TaskUpdateWithoutMediaInput>, TaskUncheckedUpdateWithoutMediaInput>
  }

  export type TaskUncheckedUpdateOneWithoutMediaNestedInput = {
    create?: XOR<TaskCreateWithoutMediaInput, TaskUncheckedCreateWithoutMediaInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMediaInput
    upsert?: TaskUpsertWithoutMediaInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutMediaInput, TaskUpdateWithoutMediaInput>, TaskUncheckedUpdateWithoutMediaInput>
  }

  export type UserCreateNestedOneWithoutCreatedPackagesInput = {
    create?: XOR<UserCreateWithoutCreatedPackagesInput, UserUncheckedCreateWithoutCreatedPackagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedPackagesInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutPackageInput = {
    create?: XOR<TaskCreateWithoutPackageInput, TaskUncheckedCreateWithoutPackageInput> | TaskCreateWithoutPackageInput[] | TaskUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutPackageInput | TaskCreateOrConnectWithoutPackageInput[]
    createMany?: TaskCreateManyPackageInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutPackageInput = {
    create?: XOR<TaskCreateWithoutPackageInput, TaskUncheckedCreateWithoutPackageInput> | TaskCreateWithoutPackageInput[] | TaskUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutPackageInput | TaskCreateOrConnectWithoutPackageInput[]
    createMany?: TaskCreateManyPackageInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPackageStatusFieldUpdateOperationsInput = {
    set?: $Enums.PackageStatus
  }

  export type UserUpdateOneRequiredWithoutCreatedPackagesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedPackagesInput, UserUncheckedCreateWithoutCreatedPackagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedPackagesInput
    upsert?: UserUpsertWithoutCreatedPackagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedPackagesInput, UserUpdateWithoutCreatedPackagesInput>, UserUncheckedUpdateWithoutCreatedPackagesInput>
  }

  export type TaskUpdateManyWithoutPackageNestedInput = {
    create?: XOR<TaskCreateWithoutPackageInput, TaskUncheckedCreateWithoutPackageInput> | TaskCreateWithoutPackageInput[] | TaskUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutPackageInput | TaskCreateOrConnectWithoutPackageInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutPackageInput | TaskUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: TaskCreateManyPackageInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutPackageInput | TaskUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutPackageInput | TaskUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutPackageNestedInput = {
    create?: XOR<TaskCreateWithoutPackageInput, TaskUncheckedCreateWithoutPackageInput> | TaskCreateWithoutPackageInput[] | TaskUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutPackageInput | TaskCreateOrConnectWithoutPackageInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutPackageInput | TaskUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: TaskCreateManyPackageInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutPackageInput | TaskUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutPackageInput | TaskUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskPackageCreateNestedOneWithoutTasksInput = {
    create?: XOR<TaskPackageCreateWithoutTasksInput, TaskPackageUncheckedCreateWithoutTasksInput>
    connectOrCreate?: TaskPackageCreateOrConnectWithoutTasksInput
    connect?: TaskPackageWhereUniqueInput
  }

  export type MediaResourceCreateNestedOneWithoutTaskInput = {
    create?: XOR<MediaResourceCreateWithoutTaskInput, MediaResourceUncheckedCreateWithoutTaskInput>
    connectOrCreate?: MediaResourceCreateOrConnectWithoutTaskInput
    connect?: MediaResourceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLabeledTasksInput = {
    create?: XOR<UserCreateWithoutLabeledTasksInput, UserUncheckedCreateWithoutLabeledTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLabeledTasksInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCheckedTasksInput = {
    create?: XOR<UserCreateWithoutCheckedTasksInput, UserUncheckedCreateWithoutCheckedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutCheckedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type AnnotationCreateNestedManyWithoutTaskInput = {
    create?: XOR<AnnotationCreateWithoutTaskInput, AnnotationUncheckedCreateWithoutTaskInput> | AnnotationCreateWithoutTaskInput[] | AnnotationUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: AnnotationCreateOrConnectWithoutTaskInput | AnnotationCreateOrConnectWithoutTaskInput[]
    createMany?: AnnotationCreateManyTaskInputEnvelope
    connect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
  }

  export type TaskMetadataCreateNestedOneWithoutTaskInput = {
    create?: XOR<TaskMetadataCreateWithoutTaskInput, TaskMetadataUncheckedCreateWithoutTaskInput>
    connectOrCreate?: TaskMetadataCreateOrConnectWithoutTaskInput
    connect?: TaskMetadataWhereUniqueInput
  }

  export type QualityScoreCreateNestedManyWithoutTaskInput = {
    create?: XOR<QualityScoreCreateWithoutTaskInput, QualityScoreUncheckedCreateWithoutTaskInput> | QualityScoreCreateWithoutTaskInput[] | QualityScoreUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: QualityScoreCreateOrConnectWithoutTaskInput | QualityScoreCreateOrConnectWithoutTaskInput[]
    createMany?: QualityScoreCreateManyTaskInputEnvelope
    connect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
  }

  export type OperationLogCreateNestedManyWithoutTaskInput = {
    create?: XOR<OperationLogCreateWithoutTaskInput, OperationLogUncheckedCreateWithoutTaskInput> | OperationLogCreateWithoutTaskInput[] | OperationLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: OperationLogCreateOrConnectWithoutTaskInput | OperationLogCreateOrConnectWithoutTaskInput[]
    createMany?: OperationLogCreateManyTaskInputEnvelope
    connect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
  }

  export type AnnotationUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<AnnotationCreateWithoutTaskInput, AnnotationUncheckedCreateWithoutTaskInput> | AnnotationCreateWithoutTaskInput[] | AnnotationUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: AnnotationCreateOrConnectWithoutTaskInput | AnnotationCreateOrConnectWithoutTaskInput[]
    createMany?: AnnotationCreateManyTaskInputEnvelope
    connect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
  }

  export type TaskMetadataUncheckedCreateNestedOneWithoutTaskInput = {
    create?: XOR<TaskMetadataCreateWithoutTaskInput, TaskMetadataUncheckedCreateWithoutTaskInput>
    connectOrCreate?: TaskMetadataCreateOrConnectWithoutTaskInput
    connect?: TaskMetadataWhereUniqueInput
  }

  export type QualityScoreUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<QualityScoreCreateWithoutTaskInput, QualityScoreUncheckedCreateWithoutTaskInput> | QualityScoreCreateWithoutTaskInput[] | QualityScoreUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: QualityScoreCreateOrConnectWithoutTaskInput | QualityScoreCreateOrConnectWithoutTaskInput[]
    createMany?: QualityScoreCreateManyTaskInputEnvelope
    connect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
  }

  export type OperationLogUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<OperationLogCreateWithoutTaskInput, OperationLogUncheckedCreateWithoutTaskInput> | OperationLogCreateWithoutTaskInput[] | OperationLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: OperationLogCreateOrConnectWithoutTaskInput | OperationLogCreateOrConnectWithoutTaskInput[]
    createMany?: OperationLogCreateManyTaskInputEnvelope
    connect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TaskPackageUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<TaskPackageCreateWithoutTasksInput, TaskPackageUncheckedCreateWithoutTasksInput>
    connectOrCreate?: TaskPackageCreateOrConnectWithoutTasksInput
    upsert?: TaskPackageUpsertWithoutTasksInput
    connect?: TaskPackageWhereUniqueInput
    update?: XOR<XOR<TaskPackageUpdateToOneWithWhereWithoutTasksInput, TaskPackageUpdateWithoutTasksInput>, TaskPackageUncheckedUpdateWithoutTasksInput>
  }

  export type MediaResourceUpdateOneRequiredWithoutTaskNestedInput = {
    create?: XOR<MediaResourceCreateWithoutTaskInput, MediaResourceUncheckedCreateWithoutTaskInput>
    connectOrCreate?: MediaResourceCreateOrConnectWithoutTaskInput
    upsert?: MediaResourceUpsertWithoutTaskInput
    connect?: MediaResourceWhereUniqueInput
    update?: XOR<XOR<MediaResourceUpdateToOneWithWhereWithoutTaskInput, MediaResourceUpdateWithoutTaskInput>, MediaResourceUncheckedUpdateWithoutTaskInput>
  }

  export type UserUpdateOneWithoutLabeledTasksNestedInput = {
    create?: XOR<UserCreateWithoutLabeledTasksInput, UserUncheckedCreateWithoutLabeledTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLabeledTasksInput
    upsert?: UserUpsertWithoutLabeledTasksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLabeledTasksInput, UserUpdateWithoutLabeledTasksInput>, UserUncheckedUpdateWithoutLabeledTasksInput>
  }

  export type UserUpdateOneWithoutCheckedTasksNestedInput = {
    create?: XOR<UserCreateWithoutCheckedTasksInput, UserUncheckedCreateWithoutCheckedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutCheckedTasksInput
    upsert?: UserUpsertWithoutCheckedTasksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCheckedTasksInput, UserUpdateWithoutCheckedTasksInput>, UserUncheckedUpdateWithoutCheckedTasksInput>
  }

  export type AnnotationUpdateManyWithoutTaskNestedInput = {
    create?: XOR<AnnotationCreateWithoutTaskInput, AnnotationUncheckedCreateWithoutTaskInput> | AnnotationCreateWithoutTaskInput[] | AnnotationUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: AnnotationCreateOrConnectWithoutTaskInput | AnnotationCreateOrConnectWithoutTaskInput[]
    upsert?: AnnotationUpsertWithWhereUniqueWithoutTaskInput | AnnotationUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: AnnotationCreateManyTaskInputEnvelope
    set?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    disconnect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    delete?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    connect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    update?: AnnotationUpdateWithWhereUniqueWithoutTaskInput | AnnotationUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: AnnotationUpdateManyWithWhereWithoutTaskInput | AnnotationUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: AnnotationScalarWhereInput | AnnotationScalarWhereInput[]
  }

  export type TaskMetadataUpdateOneWithoutTaskNestedInput = {
    create?: XOR<TaskMetadataCreateWithoutTaskInput, TaskMetadataUncheckedCreateWithoutTaskInput>
    connectOrCreate?: TaskMetadataCreateOrConnectWithoutTaskInput
    upsert?: TaskMetadataUpsertWithoutTaskInput
    disconnect?: TaskMetadataWhereInput | boolean
    delete?: TaskMetadataWhereInput | boolean
    connect?: TaskMetadataWhereUniqueInput
    update?: XOR<XOR<TaskMetadataUpdateToOneWithWhereWithoutTaskInput, TaskMetadataUpdateWithoutTaskInput>, TaskMetadataUncheckedUpdateWithoutTaskInput>
  }

  export type QualityScoreUpdateManyWithoutTaskNestedInput = {
    create?: XOR<QualityScoreCreateWithoutTaskInput, QualityScoreUncheckedCreateWithoutTaskInput> | QualityScoreCreateWithoutTaskInput[] | QualityScoreUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: QualityScoreCreateOrConnectWithoutTaskInput | QualityScoreCreateOrConnectWithoutTaskInput[]
    upsert?: QualityScoreUpsertWithWhereUniqueWithoutTaskInput | QualityScoreUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: QualityScoreCreateManyTaskInputEnvelope
    set?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    disconnect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    delete?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    connect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    update?: QualityScoreUpdateWithWhereUniqueWithoutTaskInput | QualityScoreUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: QualityScoreUpdateManyWithWhereWithoutTaskInput | QualityScoreUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: QualityScoreScalarWhereInput | QualityScoreScalarWhereInput[]
  }

  export type OperationLogUpdateManyWithoutTaskNestedInput = {
    create?: XOR<OperationLogCreateWithoutTaskInput, OperationLogUncheckedCreateWithoutTaskInput> | OperationLogCreateWithoutTaskInput[] | OperationLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: OperationLogCreateOrConnectWithoutTaskInput | OperationLogCreateOrConnectWithoutTaskInput[]
    upsert?: OperationLogUpsertWithWhereUniqueWithoutTaskInput | OperationLogUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: OperationLogCreateManyTaskInputEnvelope
    set?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    disconnect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    delete?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    connect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    update?: OperationLogUpdateWithWhereUniqueWithoutTaskInput | OperationLogUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: OperationLogUpdateManyWithWhereWithoutTaskInput | OperationLogUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: OperationLogScalarWhereInput | OperationLogScalarWhereInput[]
  }

  export type AnnotationUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<AnnotationCreateWithoutTaskInput, AnnotationUncheckedCreateWithoutTaskInput> | AnnotationCreateWithoutTaskInput[] | AnnotationUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: AnnotationCreateOrConnectWithoutTaskInput | AnnotationCreateOrConnectWithoutTaskInput[]
    upsert?: AnnotationUpsertWithWhereUniqueWithoutTaskInput | AnnotationUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: AnnotationCreateManyTaskInputEnvelope
    set?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    disconnect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    delete?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    connect?: AnnotationWhereUniqueInput | AnnotationWhereUniqueInput[]
    update?: AnnotationUpdateWithWhereUniqueWithoutTaskInput | AnnotationUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: AnnotationUpdateManyWithWhereWithoutTaskInput | AnnotationUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: AnnotationScalarWhereInput | AnnotationScalarWhereInput[]
  }

  export type TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput = {
    create?: XOR<TaskMetadataCreateWithoutTaskInput, TaskMetadataUncheckedCreateWithoutTaskInput>
    connectOrCreate?: TaskMetadataCreateOrConnectWithoutTaskInput
    upsert?: TaskMetadataUpsertWithoutTaskInput
    disconnect?: TaskMetadataWhereInput | boolean
    delete?: TaskMetadataWhereInput | boolean
    connect?: TaskMetadataWhereUniqueInput
    update?: XOR<XOR<TaskMetadataUpdateToOneWithWhereWithoutTaskInput, TaskMetadataUpdateWithoutTaskInput>, TaskMetadataUncheckedUpdateWithoutTaskInput>
  }

  export type QualityScoreUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<QualityScoreCreateWithoutTaskInput, QualityScoreUncheckedCreateWithoutTaskInput> | QualityScoreCreateWithoutTaskInput[] | QualityScoreUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: QualityScoreCreateOrConnectWithoutTaskInput | QualityScoreCreateOrConnectWithoutTaskInput[]
    upsert?: QualityScoreUpsertWithWhereUniqueWithoutTaskInput | QualityScoreUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: QualityScoreCreateManyTaskInputEnvelope
    set?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    disconnect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    delete?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    connect?: QualityScoreWhereUniqueInput | QualityScoreWhereUniqueInput[]
    update?: QualityScoreUpdateWithWhereUniqueWithoutTaskInput | QualityScoreUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: QualityScoreUpdateManyWithWhereWithoutTaskInput | QualityScoreUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: QualityScoreScalarWhereInput | QualityScoreScalarWhereInput[]
  }

  export type OperationLogUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<OperationLogCreateWithoutTaskInput, OperationLogUncheckedCreateWithoutTaskInput> | OperationLogCreateWithoutTaskInput[] | OperationLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: OperationLogCreateOrConnectWithoutTaskInput | OperationLogCreateOrConnectWithoutTaskInput[]
    upsert?: OperationLogUpsertWithWhereUniqueWithoutTaskInput | OperationLogUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: OperationLogCreateManyTaskInputEnvelope
    set?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    disconnect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    delete?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    connect?: OperationLogWhereUniqueInput | OperationLogWhereUniqueInput[]
    update?: OperationLogUpdateWithWhereUniqueWithoutTaskInput | OperationLogUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: OperationLogUpdateManyWithWhereWithoutTaskInput | OperationLogUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: OperationLogScalarWhereInput | OperationLogScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutAnnotationsInput = {
    create?: XOR<TaskCreateWithoutAnnotationsInput, TaskUncheckedCreateWithoutAnnotationsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAnnotationsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAnnotationsInput = {
    create?: XOR<UserCreateWithoutAnnotationsInput, UserUncheckedCreateWithoutAnnotationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnnotationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAnnotationTypeFieldUpdateOperationsInput = {
    set?: $Enums.AnnotationType
  }

  export type TaskUpdateOneRequiredWithoutAnnotationsNestedInput = {
    create?: XOR<TaskCreateWithoutAnnotationsInput, TaskUncheckedCreateWithoutAnnotationsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAnnotationsInput
    upsert?: TaskUpsertWithoutAnnotationsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutAnnotationsInput, TaskUpdateWithoutAnnotationsInput>, TaskUncheckedUpdateWithoutAnnotationsInput>
  }

  export type UserUpdateOneRequiredWithoutAnnotationsNestedInput = {
    create?: XOR<UserCreateWithoutAnnotationsInput, UserUncheckedCreateWithoutAnnotationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnnotationsInput
    upsert?: UserUpsertWithoutAnnotationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnnotationsInput, UserUpdateWithoutAnnotationsInput>, UserUncheckedUpdateWithoutAnnotationsInput>
  }

  export type TaskCreateNestedOneWithoutMetadataInput = {
    create?: XOR<TaskCreateWithoutMetadataInput, TaskUncheckedCreateWithoutMetadataInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMetadataInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutMetadataNestedInput = {
    create?: XOR<TaskCreateWithoutMetadataInput, TaskUncheckedCreateWithoutMetadataInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMetadataInput
    upsert?: TaskUpsertWithoutMetadataInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutMetadataInput, TaskUpdateWithoutMetadataInput>, TaskUncheckedUpdateWithoutMetadataInput>
  }

  export type TaskCreateNestedOneWithoutQualityScoresInput = {
    create?: XOR<TaskCreateWithoutQualityScoresInput, TaskUncheckedCreateWithoutQualityScoresInput>
    connectOrCreate?: TaskCreateOrConnectWithoutQualityScoresInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutQualityScoresInput = {
    create?: XOR<UserCreateWithoutQualityScoresInput, UserUncheckedCreateWithoutQualityScoresInput>
    connectOrCreate?: UserCreateOrConnectWithoutQualityScoresInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutQualityScoresNestedInput = {
    create?: XOR<TaskCreateWithoutQualityScoresInput, TaskUncheckedCreateWithoutQualityScoresInput>
    connectOrCreate?: TaskCreateOrConnectWithoutQualityScoresInput
    upsert?: TaskUpsertWithoutQualityScoresInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutQualityScoresInput, TaskUpdateWithoutQualityScoresInput>, TaskUncheckedUpdateWithoutQualityScoresInput>
  }

  export type UserUpdateOneRequiredWithoutQualityScoresNestedInput = {
    create?: XOR<UserCreateWithoutQualityScoresInput, UserUncheckedCreateWithoutQualityScoresInput>
    connectOrCreate?: UserCreateOrConnectWithoutQualityScoresInput
    upsert?: UserUpsertWithoutQualityScoresInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQualityScoresInput, UserUpdateWithoutQualityScoresInput>, UserUncheckedUpdateWithoutQualityScoresInput>
  }

  export type TaskCreateNestedOneWithoutOperationLogsInput = {
    create?: XOR<TaskCreateWithoutOperationLogsInput, TaskUncheckedCreateWithoutOperationLogsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutOperationLogsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOperationLogsInput = {
    create?: XOR<UserCreateWithoutOperationLogsInput, UserUncheckedCreateWithoutOperationLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOperationLogsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutOperationLogsNestedInput = {
    create?: XOR<TaskCreateWithoutOperationLogsInput, TaskUncheckedCreateWithoutOperationLogsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutOperationLogsInput
    upsert?: TaskUpsertWithoutOperationLogsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutOperationLogsInput, TaskUpdateWithoutOperationLogsInput>, TaskUncheckedUpdateWithoutOperationLogsInput>
  }

  export type UserUpdateOneRequiredWithoutOperationLogsNestedInput = {
    create?: XOR<UserCreateWithoutOperationLogsInput, UserUncheckedCreateWithoutOperationLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOperationLogsInput
    upsert?: UserUpsertWithoutOperationLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOperationLogsInput, UserUpdateWithoutOperationLogsInput>, UserUncheckedUpdateWithoutOperationLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPackageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PackageStatus | EnumPackageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PackageStatus[] | ListEnumPackageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackageStatus[] | ListEnumPackageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPackageStatusFilter<$PrismaModel> | $Enums.PackageStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumPackageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PackageStatus | EnumPackageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PackageStatus[] | ListEnumPackageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackageStatus[] | ListEnumPackageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPackageStatusWithAggregatesFilter<$PrismaModel> | $Enums.PackageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPackageStatusFilter<$PrismaModel>
    _max?: NestedEnumPackageStatusFilter<$PrismaModel>
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAnnotationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnnotationType | EnumAnnotationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnnotationType[] | ListEnumAnnotationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnnotationType[] | ListEnumAnnotationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnnotationTypeFilter<$PrismaModel> | $Enums.AnnotationType
  }

  export type NestedEnumAnnotationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnnotationType | EnumAnnotationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnnotationType[] | ListEnumAnnotationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnnotationType[] | ListEnumAnnotationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnnotationTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnnotationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnnotationTypeFilter<$PrismaModel>
    _max?: NestedEnumAnnotationTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TaskPackageCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.PackageStatus
    totalCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutPackageInput
  }

  export type TaskPackageUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.PackageStatus
    totalCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutPackageInput
  }

  export type TaskPackageCreateOrConnectWithoutCreatedByInput = {
    where: TaskPackageWhereUniqueInput
    create: XOR<TaskPackageCreateWithoutCreatedByInput, TaskPackageUncheckedCreateWithoutCreatedByInput>
  }

  export type TaskPackageCreateManyCreatedByInputEnvelope = {
    data: TaskPackageCreateManyCreatedByInput | TaskPackageCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutLabelerInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: TaskPackageCreateNestedOneWithoutTasksInput
    media: MediaResourceCreateNestedOneWithoutTaskInput
    checker?: UserCreateNestedOneWithoutCheckedTasksInput
    annotations?: AnnotationCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutLabelerInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    annotations?: AnnotationUncheckedCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataUncheckedCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutLabelerInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutLabelerInput, TaskUncheckedCreateWithoutLabelerInput>
  }

  export type TaskCreateManyLabelerInputEnvelope = {
    data: TaskCreateManyLabelerInput | TaskCreateManyLabelerInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutCheckerInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: TaskPackageCreateNestedOneWithoutTasksInput
    media: MediaResourceCreateNestedOneWithoutTaskInput
    labeler?: UserCreateNestedOneWithoutLabeledTasksInput
    annotations?: AnnotationCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCheckerInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    annotations?: AnnotationUncheckedCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataUncheckedCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCheckerInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCheckerInput, TaskUncheckedCreateWithoutCheckerInput>
  }

  export type TaskCreateManyCheckerInputEnvelope = {
    data: TaskCreateManyCheckerInput | TaskCreateManyCheckerInput[]
    skipDuplicates?: boolean
  }

  export type AnnotationCreateWithoutCreatedByInput = {
    id?: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutAnnotationsInput
  }

  export type AnnotationUncheckedCreateWithoutCreatedByInput = {
    id?: string
    taskId: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnotationCreateOrConnectWithoutCreatedByInput = {
    where: AnnotationWhereUniqueInput
    create: XOR<AnnotationCreateWithoutCreatedByInput, AnnotationUncheckedCreateWithoutCreatedByInput>
  }

  export type AnnotationCreateManyCreatedByInputEnvelope = {
    data: AnnotationCreateManyCreatedByInput | AnnotationCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type QualityScoreCreateWithoutCreatedByInput = {
    id?: string
    score: number
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutQualityScoresInput
  }

  export type QualityScoreUncheckedCreateWithoutCreatedByInput = {
    id?: string
    taskId: string
    score: number
    createdAt?: Date | string
  }

  export type QualityScoreCreateOrConnectWithoutCreatedByInput = {
    where: QualityScoreWhereUniqueInput
    create: XOR<QualityScoreCreateWithoutCreatedByInput, QualityScoreUncheckedCreateWithoutCreatedByInput>
  }

  export type QualityScoreCreateManyCreatedByInputEnvelope = {
    data: QualityScoreCreateManyCreatedByInput | QualityScoreCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type OperationLogCreateWithoutUserInput = {
    id?: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutOperationLogsInput
  }

  export type OperationLogUncheckedCreateWithoutUserInput = {
    id?: string
    taskId: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OperationLogCreateOrConnectWithoutUserInput = {
    where: OperationLogWhereUniqueInput
    create: XOR<OperationLogCreateWithoutUserInput, OperationLogUncheckedCreateWithoutUserInput>
  }

  export type OperationLogCreateManyUserInputEnvelope = {
    data: OperationLogCreateManyUserInput | OperationLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskPackageUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TaskPackageWhereUniqueInput
    update: XOR<TaskPackageUpdateWithoutCreatedByInput, TaskPackageUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TaskPackageCreateWithoutCreatedByInput, TaskPackageUncheckedCreateWithoutCreatedByInput>
  }

  export type TaskPackageUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TaskPackageWhereUniqueInput
    data: XOR<TaskPackageUpdateWithoutCreatedByInput, TaskPackageUncheckedUpdateWithoutCreatedByInput>
  }

  export type TaskPackageUpdateManyWithWhereWithoutCreatedByInput = {
    where: TaskPackageScalarWhereInput
    data: XOR<TaskPackageUpdateManyMutationInput, TaskPackageUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TaskPackageScalarWhereInput = {
    AND?: TaskPackageScalarWhereInput | TaskPackageScalarWhereInput[]
    OR?: TaskPackageScalarWhereInput[]
    NOT?: TaskPackageScalarWhereInput | TaskPackageScalarWhereInput[]
    id?: StringFilter<"TaskPackage"> | string
    name?: StringFilter<"TaskPackage"> | string
    description?: StringNullableFilter<"TaskPackage"> | string | null
    status?: EnumPackageStatusFilter<"TaskPackage"> | $Enums.PackageStatus
    totalCount?: IntFilter<"TaskPackage"> | number
    createdById?: StringFilter<"TaskPackage"> | string
    createdAt?: DateTimeFilter<"TaskPackage"> | Date | string
    updatedAt?: DateTimeFilter<"TaskPackage"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutLabelerInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutLabelerInput, TaskUncheckedUpdateWithoutLabelerInput>
    create: XOR<TaskCreateWithoutLabelerInput, TaskUncheckedCreateWithoutLabelerInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutLabelerInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutLabelerInput, TaskUncheckedUpdateWithoutLabelerInput>
  }

  export type TaskUpdateManyWithWhereWithoutLabelerInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutLabelerInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    packageId?: StringFilter<"Task"> | string
    mediaId?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    labelerId?: StringNullableFilter<"Task"> | string | null
    checkerId?: StringNullableFilter<"Task"> | string | null
    assignedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    labeledAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    checkedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutCheckerInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutCheckerInput, TaskUncheckedUpdateWithoutCheckerInput>
    create: XOR<TaskCreateWithoutCheckerInput, TaskUncheckedCreateWithoutCheckerInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutCheckerInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutCheckerInput, TaskUncheckedUpdateWithoutCheckerInput>
  }

  export type TaskUpdateManyWithWhereWithoutCheckerInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutCheckerInput>
  }

  export type AnnotationUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: AnnotationWhereUniqueInput
    update: XOR<AnnotationUpdateWithoutCreatedByInput, AnnotationUncheckedUpdateWithoutCreatedByInput>
    create: XOR<AnnotationCreateWithoutCreatedByInput, AnnotationUncheckedCreateWithoutCreatedByInput>
  }

  export type AnnotationUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: AnnotationWhereUniqueInput
    data: XOR<AnnotationUpdateWithoutCreatedByInput, AnnotationUncheckedUpdateWithoutCreatedByInput>
  }

  export type AnnotationUpdateManyWithWhereWithoutCreatedByInput = {
    where: AnnotationScalarWhereInput
    data: XOR<AnnotationUpdateManyMutationInput, AnnotationUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type AnnotationScalarWhereInput = {
    AND?: AnnotationScalarWhereInput | AnnotationScalarWhereInput[]
    OR?: AnnotationScalarWhereInput[]
    NOT?: AnnotationScalarWhereInput | AnnotationScalarWhereInput[]
    id?: StringFilter<"Annotation"> | string
    taskId?: StringFilter<"Annotation"> | string
    type?: EnumAnnotationTypeFilter<"Annotation"> | $Enums.AnnotationType
    coordinates?: JsonFilter<"Annotation">
    label?: StringNullableFilter<"Annotation"> | string | null
    frameTime?: FloatNullableFilter<"Annotation"> | number | null
    createdById?: StringFilter<"Annotation"> | string
    createdAt?: DateTimeFilter<"Annotation"> | Date | string
    updatedAt?: DateTimeFilter<"Annotation"> | Date | string
  }

  export type QualityScoreUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: QualityScoreWhereUniqueInput
    update: XOR<QualityScoreUpdateWithoutCreatedByInput, QualityScoreUncheckedUpdateWithoutCreatedByInput>
    create: XOR<QualityScoreCreateWithoutCreatedByInput, QualityScoreUncheckedCreateWithoutCreatedByInput>
  }

  export type QualityScoreUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: QualityScoreWhereUniqueInput
    data: XOR<QualityScoreUpdateWithoutCreatedByInput, QualityScoreUncheckedUpdateWithoutCreatedByInput>
  }

  export type QualityScoreUpdateManyWithWhereWithoutCreatedByInput = {
    where: QualityScoreScalarWhereInput
    data: XOR<QualityScoreUpdateManyMutationInput, QualityScoreUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type QualityScoreScalarWhereInput = {
    AND?: QualityScoreScalarWhereInput | QualityScoreScalarWhereInput[]
    OR?: QualityScoreScalarWhereInput[]
    NOT?: QualityScoreScalarWhereInput | QualityScoreScalarWhereInput[]
    id?: StringFilter<"QualityScore"> | string
    taskId?: StringFilter<"QualityScore"> | string
    score?: IntFilter<"QualityScore"> | number
    createdById?: StringFilter<"QualityScore"> | string
    createdAt?: DateTimeFilter<"QualityScore"> | Date | string
  }

  export type OperationLogUpsertWithWhereUniqueWithoutUserInput = {
    where: OperationLogWhereUniqueInput
    update: XOR<OperationLogUpdateWithoutUserInput, OperationLogUncheckedUpdateWithoutUserInput>
    create: XOR<OperationLogCreateWithoutUserInput, OperationLogUncheckedCreateWithoutUserInput>
  }

  export type OperationLogUpdateWithWhereUniqueWithoutUserInput = {
    where: OperationLogWhereUniqueInput
    data: XOR<OperationLogUpdateWithoutUserInput, OperationLogUncheckedUpdateWithoutUserInput>
  }

  export type OperationLogUpdateManyWithWhereWithoutUserInput = {
    where: OperationLogScalarWhereInput
    data: XOR<OperationLogUpdateManyMutationInput, OperationLogUncheckedUpdateManyWithoutUserInput>
  }

  export type OperationLogScalarWhereInput = {
    AND?: OperationLogScalarWhereInput | OperationLogScalarWhereInput[]
    OR?: OperationLogScalarWhereInput[]
    NOT?: OperationLogScalarWhereInput | OperationLogScalarWhereInput[]
    id?: StringFilter<"OperationLog"> | string
    taskId?: StringFilter<"OperationLog"> | string
    userId?: StringFilter<"OperationLog"> | string
    action?: StringFilter<"OperationLog"> | string
    oldStatus?: StringNullableFilter<"OperationLog"> | string | null
    newStatus?: StringNullableFilter<"OperationLog"> | string | null
    details?: JsonNullableFilter<"OperationLog">
    createdAt?: DateTimeFilter<"OperationLog"> | Date | string
  }

  export type TaskCreateWithoutMediaInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: TaskPackageCreateNestedOneWithoutTasksInput
    labeler?: UserCreateNestedOneWithoutLabeledTasksInput
    checker?: UserCreateNestedOneWithoutCheckedTasksInput
    annotations?: AnnotationCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutMediaInput = {
    id?: string
    packageId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    annotations?: AnnotationUncheckedCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataUncheckedCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutMediaInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutMediaInput, TaskUncheckedCreateWithoutMediaInput>
  }

  export type TaskUpsertWithoutMediaInput = {
    update: XOR<TaskUpdateWithoutMediaInput, TaskUncheckedUpdateWithoutMediaInput>
    create: XOR<TaskCreateWithoutMediaInput, TaskUncheckedCreateWithoutMediaInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutMediaInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutMediaInput, TaskUncheckedUpdateWithoutMediaInput>
  }

  export type TaskUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: TaskPackageUpdateOneRequiredWithoutTasksNestedInput
    labeler?: UserUpdateOneWithoutLabeledTasksNestedInput
    checker?: UserUpdateOneWithoutCheckedTasksNestedInput
    annotations?: AnnotationUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    annotations?: AnnotationUncheckedUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserCreateWithoutCreatedPackagesInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    labeledTasks?: TaskCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedPackagesInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    labeledTasks?: TaskUncheckedCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskUncheckedCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationUncheckedCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedPackagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedPackagesInput, UserUncheckedCreateWithoutCreatedPackagesInput>
  }

  export type TaskCreateWithoutPackageInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    media: MediaResourceCreateNestedOneWithoutTaskInput
    labeler?: UserCreateNestedOneWithoutLabeledTasksInput
    checker?: UserCreateNestedOneWithoutCheckedTasksInput
    annotations?: AnnotationCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutPackageInput = {
    id?: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    annotations?: AnnotationUncheckedCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataUncheckedCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutPackageInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutPackageInput, TaskUncheckedCreateWithoutPackageInput>
  }

  export type TaskCreateManyPackageInputEnvelope = {
    data: TaskCreateManyPackageInput | TaskCreateManyPackageInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedPackagesInput = {
    update: XOR<UserUpdateWithoutCreatedPackagesInput, UserUncheckedUpdateWithoutCreatedPackagesInput>
    create: XOR<UserCreateWithoutCreatedPackagesInput, UserUncheckedCreateWithoutCreatedPackagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedPackagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedPackagesInput, UserUncheckedUpdateWithoutCreatedPackagesInput>
  }

  export type UserUpdateWithoutCreatedPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labeledTasks?: TaskUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labeledTasks?: TaskUncheckedUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUncheckedUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUncheckedUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutPackageInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutPackageInput, TaskUncheckedUpdateWithoutPackageInput>
    create: XOR<TaskCreateWithoutPackageInput, TaskUncheckedCreateWithoutPackageInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutPackageInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutPackageInput, TaskUncheckedUpdateWithoutPackageInput>
  }

  export type TaskUpdateManyWithWhereWithoutPackageInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutPackageInput>
  }

  export type TaskPackageCreateWithoutTasksInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.PackageStatus
    totalCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedPackagesInput
  }

  export type TaskPackageUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.PackageStatus
    totalCount?: number
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskPackageCreateOrConnectWithoutTasksInput = {
    where: TaskPackageWhereUniqueInput
    create: XOR<TaskPackageCreateWithoutTasksInput, TaskPackageUncheckedCreateWithoutTasksInput>
  }

  export type MediaResourceCreateWithoutTaskInput = {
    id?: string
    s3Key: string
    s3Url: string
    type: $Enums.MediaType
    fileName: string
    fileSize: number
    duration?: number | null
    width?: number | null
    height?: number | null
    autoNumber?: number
    createdAt?: Date | string
  }

  export type MediaResourceUncheckedCreateWithoutTaskInput = {
    id?: string
    s3Key: string
    s3Url: string
    type: $Enums.MediaType
    fileName: string
    fileSize: number
    duration?: number | null
    width?: number | null
    height?: number | null
    autoNumber?: number
    createdAt?: Date | string
  }

  export type MediaResourceCreateOrConnectWithoutTaskInput = {
    where: MediaResourceWhereUniqueInput
    create: XOR<MediaResourceCreateWithoutTaskInput, MediaResourceUncheckedCreateWithoutTaskInput>
  }

  export type UserCreateWithoutLabeledTasksInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageCreateNestedManyWithoutCreatedByInput
    checkedTasks?: TaskCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLabeledTasksInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageUncheckedCreateNestedManyWithoutCreatedByInput
    checkedTasks?: TaskUncheckedCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationUncheckedCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLabeledTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLabeledTasksInput, UserUncheckedCreateWithoutLabeledTasksInput>
  }

  export type UserCreateWithoutCheckedTasksInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskCreateNestedManyWithoutLabelerInput
    annotations?: AnnotationCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCheckedTasksInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageUncheckedCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskUncheckedCreateNestedManyWithoutLabelerInput
    annotations?: AnnotationUncheckedCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCheckedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCheckedTasksInput, UserUncheckedCreateWithoutCheckedTasksInput>
  }

  export type AnnotationCreateWithoutTaskInput = {
    id?: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutAnnotationsInput
  }

  export type AnnotationUncheckedCreateWithoutTaskInput = {
    id?: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnotationCreateOrConnectWithoutTaskInput = {
    where: AnnotationWhereUniqueInput
    create: XOR<AnnotationCreateWithoutTaskInput, AnnotationUncheckedCreateWithoutTaskInput>
  }

  export type AnnotationCreateManyTaskInputEnvelope = {
    data: AnnotationCreateManyTaskInput | AnnotationCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskMetadataCreateWithoutTaskInput = {
    id?: string
    remarks?: string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskMetadataUncheckedCreateWithoutTaskInput = {
    id?: string
    remarks?: string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskMetadataCreateOrConnectWithoutTaskInput = {
    where: TaskMetadataWhereUniqueInput
    create: XOR<TaskMetadataCreateWithoutTaskInput, TaskMetadataUncheckedCreateWithoutTaskInput>
  }

  export type QualityScoreCreateWithoutTaskInput = {
    id?: string
    score: number
    createdAt?: Date | string
    createdBy: UserCreateNestedOneWithoutQualityScoresInput
  }

  export type QualityScoreUncheckedCreateWithoutTaskInput = {
    id?: string
    score: number
    createdById: string
    createdAt?: Date | string
  }

  export type QualityScoreCreateOrConnectWithoutTaskInput = {
    where: QualityScoreWhereUniqueInput
    create: XOR<QualityScoreCreateWithoutTaskInput, QualityScoreUncheckedCreateWithoutTaskInput>
  }

  export type QualityScoreCreateManyTaskInputEnvelope = {
    data: QualityScoreCreateManyTaskInput | QualityScoreCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type OperationLogCreateWithoutTaskInput = {
    id?: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutOperationLogsInput
  }

  export type OperationLogUncheckedCreateWithoutTaskInput = {
    id?: string
    userId: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OperationLogCreateOrConnectWithoutTaskInput = {
    where: OperationLogWhereUniqueInput
    create: XOR<OperationLogCreateWithoutTaskInput, OperationLogUncheckedCreateWithoutTaskInput>
  }

  export type OperationLogCreateManyTaskInputEnvelope = {
    data: OperationLogCreateManyTaskInput | OperationLogCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type TaskPackageUpsertWithoutTasksInput = {
    update: XOR<TaskPackageUpdateWithoutTasksInput, TaskPackageUncheckedUpdateWithoutTasksInput>
    create: XOR<TaskPackageCreateWithoutTasksInput, TaskPackageUncheckedCreateWithoutTasksInput>
    where?: TaskPackageWhereInput
  }

  export type TaskPackageUpdateToOneWithWhereWithoutTasksInput = {
    where?: TaskPackageWhereInput
    data: XOR<TaskPackageUpdateWithoutTasksInput, TaskPackageUncheckedUpdateWithoutTasksInput>
  }

  export type TaskPackageUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedPackagesNestedInput
  }

  export type TaskPackageUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaResourceUpsertWithoutTaskInput = {
    update: XOR<MediaResourceUpdateWithoutTaskInput, MediaResourceUncheckedUpdateWithoutTaskInput>
    create: XOR<MediaResourceCreateWithoutTaskInput, MediaResourceUncheckedCreateWithoutTaskInput>
    where?: MediaResourceWhereInput
  }

  export type MediaResourceUpdateToOneWithWhereWithoutTaskInput = {
    where?: MediaResourceWhereInput
    data: XOR<MediaResourceUpdateWithoutTaskInput, MediaResourceUncheckedUpdateWithoutTaskInput>
  }

  export type MediaResourceUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaResourceUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    autoNumber?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutLabeledTasksInput = {
    update: XOR<UserUpdateWithoutLabeledTasksInput, UserUncheckedUpdateWithoutLabeledTasksInput>
    create: XOR<UserCreateWithoutLabeledTasksInput, UserUncheckedCreateWithoutLabeledTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLabeledTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLabeledTasksInput, UserUncheckedUpdateWithoutLabeledTasksInput>
  }

  export type UserUpdateWithoutLabeledTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUpdateManyWithoutCreatedByNestedInput
    checkedTasks?: TaskUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLabeledTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUncheckedUpdateManyWithoutCreatedByNestedInput
    checkedTasks?: TaskUncheckedUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUncheckedUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutCheckedTasksInput = {
    update: XOR<UserUpdateWithoutCheckedTasksInput, UserUncheckedUpdateWithoutCheckedTasksInput>
    create: XOR<UserCreateWithoutCheckedTasksInput, UserUncheckedCreateWithoutCheckedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCheckedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCheckedTasksInput, UserUncheckedUpdateWithoutCheckedTasksInput>
  }

  export type UserUpdateWithoutCheckedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUpdateManyWithoutLabelerNestedInput
    annotations?: AnnotationUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCheckedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUncheckedUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUncheckedUpdateManyWithoutLabelerNestedInput
    annotations?: AnnotationUncheckedUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AnnotationUpsertWithWhereUniqueWithoutTaskInput = {
    where: AnnotationWhereUniqueInput
    update: XOR<AnnotationUpdateWithoutTaskInput, AnnotationUncheckedUpdateWithoutTaskInput>
    create: XOR<AnnotationCreateWithoutTaskInput, AnnotationUncheckedCreateWithoutTaskInput>
  }

  export type AnnotationUpdateWithWhereUniqueWithoutTaskInput = {
    where: AnnotationWhereUniqueInput
    data: XOR<AnnotationUpdateWithoutTaskInput, AnnotationUncheckedUpdateWithoutTaskInput>
  }

  export type AnnotationUpdateManyWithWhereWithoutTaskInput = {
    where: AnnotationScalarWhereInput
    data: XOR<AnnotationUpdateManyMutationInput, AnnotationUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskMetadataUpsertWithoutTaskInput = {
    update: XOR<TaskMetadataUpdateWithoutTaskInput, TaskMetadataUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskMetadataCreateWithoutTaskInput, TaskMetadataUncheckedCreateWithoutTaskInput>
    where?: TaskMetadataWhereInput
  }

  export type TaskMetadataUpdateToOneWithWhereWithoutTaskInput = {
    where?: TaskMetadataWhereInput
    data: XOR<TaskMetadataUpdateWithoutTaskInput, TaskMetadataUncheckedUpdateWithoutTaskInput>
  }

  export type TaskMetadataUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMetadataUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    videoClips?: NullableJsonNullValueInput | InputJsonValue
    croppedAreas?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QualityScoreUpsertWithWhereUniqueWithoutTaskInput = {
    where: QualityScoreWhereUniqueInput
    update: XOR<QualityScoreUpdateWithoutTaskInput, QualityScoreUncheckedUpdateWithoutTaskInput>
    create: XOR<QualityScoreCreateWithoutTaskInput, QualityScoreUncheckedCreateWithoutTaskInput>
  }

  export type QualityScoreUpdateWithWhereUniqueWithoutTaskInput = {
    where: QualityScoreWhereUniqueInput
    data: XOR<QualityScoreUpdateWithoutTaskInput, QualityScoreUncheckedUpdateWithoutTaskInput>
  }

  export type QualityScoreUpdateManyWithWhereWithoutTaskInput = {
    where: QualityScoreScalarWhereInput
    data: XOR<QualityScoreUpdateManyMutationInput, QualityScoreUncheckedUpdateManyWithoutTaskInput>
  }

  export type OperationLogUpsertWithWhereUniqueWithoutTaskInput = {
    where: OperationLogWhereUniqueInput
    update: XOR<OperationLogUpdateWithoutTaskInput, OperationLogUncheckedUpdateWithoutTaskInput>
    create: XOR<OperationLogCreateWithoutTaskInput, OperationLogUncheckedCreateWithoutTaskInput>
  }

  export type OperationLogUpdateWithWhereUniqueWithoutTaskInput = {
    where: OperationLogWhereUniqueInput
    data: XOR<OperationLogUpdateWithoutTaskInput, OperationLogUncheckedUpdateWithoutTaskInput>
  }

  export type OperationLogUpdateManyWithWhereWithoutTaskInput = {
    where: OperationLogScalarWhereInput
    data: XOR<OperationLogUpdateManyMutationInput, OperationLogUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutAnnotationsInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: TaskPackageCreateNestedOneWithoutTasksInput
    media: MediaResourceCreateNestedOneWithoutTaskInput
    labeler?: UserCreateNestedOneWithoutLabeledTasksInput
    checker?: UserCreateNestedOneWithoutCheckedTasksInput
    metadata?: TaskMetadataCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutAnnotationsInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: TaskMetadataUncheckedCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutAnnotationsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAnnotationsInput, TaskUncheckedCreateWithoutAnnotationsInput>
  }

  export type UserCreateWithoutAnnotationsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskCreateNestedManyWithoutCheckerInput
    qualityScores?: QualityScoreCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAnnotationsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageUncheckedCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskUncheckedCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskUncheckedCreateNestedManyWithoutCheckerInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAnnotationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnnotationsInput, UserUncheckedCreateWithoutAnnotationsInput>
  }

  export type TaskUpsertWithoutAnnotationsInput = {
    update: XOR<TaskUpdateWithoutAnnotationsInput, TaskUncheckedUpdateWithoutAnnotationsInput>
    create: XOR<TaskCreateWithoutAnnotationsInput, TaskUncheckedCreateWithoutAnnotationsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutAnnotationsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutAnnotationsInput, TaskUncheckedUpdateWithoutAnnotationsInput>
  }

  export type TaskUpdateWithoutAnnotationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: TaskPackageUpdateOneRequiredWithoutTasksNestedInput
    media?: MediaResourceUpdateOneRequiredWithoutTaskNestedInput
    labeler?: UserUpdateOneWithoutLabeledTasksNestedInput
    checker?: UserUpdateOneWithoutCheckedTasksNestedInput
    metadata?: TaskMetadataUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutAnnotationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutAnnotationsInput = {
    update: XOR<UserUpdateWithoutAnnotationsInput, UserUncheckedUpdateWithoutAnnotationsInput>
    create: XOR<UserCreateWithoutAnnotationsInput, UserUncheckedCreateWithoutAnnotationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnnotationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnnotationsInput, UserUncheckedUpdateWithoutAnnotationsInput>
  }

  export type UserUpdateWithoutAnnotationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUpdateManyWithoutCheckerNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAnnotationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUncheckedUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUncheckedUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUncheckedUpdateManyWithoutCheckerNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCreateWithoutMetadataInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: TaskPackageCreateNestedOneWithoutTasksInput
    media: MediaResourceCreateNestedOneWithoutTaskInput
    labeler?: UserCreateNestedOneWithoutLabeledTasksInput
    checker?: UserCreateNestedOneWithoutCheckedTasksInput
    annotations?: AnnotationCreateNestedManyWithoutTaskInput
    qualityScores?: QualityScoreCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutMetadataInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    annotations?: AnnotationUncheckedCreateNestedManyWithoutTaskInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutTaskInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutMetadataInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutMetadataInput, TaskUncheckedCreateWithoutMetadataInput>
  }

  export type TaskUpsertWithoutMetadataInput = {
    update: XOR<TaskUpdateWithoutMetadataInput, TaskUncheckedUpdateWithoutMetadataInput>
    create: XOR<TaskCreateWithoutMetadataInput, TaskUncheckedCreateWithoutMetadataInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutMetadataInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutMetadataInput, TaskUncheckedUpdateWithoutMetadataInput>
  }

  export type TaskUpdateWithoutMetadataInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: TaskPackageUpdateOneRequiredWithoutTasksNestedInput
    media?: MediaResourceUpdateOneRequiredWithoutTaskNestedInput
    labeler?: UserUpdateOneWithoutLabeledTasksNestedInput
    checker?: UserUpdateOneWithoutCheckedTasksNestedInput
    annotations?: AnnotationUpdateManyWithoutTaskNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutMetadataInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    annotations?: AnnotationUncheckedUpdateManyWithoutTaskNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateWithoutQualityScoresInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: TaskPackageCreateNestedOneWithoutTasksInput
    media: MediaResourceCreateNestedOneWithoutTaskInput
    labeler?: UserCreateNestedOneWithoutLabeledTasksInput
    checker?: UserCreateNestedOneWithoutCheckedTasksInput
    annotations?: AnnotationCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataCreateNestedOneWithoutTaskInput
    operationLogs?: OperationLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutQualityScoresInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    annotations?: AnnotationUncheckedCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataUncheckedCreateNestedOneWithoutTaskInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutQualityScoresInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutQualityScoresInput, TaskUncheckedCreateWithoutQualityScoresInput>
  }

  export type UserCreateWithoutQualityScoresInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQualityScoresInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageUncheckedCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskUncheckedCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskUncheckedCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationUncheckedCreateNestedManyWithoutCreatedByInput
    operationLogs?: OperationLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQualityScoresInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQualityScoresInput, UserUncheckedCreateWithoutQualityScoresInput>
  }

  export type TaskUpsertWithoutQualityScoresInput = {
    update: XOR<TaskUpdateWithoutQualityScoresInput, TaskUncheckedUpdateWithoutQualityScoresInput>
    create: XOR<TaskCreateWithoutQualityScoresInput, TaskUncheckedCreateWithoutQualityScoresInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutQualityScoresInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutQualityScoresInput, TaskUncheckedUpdateWithoutQualityScoresInput>
  }

  export type TaskUpdateWithoutQualityScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: TaskPackageUpdateOneRequiredWithoutTasksNestedInput
    media?: MediaResourceUpdateOneRequiredWithoutTaskNestedInput
    labeler?: UserUpdateOneWithoutLabeledTasksNestedInput
    checker?: UserUpdateOneWithoutCheckedTasksNestedInput
    annotations?: AnnotationUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUpdateOneWithoutTaskNestedInput
    operationLogs?: OperationLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutQualityScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    annotations?: AnnotationUncheckedUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutQualityScoresInput = {
    update: XOR<UserUpdateWithoutQualityScoresInput, UserUncheckedUpdateWithoutQualityScoresInput>
    create: XOR<UserCreateWithoutQualityScoresInput, UserUncheckedCreateWithoutQualityScoresInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQualityScoresInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQualityScoresInput, UserUncheckedUpdateWithoutQualityScoresInput>
  }

  export type UserUpdateWithoutQualityScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQualityScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUncheckedUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUncheckedUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUncheckedUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUncheckedUpdateManyWithoutCreatedByNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCreateWithoutOperationLogsInput = {
    id?: string
    status?: $Enums.TaskStatus
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: TaskPackageCreateNestedOneWithoutTasksInput
    media: MediaResourceCreateNestedOneWithoutTaskInput
    labeler?: UserCreateNestedOneWithoutLabeledTasksInput
    checker?: UserCreateNestedOneWithoutCheckedTasksInput
    annotations?: AnnotationCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutOperationLogsInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    annotations?: AnnotationUncheckedCreateNestedManyWithoutTaskInput
    metadata?: TaskMetadataUncheckedCreateNestedOneWithoutTaskInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutOperationLogsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutOperationLogsInput, TaskUncheckedCreateWithoutOperationLogsInput>
  }

  export type UserCreateWithoutOperationLogsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutOperationLogsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPackages?: TaskPackageUncheckedCreateNestedManyWithoutCreatedByInput
    labeledTasks?: TaskUncheckedCreateNestedManyWithoutLabelerInput
    checkedTasks?: TaskUncheckedCreateNestedManyWithoutCheckerInput
    annotations?: AnnotationUncheckedCreateNestedManyWithoutCreatedByInput
    qualityScores?: QualityScoreUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutOperationLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOperationLogsInput, UserUncheckedCreateWithoutOperationLogsInput>
  }

  export type TaskUpsertWithoutOperationLogsInput = {
    update: XOR<TaskUpdateWithoutOperationLogsInput, TaskUncheckedUpdateWithoutOperationLogsInput>
    create: XOR<TaskCreateWithoutOperationLogsInput, TaskUncheckedCreateWithoutOperationLogsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutOperationLogsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutOperationLogsInput, TaskUncheckedUpdateWithoutOperationLogsInput>
  }

  export type TaskUpdateWithoutOperationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: TaskPackageUpdateOneRequiredWithoutTasksNestedInput
    media?: MediaResourceUpdateOneRequiredWithoutTaskNestedInput
    labeler?: UserUpdateOneWithoutLabeledTasksNestedInput
    checker?: UserUpdateOneWithoutCheckedTasksNestedInput
    annotations?: AnnotationUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutOperationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    annotations?: AnnotationUncheckedUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutOperationLogsInput = {
    update: XOR<UserUpdateWithoutOperationLogsInput, UserUncheckedUpdateWithoutOperationLogsInput>
    create: XOR<UserCreateWithoutOperationLogsInput, UserUncheckedCreateWithoutOperationLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOperationLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOperationLogsInput, UserUncheckedUpdateWithoutOperationLogsInput>
  }

  export type UserUpdateWithoutOperationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutOperationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPackages?: TaskPackageUncheckedUpdateManyWithoutCreatedByNestedInput
    labeledTasks?: TaskUncheckedUpdateManyWithoutLabelerNestedInput
    checkedTasks?: TaskUncheckedUpdateManyWithoutCheckerNestedInput
    annotations?: AnnotationUncheckedUpdateManyWithoutCreatedByNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type TaskPackageCreateManyCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.PackageStatus
    totalCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyLabelerInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyCheckerInput = {
    id?: string
    packageId: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnotationCreateManyCreatedByInput = {
    id?: string
    taskId: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QualityScoreCreateManyCreatedByInput = {
    id?: string
    taskId: string
    score: number
    createdAt?: Date | string
  }

  export type OperationLogCreateManyUserInput = {
    id?: string
    taskId: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskPackageUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutPackageNestedInput
  }

  export type TaskPackageUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type TaskPackageUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPackageStatusFieldUpdateOperationsInput | $Enums.PackageStatus
    totalCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutLabelerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: TaskPackageUpdateOneRequiredWithoutTasksNestedInput
    media?: MediaResourceUpdateOneRequiredWithoutTaskNestedInput
    checker?: UserUpdateOneWithoutCheckedTasksNestedInput
    annotations?: AnnotationUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutLabelerInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    annotations?: AnnotationUncheckedUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutLabelerInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutCheckerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: TaskPackageUpdateOneRequiredWithoutTasksNestedInput
    media?: MediaResourceUpdateOneRequiredWithoutTaskNestedInput
    labeler?: UserUpdateOneWithoutLabeledTasksNestedInput
    annotations?: AnnotationUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCheckerInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    annotations?: AnnotationUncheckedUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutCheckerInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnotationUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutAnnotationsNestedInput
  }

  export type AnnotationUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnotationUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QualityScoreUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutQualityScoresNestedInput
  }

  export type QualityScoreUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QualityScoreUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutOperationLogsNestedInput
  }

  export type OperationLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyPackageInput = {
    id?: string
    mediaId: string
    status?: $Enums.TaskStatus
    labelerId?: string | null
    checkerId?: string | null
    assignedAt?: Date | string | null
    labeledAt?: Date | string | null
    checkedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaResourceUpdateOneRequiredWithoutTaskNestedInput
    labeler?: UserUpdateOneWithoutLabeledTasksNestedInput
    checker?: UserUpdateOneWithoutCheckedTasksNestedInput
    annotations?: AnnotationUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    annotations?: AnnotationUncheckedUpdateManyWithoutTaskNestedInput
    metadata?: TaskMetadataUncheckedUpdateOneWithoutTaskNestedInput
    qualityScores?: QualityScoreUncheckedUpdateManyWithoutTaskNestedInput
    operationLogs?: OperationLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    labelerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labeledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnotationCreateManyTaskInput = {
    id?: string
    type: $Enums.AnnotationType
    coordinates: JsonNullValueInput | InputJsonValue
    label?: string | null
    frameTime?: number | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QualityScoreCreateManyTaskInput = {
    id?: string
    score: number
    createdById: string
    createdAt?: Date | string
  }

  export type OperationLogCreateManyTaskInput = {
    id?: string
    userId: string
    action: string
    oldStatus?: string | null
    newStatus?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnnotationUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutAnnotationsNestedInput
  }

  export type AnnotationUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnotationUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnnotationTypeFieldUpdateOperationsInput | $Enums.AnnotationType
    coordinates?: JsonNullValueInput | InputJsonValue
    label?: NullableStringFieldUpdateOperationsInput | string | null
    frameTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QualityScoreUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutQualityScoresNestedInput
  }

  export type QualityScoreUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QualityScoreUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOperationLogsNestedInput
  }

  export type OperationLogUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    oldStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}