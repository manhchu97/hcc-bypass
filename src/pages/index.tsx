"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { webhook } from "@/services/authService";

export default function Page() {
  const searchParams = useSearchParams();
  const [blob, setBlob] = useState("");
  const [uid, setUid] = useState("");
  const blobRef = useRef("");
  const uidRef = useRef("");

  useEffect(() => {
    const blobValue = searchParams.get("blob");
    const uidValue = searchParams.get("uid");
    console.log(uidValue, "uidValueuidValue");

    if (blobValue) {
      setBlob(blobValue);
      blobRef.current = blobValue;
    }

    if (uidValue) {
      uidRef.current = uidValue;
      setUid(uidValue);
    }
  }, [searchParams]);

  const handleExecute = () => {
    if (!blobRef.current) return alert("Không có blob");

    if (window.hcaptcha) {
      window.hcaptcha.setData({
        rqdata: blobRef.current,
      });
      window.hcaptcha.execute();
    } else {
      alert("Captcha chưa sẵn sàng!");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.hcaptcha) {
        clearInterval(interval);
        const container = document.getElementById("captcha-container");
        if (container) {
          window.hcaptcha.render(container, {
            sitekey: "019f1553-3845-481c-a6f5-5a60ccf6d830",
            size: "invisible",
            callback: async (token: string) => {
              await webhook({
                token,
                uid: uidRef.current,
              });
            },
          });
        }
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 text-white">
      <div id="captcha-container" />
      <h1 className="text-2xl font-bold mb-4">Trang test blob</h1>
      <p className="mb-4">
        Blob hiện tại:{" "}
        <span className="text-green-400">{blob || "Không có"}</span>
      </p>
      <button
        style={{ cursor: "pointer" }}
        id="bypass"
        onClick={handleExecute}
        className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600"
      >
        Gửi Captcha
      </button>
    </div>
  );
}
