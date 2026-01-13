## 1단계: 빌드
#FROM node:18 AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#
## 2단계: 실행 (Nginx)
#FROM nginx:stable-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]


# 1단계: 빌드
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 실행 (Nginx)
FROM nginx:stable-alpine
# 기존 default.conf 삭제하고 커스텀 conf 추가 (기존 파일 덮어쓰기)
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]