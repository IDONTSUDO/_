import { ArrayExtensions } from "./array";
import { BufferExtensions } from "./buffer";
import { NumberExtensions } from "./number";
import { StringExtensions } from "./string";

// type callBackBoolean = <T>(el: T) => boolean;

declare global {
  interface Array<T> {
    // @strict: The parameter is determined whether the arrays must be exactly the same in content and order of this relationship or simply follow the same requirements.
    equals(array: Array<T>, strict: boolean): boolean;
    lastElement(): T | undefined;
    firstElement(): T | undefined;
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    unique(): Array<T>;
    sortFilter(predicate: (el: T) => boolean): Array<Array<T>>;
  }
  interface BufferConstructor {
    joinBuffers(buffers: Array<Buffer>, delimiter?: string);
  }
  interface Number {
    isNegative(): boolean;
    isPositive(): boolean;
  }
  interface String {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    lastElement(): string;
    hasPattern(pattern: string): boolean;
    hasNoPattern(pattern: string): boolean;
    pathNormalize(): string;
  }
}
export const extensions = () => {
  ArrayExtensions();
  StringExtensions();
  NumberExtensions();
  BufferExtensions();
};
