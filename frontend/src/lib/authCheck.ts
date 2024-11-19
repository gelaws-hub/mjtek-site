// import { verify } from "crypto";

// export async function login(formData: FormData) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
//     method: "POST",
//     body: JSON.stringify({
//       email: formData.get("email"),
//       password: formData.get("password"),
//     }),
//   });

//   if (!res.ok) {
//     return {
//       errors: { server: (await res.json()).message },
//     };
//   }

//   const { password: encryptedPassword } = await res.json();
//   const password = formData.get("password") as string;
//   const isPasswordValid = await compare(password, encryptedPassword);

//   if (!isPasswordValid) {
//     return {
//       errors: { server: "Password is incorrect" },
//     };
//   }
// }
