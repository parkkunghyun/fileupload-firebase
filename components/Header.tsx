// components/Header.tsx
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  // 다크 모드 상태에 따라 <html> 태그에 클래스 추가/제거
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

    return (
        <header className="flex items-center justify-between px-6 py-2 bg-gray-100 dark:bg-gray-800 shadow-md">
          <div className="flex items-center gap-2">
            <Image src="/dropbox-logo.png" className="dark:invert" alt="logo image" width={100} height={100} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Drop In File</h1>
          </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center bg-white p-1 shadow-lg rounded-lg hover:scale-105 duration-300" >
                    <Image src="/google-image.png" alt="google logo" width={30} height={30} />
                    <span className="font-bold dark:text-black">로그인</span>
                </button>
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-md"
                    aria-label="Toggle Dark Mode">
                    {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
            </div>
    </header>
  );
};

export default Header;
