import UI from "./UI"

export const metadata = {
  title: "Dropbox with Firebase and Next.js",
  description: "파일들을 저장하는 드롭박스 프로젝트입니다.",
  keywords: "Dropbox, Firebase, Next.js, 파일 저장, 클라우드",
  openGraph: {
    title: "Dropbox with Firebase and Next.js",
    description: "파일들을 저장하는 드롭박스 프로젝트입니다.",
    image: "/dropbox-logo.png", // 공유할 이미지 경로
    type: "website", // 웹사이트 타입
  },
};

const DashboardPage = () => {
  return (
    <div>
      <UI/>
    </div>
  )
}

export default DashboardPage