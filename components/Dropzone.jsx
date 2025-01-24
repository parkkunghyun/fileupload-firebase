"use client";

import { db, storage } from "@/firebaseConfig";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DropZoneComponent() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // Firebase Auth 사용자 정보
  const maxSize = 20971520; // 최대 파일 크기: 20MB

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

  const uploadPost = async (selectedFile) => {
    if (loading) return;
    if (!user) {
      toast.error("로그인 후 파일을 업로드할 수 있습니다.");
      return;
    }
    setLoading(true);

    try {
      // Firestore에 파일 메타데이터 추가
      const docRef = await addDoc(collection(db, "users", user.uid, "files"), {
        userId: user.uid,
        filename: selectedFile.name,
        email: user.email,
        timestamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      });

      // Firebase Storage에 파일 업로드
      const fileRef = ref(storage, `users/${user.uid}/files/${docRef.id}`);
      await uploadBytes(fileRef, selectedFile);

      // 다운로드 URL을 Firestore에 업데이트
      const downloadURL = await getDownloadURL(fileRef);
      await updateDoc(doc(db, "users", user.uid, "files", docRef.id), {
        downloadURL: downloadURL,
      });

      toast.success("파일이 성공적으로 업로드되었습니다!");
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
      toast.error("파일 업로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("파일 읽기가 중단되었습니다.");
      reader.onerror = () => console.log("파일 읽기 중 오류가 발생했습니다.");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {!user ? (
        <p className="text-center text-red-500 font-bold">
          로그인 후 파일을 업로드할 수 있습니다.
        </p>
      ) : (
        <Dropzone
          minSize={0}
          maxSize={maxSize}
          onDrop={onDrop} // onDrop 이벤트에서 파일 처리
        >
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <section className="m-4">
              <div
                {...getRootProps()}
                className={`w-full h-52 flex justify-center items-center p-5 border-2 border-gray-700 border-dashed rounded-lg text-center ${
                  isDragActive
                    ? "bg-[#035FFE] text-white animate-pulse"
                    : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                }`}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop a file to upload!"}
                {isDragActive && !isDragReject && "Drop to upload this file!"}
                {isDragReject && "File type not accepted, sorry"}
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </div>
  );
}

export default DropZoneComponent;
