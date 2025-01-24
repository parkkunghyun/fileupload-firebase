"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { FileType } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import DropZoneComponent from "@/components/Dropzone";
import TableWrapper from "@/components/TableWrapper";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [skeletonFiles, setSkeletonFiles] = useState<FileType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          // Firestore에서 파일 데이터를 가져오기
          const docsResults = await getDocs(
            collection(db, "users", currentUser.uid, "files")
          );

          const files: FileType[] = docsResults.docs.map((doc) => ({
            id: doc.id,
            filename: doc.data().filename || doc.id,
            timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
            fullName: doc.data().fullName,
            downloadURL: doc.data().downloadURL,
            type: doc.data().type,
            size: doc.data().size,
          }));

          setSkeletonFiles(files);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      } else {
        setUser(null);
        setSkeletonFiles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="flex items-center h-screen justify-center font-bold text-2xl">로딩 중 입니다...</div>;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4 justify-center h-screen">
        <Image
          src="/no-user.png"
          alt="user no login image"
          width={200}
          height={200}
        />
        <div className="text-center flex flex-col gap-4">
          <p className="text-xl font-bold text-red-500">
            로그인 후 이용할 수 있습니다.
          </p>
          <Link
            className="font-bold dark:text-white hover:scale-105 text-xl text-blue-600"
            href={"/"}
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t p-4">
      <DropZoneComponent />
      <section className="container space-y-5">
        <h2 className="font-bold">All Files</h2>
        <div className="mx-auto">
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
