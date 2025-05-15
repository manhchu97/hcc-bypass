"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const [blob, setBlob] = useState("");
  const [uid, setUid] = useState("");
  const blobRef = useRef("");
  const uidRef = useRef("");
  const resultRef = useRef<HTMLDivElement | null>(null);
  const tokenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const blobValue = searchParams.get("blob");
    const uidValue = searchParams.get("uid");

    if (blobValue) {
      setBlob(blobValue);
      blobRef.current = blobValue;
    }

    if (uidValue) {
      setUid(uidValue);
      uidRef.current = uidValue;
    }
  }, [searchParams]);

  const updateResult = (status: "success" | "failed", token?: string) => {
    if (tokenTimeoutRef.current) {
      clearTimeout(tokenTimeoutRef.current);
    }

    if (resultRef.current) {
      resultRef.current.innerText =
        status === "success" ? `success:${token}` : "failed";
    }
  };

  const handleExecute = () => {
    if (!blobRef.current) {
      alert("Không có blob");
      updateResult("failed");
      return;
    }

    if (window.hcaptcha) {
      try {
        window.hcaptcha.setData({ rqdata: blobRef.current });
        window.hcaptcha.execute();

        // Timeout nếu không có token sau 5 giây
        tokenTimeoutRef.current = setTimeout(() => {
          console.warn(
            "Timeout - không nhận được token, có thể đã hiện challenge"
          );
          updateResult("failed");
        }, 5000);
      } catch (error) {
        console.error("Error executing hCaptcha:", error);
        updateResult("failed");
      }
    } else {
      alert("Captcha chưa sẵn sàng!");
      updateResult("failed");
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
            callback: (token: string) => {
              console.log("Captcha token:", token);
              updateResult("success", token);
            },
            "error-callback": () => {
              console.error("Captcha error");
              updateResult("failed");
            },
            "expired-callback": () => {
              console.warn("Captcha expired");
              updateResult("failed");
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

      <div
        id="result"
        ref={resultRef}
        className="mt-4 text-lg font-bold text-yellow-400"
      ></div>
    </div>
  );
}
