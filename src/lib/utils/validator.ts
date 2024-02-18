import {
  Type,
  type Static,
  type TObject,
  type TUnion,
  type TLiteral,
  type SchemaOptions,
} from "@sinclair/typebox";
import Ajv, { type ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import set from "set-value";

const ajv = new Ajv({ allErrors: true, coerceTypes: true, useDefaults: true });
addFormats(ajv, { keywords: true });
addErrors(ajv);

export class ValidationError extends Error {
  errors: Array<{ path: string; message: string }>;
  constructor(errors: Array<ErrorObject>) {
    super();

    this.errors = errors.map(({ instancePath, message }) => ({
      path: instancePath ?? "",
      message: message ?? "",
    }));
  }
}

export function compileValidator<T extends TObject>(schema: T) {
  const validate = (data: FormData | URLSearchParams) => {
    const validator = ajv.compile(schema);
    const object = {};
    for (const key of data.keys()) {
      const values = data.getAll(key);
      if (values.length === 1) {
        set(object, key, values[0]);
      } else {
        set(object, key, values);
      }
    }

    if (validator(object)) {
      return object as Static<T>;
    } else {
      throw new ValidationError(validator.errors ?? []);
    }
  };

  return validate;
}

type IntoStringLiteralUnion<T> = {
  [K in keyof T]: T[K] extends string ? TLiteral<T[K]> : never;
};

export function StringLiteralUnion<T extends string[]>(
  values: readonly [...T],
  options?: SchemaOptions,
): TUnion<IntoStringLiteralUnion<T>> {
  const literals = values.map((value) => Type.Literal(value));
  return Type.Union(literals, options) as TUnion<IntoStringLiteralUnion<T>>;
}
