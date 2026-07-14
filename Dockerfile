FROM node:20-alpine AS build

WORKDIR /app

ARG BUILD_CONFIGURATION=production

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=${BUILD_CONFIGURATION}

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/gestgo_front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
