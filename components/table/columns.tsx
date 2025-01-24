"use client";

import { FileType } from "@/typings";
import React from "react";
import prettyBytes from "pretty-bytes"; // `pretty-bytes` 라이브러리 설치 필요
import { FileIcon } from "react-file-icon"; // react-file-icon 라이브러리 임포트
import { COLOR_EXTENSIONS_MAP } from "./constants";

import { MdDeleteSweep } from "react-icons/md";

type Props = {
  data: FileType[];
};

const FileTable: React.FC<Props> = ({ data }) => {
  const getFileExtension = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    return ext ? ext : "txt"; // 확장자가 없으면 기본 "txt" 반환
  };

  const formatTimestamp = (timestamp: any) => {
    console.log("timestamp", timestamp); // timestamp 로그로 확인
    // timestamp가 Date 객체일 경우
    if (timestamp instanceof Date) {
      return timestamp.toLocaleString(); // 날짜를 로컬 형식으로 변환
    }

    // timestamp가 Firebase Timestamp 객체일 경우 (timestamp는 Firebase Timestamp 객체로 전달됨)
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    }
    // timestamp가 string일 경우
    if (typeof timestamp === "string") {
      return timestamp;
    }
    return "Invalid Date"; // Firebase Timestamp가 아니거나 예상치 못한 타입일 경우 처리
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">File Icon</th>
            <th className="px-4 py-2 border-b text-left">Filename</th>
            <th className="px-4 py-2 border-b text-left">Date Added</th>
            <th className="px-4 py-2 border-b text-left">Size</th>
            <th className="px-4 py-2 border-b text-left">Link</th>
          </tr>
        </thead >
        <tbody >
          {data.map((file) => {
            const fileExtension = getFileExtension(file.filename);
            const fileColor = COLOR_EXTENSIONS_MAP[fileExtension] || "#000000"; // 확장자에 맞는 색상 선택
            return (
              <tr key={file.id}>
                <td className="px-4 py-2 border-b">
                  <div className="w-8 h-8">
                    <FileIcon extension={fileExtension} color={fileColor} />
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{file.filename}</td>
                <td className="px-4 py-2 border-b">
                  {formatTimestamp(file.timestamp)}
                </td>
                <td className="px-4 py-2 border-b">
                  {prettyBytes(file.size || 0)}
                </td>
                <td className="px-4 py-2 border-b">
                  <a href={file.downloadURL} target="_blank" className="text-blue-500">
                    Download
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
