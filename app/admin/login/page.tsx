import { Suspense } from "react";

import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbf7f5] px-4 py-12 text-[#35252d]">
      <section className="w-full max-w-md rounded-lg border border-[#eadde1] bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9c6072]">
          Admin
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[#35252d]">
          Private Access
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#725d66]">
          Enter the admin password to manage products and Studio content.
        </p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
