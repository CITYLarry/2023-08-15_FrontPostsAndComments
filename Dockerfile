FROM node:18.16.1 AS build-env

WORKDIR /app

# Instalar las dependencias del proyecto
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

# Copiar los archivos del proyecto
COPY . ./

# Construir el proyecto de Angular
RUN npm run build

# Imagen final de docker que se utilizará en el despliegue
FROM nginx:1.13.9-alpine

# Comprobar que se utiliza la dirección correcta en que se construye el proyecto
COPY --from=build-env /app/dist/front-posts-comments/ /usr/share/nginx/html

# Copiar la configuración de nginx dentro del contenedor
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]