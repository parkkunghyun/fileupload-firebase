"use client";

import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import prettyBytes from "pretty-bytes"; // `pretty-bytes` 라이브러리 설치 필요
import { COLOR_EXTENSIONS_MAP } from "./table/constants";
import { db, auth } from "@/firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import FileTable from "./table/columns";
import { onAuthStateChanged } from "firebase/auth";

const TableWrapper = ({ skeletonFiles }) => {
  const [user, setUser] = useState(null); // Firebase Auth 사용자 정보
  const [sortedFiles, setSortedFiles] = useState(skeletonFiles);
  const [sortOrder, setSortOrder] = useState("desc");
  const [initialFiles, setInitialFiles] = useState([]);

  // Firebase Auth 상태 관리
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

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.uid, "files"), // Firebase Auth의 user.uid 사용
        orderBy("timestamp", sortOrder)
      )
  );

  useEffect(() => {
    if (!docs) return;
    const files = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    }));

    setInitialFiles(files);
    setSortedFiles(files); // 초기 데이터 설정
  }, [docs]);


  useEffect(() => {
    // sortOrder가 변경될 때마다 파일을 정렬
    const sorted = [...initialFiles].sort((a, b) => {
      const dateA = new Date(a.timestamp?.seconds * 1000).getTime();
      const dateB = new Date(b.timestamp?.seconds * 1000).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedFiles(sorted);
  }, [sortOrder, initialFiles]);


  if (!user) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500 font-bold">로그인 후 파일을 볼 수 있습니다.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col">
        <p>Loading 중 입니다....</p>
        <div className="border rounded-lg">
          <div className="border-b h-12">
            {skeletonFiles.map((file) => (
              <div className="flex items-center gap-4 p-5 w-f" key={file.id}>
                <div className="h-12 w-12"></div>
                <div className="h-12 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sortFilesByDate = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-col gap-5 pb-10">
      <button
        onClick={sortFilesByDate}
        className="ml-auto w-fit p-2 bg-gray-600 shadow-md text-white rounded"
      >
        Sort By Date {sortOrder === "asc" ? "Descending" : "Ascending"}
      </button>
      <FileTable data={sortedFiles} />
    </div>
  );
};

export default TableWrapper;
