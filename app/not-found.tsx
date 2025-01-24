"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div
      className="flex flex-col  items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/404.png')", backgroundSize: "contain" }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg text-center shadow-lg">
        <h1 className="text-4xl font-bold text-red-500">404 - 페이지를 찾을 수 없습니다.</h1>
        <p className="mt-4 text-lg text-gray-700">
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
