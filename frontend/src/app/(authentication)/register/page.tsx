import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function Register() {
  const bannerLogin =
    "https://images.tokopedia.net/img/cache/1200/BgtCLw/2021/9/20/a4a3e98f-d9e4-40ae-84b6-8df6903ba113.jpg.webp?ect=4g";
  return (
    <div className=" shadow-background flex h-screen flex-col items-center justify-center rounded-l-2xl px-[5%] drop-shadow-lg backdrop-blur scrollbar-track-transparent scrollbar-thumb-blue-900">
      <Image
        src={bannerLogin}
        alt="login"
        width={2000}
        height={2000}
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[.4]"
      />
      <section className="max-h-[90%] w-full flex-grow justify-center overflow-y-auto rounded-lg border bg-white/70 p-4 shadow backdrop-blur-sm scrollbar-thin md:max-w-[70vw] lg:max-w-[60vw] ">
        <div className="space-y-4 p-4 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Buat akun baru
          </h1>
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}
