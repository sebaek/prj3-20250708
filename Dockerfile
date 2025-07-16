### 1단계: React 앱 빌드
FROM node:18-alpine AS frontend-builder

WORKDIR /app
COPY frontend/ ./
RUN npm install
RUN npm run build

### 2단계: Spring Boot 빌드
FROM gradle:8.5-jdk17 AS backend-builder

WORKDIR /app
COPY --from=frontend-builder /app/dist ./frontend-dist
COPY backend/ ./backend

# 프론트 빌드 결과를 Spring static 폴더로 이동
RUN mkdir -p backend/src/main/resources/static && \
    cp -r frontend-dist/* backend/src/main/resources/static/

WORKDIR /app/backend
# Gradle Wrapper 권한 부여
RUN chmod +x ./gradlew

# 빌드 실행 (Gradle Wrapper 사용)
RUN ./gradlew bootJar

### 3단계: 최종 실행용 이미지
FROM openjdk:21

WORKDIR /app
COPY --from=backend-builder /app/backend/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
