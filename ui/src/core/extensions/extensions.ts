import { ArrayExtensions } from "./array";
import { MapExtensions } from "./map";
import { NumberExtensions } from "./number";
import { StringExtensions } from "./string";

export type CallBackVoidFunction = <T>(value: T) => void;

export type CallBackStringVoidFunction = (value: string) => void;
export type CallBackEventTarget = (value: EventTarget) => void;
export type OptionalProperties<T> = {
  [P in keyof T]?: T[P];
};

declare global {
  interface Array<T> {
    // @strict: The parameter is determined whether the arrays must be exactly the same in content and order of this relationship or simply follow the same requirements.
    equals(array: Array<T>, strict: boolean): boolean;
    lastElement(): T | undefined;
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    hasIncludeElement(element: T): boolean;
    repeat(quantity: number): Array<T>;
  }
  interface Number {
    fromArray(): number[];
    toPx(): string;
    unixFromDate(): string;
    isValid(str: string): boolean;
    randRange(min: number, max: number): number;
    isPositive(): boolean;
    isNegative(): boolean;
  }

  interface String {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    replaceMany(searchValues: string[], replaceValue: string): string;
    isEqual(str: string): boolean;
    isEqualMany(str: string[]): boolean;
  }
  interface Map<K, V> {
    addValueOrMakeCallback(key: K, value: V, callBack: CallBackVoidFunction): void;
    getKeyFromValueIsExists(value: V): K | undefined;
    overrideValue(key: K, value: OptionalProperties<V>): void;
    keysToJson(): string;
    toArray(): V[];
    getPredicateValue(callBack: (value: V) => boolean): K[];
  }
  interface Vector3 {}
}
export const extensions = () => {
  StringExtensions();
  ArrayExtensions();
  NumberExtensions();
  MapExtensions();
};
