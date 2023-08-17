# Imagen final de docker que se utilizará en el despliegue
FROM nginx:1.13.9-alpine

# Comprobar que se utiliza la dirección correcta en que se construye el proyecto
COPY ./dist/front-posts-comments/ /usr/share/nginx/html

# Copiar la configuración de nginx dentro del contenedor
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]