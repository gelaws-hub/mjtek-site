import { SignupFormSchema, FormState } from "@/app/(authentication)/auth/definitions";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confPassword: formData.get("confPassword"),
    username: formData.get("username"),
    address: formData.get("address"),
    phone_number: formData.get("phone_number"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the api env local /register
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    return {
      errors: { server: await res.text() },
    };
  }
}
