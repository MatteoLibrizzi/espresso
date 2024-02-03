import { ValidationError, compileValidator } from "$lib/utils/validator";
import { Type } from "@sinclair/typebox";
import { fail } from "@sveltejs/kit";

const createGenerationSchema = Type.Object({
  prompt: Type.String(),
});

const createGenerationValidator = compileValidator(createGenerationSchema);

export const actions = {
  default: async ({ request }) => {
    try {
      const data = createGenerationValidator(await request.formData());

      console.log(data);

      return { success: true };
    } catch (e) {
      console.log(e);
      if (e instanceof ValidationError) {
        return fail(400, {
          errors: e.errors,
        });
      }
    }
  },
};
