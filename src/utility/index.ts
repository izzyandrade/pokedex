import { Action, Reducer } from "redux";
import produce from "immer";
import { Platform, PixelRatio, Dimensions } from "react-native";

export function createReducer(intialState: any, handlers: any) {
  return (state = intialState, action: { type: string }) => {
    const handler = handlers[action.type];

    if (!handler) {
      return state;
    }
    return produce(state, (draft: any) => handler(draft, action));
  };
}

type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

type GetArgumentType<original extends Function> = original extends (
  ...x: infer argumentsType
) => any
  ? argumentsType
  : never;
type QuickActionCreator<T extends Function, A> = (
  ...args: GetArgumentType<T>
) => Action<A>;
type ActionGroup<T> = {
  [K in keyof SubType<T, (...args: any) => void>]: T[K] extends Function
    ? QuickActionCreator<T[K], any>
    : never;
};

export class Hen<T> {
  state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }
}

export function hen<T extends Hen<any>>(
  cls: T,
  injectedReducers: { [k: string]: any } = {}
): [Reducer, ActionGroup<T>] {
  const actionPrefix = cls.constructor.name;
  let reducers: { [k: string]: any } = {};
  let actions: { [k: string]: any } = {};

  // create reducers
  Reflect.ownKeys(Reflect.getPrototypeOf(cls))
    .concat(Reflect.ownKeys(cls))
    .forEach((key) => {
      if (key === "constructor") {
        return;
      }
      const actionType = `${actionPrefix}.${key as string}`;
      const p = (cls as any)[key];
      if (typeof p !== "function") {
        return;
      }

      reducers[actionType] = (
        state: T,
        action: { type: string; payload: any }
      ) => {
        let reducerClass = new (cls as any).constructor(state);
        reducerClass[key](...action.payload);
        return state;
      };

      actions[key as any] = function () {
        const act = {
          type: actionType,
          payload: Array.from(arguments),
        };
        return act;
      };
    });
  const red = createReducer(cls.state, { ...reducers, ...injectedReducers });
  return [red, actions as ActionGroup<T>];
}

// based on iphone 5s's scale
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale_ = SCREEN_WIDTH / 320;

export function normalize(size: any) {
  const newSize = size * scale_;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
