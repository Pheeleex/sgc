"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import type { Documents } from "@/lib/firebase/getProducts";

interface PaywallClientProps {
  guide: Documents;
}

export default function PaywallClient({ guide }: PaywallClientProps) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSendDocument = async () => {
  if (!email) {
    alert("Enter your email");
    return;
  }

  console.log("Sending document to:", email, "with guide:", guide.files, guide);
  console.log("Guide files:", guide.files);
  setLoading(true);

  try {
    const res = await fetch("/api/send-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        title: guide.title,
        files: guide.files,
      }),
    });

    if (!res.ok) throw new Error("Failed");

    setSuccess(true);
  } catch {
    alert("Could not send email");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-lg p-6 md:p-10">
        {/* Left: Document Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {guide.title}
          </h1>

          <p className="text-gray-600 mb-6">{guide.description}</p>

          <ul className="space-y-2 mb-6">
            {guide.files && guide.files.length > 0 ? (
              guide.files.map((file) => (
                <li key={file.name} className="flex items-center text-gray-700">
                  <span className="mr-2">✓</span>
                  {file.name}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">
                Files will be sent via email after payment
              </li>
            )}
          </ul>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Secure checkout · Email delivery
          </div>
        </div>

        {/* Right: Payment */}
        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-center">
          {!success ? (
            <>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              {/* Temporary price placeholder */}
              <div className="text-2xl font-bold text-gray-900 mb-6">
                ₦3,500
              </div>

              <button onClick={handleSendDocument}>
                {loading ? "Sending..." : "Get Document"}
              </button>

              <button onClick={handleSendDocument}>
                {loading ? "Sending..." : "Get Document"}
              </button>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful 🎉
              </h2>

              <p className="text-gray-600">
                Your document will be sent to <br />
                <span className="font-medium">{email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
