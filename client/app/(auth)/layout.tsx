"use client";

import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main
      className="bg-neutral-100 min-h-screen"
      style={{ backgroundImage: "url('/authBG.svg')" }}
    >
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/somaiya.png" height={20} width={45} alt="logo" />
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-7">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
