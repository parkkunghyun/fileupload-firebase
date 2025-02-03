# LinguaLens

**LinguaLens**는 텍스트, 이미지, 음성을 실시간으로 번역하고 자연스러운 음성으로 전달하는 AI 기반 번역 플랫폼입니다.

[링크 바로가기](https://lingualens-266457465664.us-central1.run.app/)

## 📄 프로젝트 설명
LinguaLens는 **Google Cloud Translate API**를 활용하여 다양한 언어로 번역을 지원합니다. 또한 **TTS (Text-to-Speech)** 기술로 번역된 텍스트를 자연스러운 음성으로 변환하고, **OCR (Optical Character Recognition)** 기술을 이용하여 이미지 내의 텍스트를 추출하고 번역하여 이미지 속 정보를 빠르고 정확하게 제공합니다.

## 🚀 주요 기능 및 특징

- **다국어 번역 및 음성 변환**  
  - **Google Cloud Vision API**로 이미지 내 텍스트 추출
  - **Translate API**로 다양한 언어로 번역 지원
  - **Text-to-Speech API**로 자연스러운 음성 변환

- **백엔드 및 서버 관리**  
  - **FastAPI**로 이미지 분석 및 번역 처리 백엔드 구축
  - **Cloud Run**을 통해 필요 시 서버를 실행하여 비용 효율적인 서비스 제공

- **CI/CD 자동화**  
  - **GitHub Actions**를 활용한 프론트엔드 자동 빌드 및 Cloud Run 배포
  - 지속적인 배포 환경으로 개발 효율성 향상

- **프론트엔드 기능 개선**  
  - **React의 useEffect 훅**으로 번역된 텍스트 실시간 출력 및 자동 음성 재생
  - **Framer Motion**으로 애니메이션 효과 추가
  - **React Toastify**로 실시간 알림 제공하여 인터랙티브한 UI 구현

- **효율적인 데이터 관리**  
  - **Tanstack Query**로 번역 API 호출을 효율적으로 관리하고 에러 처리 간소화
  - 서버사이드에서 **Google Translate API** 호출로 클라이언트와 분리된 구조 유지, 보안 강화 및 API 호출 최적화

## ⚙️ 기술 스택

- **Frontend:** Next.js, Framer Motion, Tanstack Query, React Toastify  
- **GCP API:** Cloud Vision API, Translate API, Text-to-Speech API  
- **Deployment:** GitHub Actions, Cloud Run

