import { ParseConfig, ParseResult, Parser } from 'papaparse';

// 5.3 => https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/papaparse/index.d.ts
// 5.2 => https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d3737ebd9125505f7ea237b9f17f1426579a3917/types/papaparse/index.d.ts

export interface CSVReaderConfig<T = any, TInput = undefined>
  extends ParseConfig<T, TInput> {
  /**
   * * * * * * * * * *
   * ParseAsyncConfig
   * * * * * * * * * *
   */

  /**
   * Whether or not to use a worker thread.
   * Using a worker will keep your page reactive, but may be slightly slower.
   * @default false
   */
  worker?: boolean | undefined;
  /**
   * Overrides `Papa.LocalChunkSize` and `Papa.RemoteChunkSize`.
   */
  chunkSize?: number | undefined;
  /**
   * A callback function, identical to `step`, which activates streaming.
   * However, this function is executed after every chunk of the file is loaded and parsed rather than every row.
   * Works only with local and remote files.
   * Do not use both `chunk` and `step` callbacks together.
   */
  chunk?(results: ParseResult<T>, parser: Parser): void;
  /**
   * A callback to execute if FileReader encounters an error.
   * The function is passed two arguments: the error and the File.
   */
  error?(error: Error, file: TInput): void;

  // ParseLocalConfig
  /** The encoding to use when opening local files. If specified, it must be a value supported by the FileReader API. */
  encoding?: string | undefined;

  /**
   * * * * * * * * * * *
   * ParseRemoteConfig
   * * * * * * * * * * *
   */

  /**
   * This indicates that the string you passed as the first argument to `parse()`
   * is actually a URL from which to download a file and parse its contents.
   */
  // download: true;
  download?: boolean | true; // default: false
  /**
   * If defined, should be an object that describes the headers.
   * @example { 'Authorization': 'token 123345678901234567890' }
   * @default undefined
   */
  downloadRequestHeaders?: { [headerName: string]: string } | undefined;
  /**
   * Use POST request on the URL of the download option. The value passed will be set as the body of the request.
   * @default undefined
   */
  downloadRequestBody?:
    | Blob
    | BufferSource
    | FormData
    | URLSearchParams
    | string
    | undefined;
  /**
   * A boolean value passed directly into XMLHttpRequest's "withCredentials" property.
   * @default undefined
   */
  withCredentials?: boolean | undefined;
}

export interface ReadStringConfig<T = any, TInput = undefined>
  extends ParseConfig<T, TInput> {
  /**
   * * * * * * * * * *
   * ParseAsyncConfig
   * * * * * * * * * *
   */

  /**
   * Whether or not to use a worker thread.
   * Using a worker will keep your page reactive, but may be slightly slower.
   * @default false
   */
  worker?: boolean | undefined;
  /**
   * Overrides `Papa.LocalChunkSize` and `Papa.RemoteChunkSize`.
   */
  chunkSize?: number | undefined;
  /**
   * A callback function, identical to `step`, which activates streaming.
   * However, this function is executed after every chunk of the file is loaded and parsed rather than every row.
   * Works only with local and remote files.
   * Do not use both `chunk` and `step` callbacks together.
   */
  chunk?(results: ParseResult<T>, parser: Parser): void;
  /**
   * A callback to execute if FileReader encounters an error.
   * The function is passed two arguments: the error and the File.
   */
  error?(error: Error, file: TInput): void;

  // ParseLocalConfig
  /** The encoding to use when opening local files. If specified, it must be a value supported by the FileReader API. */
  encoding?: string | undefined;

  /**
   * * * * * * * * * * *
   * ParseRemoteConfig
   * * * * * * * * * * *
   */

  /**
   * This indicates that the string you passed as the first argument to `parse()`
   * is actually a URL from which to download a file and parse its contents.
   */
  // download: true;
  download?: boolean | true; // default: false
  /**
   * If defined, should be an object that describes the headers.
   * @example { 'Authorization': 'token 123345678901234567890' }
   * @default undefined
   */
  downloadRequestHeaders?: { [headerName: string]: string } | undefined;
  /**
   * Use POST request on the URL of the download option. The value passed will be set as the body of the request.
   * @default undefined
   */
  downloadRequestBody?:
    | Blob
    | BufferSource
    | FormData
    | URLSearchParams
    | string
    | undefined;
  /**
   * A boolean value passed directly into XMLHttpRequest's "withCredentials" property.
   * @default undefined
   */
  withCredentials?: boolean | undefined;
}
