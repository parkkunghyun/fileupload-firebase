# 1단계: Node 이미지를 사용하여 빌드 과정 수행
FROM node:18 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# Next.js 앱 소스 파일 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: Next.js 앱을 실행하기 위한 Node.js 이미지 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일을 컨테이너에 복사
COPY --from=build /app ./

# 8080 포트 열기 (Cloud Run에서 사용하는 포트)
EXPOSE 8080

# Next.js 앱을 8080 포트에서 실행
CMD ["npm", "run", "start", "--", "-p", "8080"]
