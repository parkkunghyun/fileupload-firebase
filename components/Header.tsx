"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/firebaseConfig";
import Link from "next/link";

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    // 다크 모드 상태 관리
    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [darkMode]);

    // 인증상태 확인 - 현재 로그인 중인지 확인합니다. 
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

    // google OAuth로 로그인
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            router.push("/dashboard"); // 로그인 후 대시보드로 이동합니다.
        } catch (error) {
            console.error("Google 로그인에 실패했습니다", error);
        }
    }

    // 로그아웃 핸들러
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <header className="flex items-center justify-between px-6 py-2 bg-gray-100 dark:bg-gray-800 shadow-md">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/dropbox-logo.png" className="dark:invert" alt="logo image" width={100} height={100} />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Drop In File</h1>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-800 dark:text-gray-100 font-medium">
                  {user.email.split("@")[0]}님 반갑습니다.
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-400 text-white p-2 rounded-lg shadow-lg hover:scale-105 duration-300"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center bg-white p-1 shadow-lg rounded-lg hover:scale-105 duration-300"
              >
                <Image src="/google-image.png" alt="google logo" width={30} height={30} />
                <span className="font-bold dark:text-black">로그인</span>
              </button>
            )}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-md"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </header>
      );
    };
    
export default Header;