import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function Register() {
  const bannerLogin =
    "https://images.tokopedia.net/img/cache/1200/BgtCLw/2021/9/20/a4a3e98f-d9e4-40ae-84b6-8df6903ba113.jpg.webp?ect=4g";
  return (
    <div className="shadow-background flex h-screen flex-col items-center justify-center rounded-l-2xl px-[5%] drop-shadow-lg backdrop-blur scrollbar-track-transparent scrollbar-thumb-blue-900">
      <section className="flex max-h-[85%] w-full max-w-[1000px] flex-grow flex-col md:justify-center overflow-y-auto rounded-lg border bg-white shadow scrollbar-thin md:flex-row">
        <div className="p-4 md:flex-1 md:p-0">
          <img
            src={bannerLogin}
            alt="login"
            width={2000}
            height={2000}
            className="inset-0 -z-10 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-4 p-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Buat akun baru
          </h1>
          <RegisterForm />
        </div>
      </section>
      <div className="fixed -z-10 h-screen w-screen">
        <img
          src="/auth-bg.jpg"
          alt="bg"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
