"use client";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/firebaseConfig"; // Firebase 인증 설정
import { onAuthStateChanged } from "firebase/auth";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from 'next/navigation';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleTryItNow = () => {
    if (!user) {
      toast.error("로그인 후 사용해 주세요!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    router.push("/dashboard");
  };

  return (
    <main>
      <div className="flex flex-col mt-4 items-center lg:flex-row bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 bg-[#282929] dark:bg-slate-800 flex flex-col text-white space-y-5">
          <h1 className="text-4xl font-bold">
            {user ? `${user.email.split("@")[0]}님, Drop In File에 오신 것을 환영합니다!`
              : "Drop In File에 오신 것을 환영합니다!"}
            <br />
          </h1>
          <p className="pb-10">
          편하게 드래그로 파일을 업로드하고 저장한 파일을 원하실 때 어디서든지 다운받으세요. <br /><br/>
          지금 바로 시작해서 더 간편한 파일 관리의 세계를 경험해보세요!
          </p>

          <button
            onClick={handleTryItNow}
            className="bg-blue-400 w-[150px] justify-center py-2 rounded-md px-4 hover:scale-105 flex items-center gap-1 text-white"
          >
            Try It Now!
            <FaArrowRight className="text-xl" />
          </button>
        </div>

        <div className="bg-[#1#1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg w-full h-auto">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <p className="text-center font-bold text-xl pt-5">Developer: Park Kyung Hyun</p>
      <p className="text-center font-light p-2">
        구글 드라이브와 같은 직관적인 파일 저장 시스템에서 영감을 받아, 개인화된 파이어베이스 기반의 드라이브를 개발하였습니다. <br />
        이 시스템은 사용자가 언제 어디서나 편리하게 파일을 저장하고 관리할 수 있도록 도와줍니다.
      </p>
      <ToastContainer />
    </main>
  );
}
