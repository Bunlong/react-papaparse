import { ParseConfig } from 'papaparse';

// 5.3 => https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/papaparse/index.d.ts
// 5.2 => https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d3737ebd9125505f7ea237b9f17f1426579a3917/types/papaparse/index.d.ts

export interface CSVReaderConfig<T = any, TInput = undefined> extends ParseConfig<T, TInput> {
  /** The encoding to use when opening local files. If specified, it must be a value supported by the FileReader API. */
  encoding?: string | undefined;
}
