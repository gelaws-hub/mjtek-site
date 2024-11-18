import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="bg-white rounded-l-2xl drop-shadow-lg shadow-background flex flex-col px-[5%] py-[5%]">
      <section className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 mx-auto">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Buat akun baru
          </h1>
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}
