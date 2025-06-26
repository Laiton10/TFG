# Arquitectura del Proyecto Laica

La arquitectura de Laica se basa en una estructura modular que combina dispositivos físicos (como collares y estación base), una aplicación móvil desarrollada en React Native, y una API backend centralizada.

## Componentes principales

- **Aplicación móvil (React Native + Expo)**: gestiona usuarios, mascotas, collares y sincroniza datos.
- **Collar Laica (BLE)**: dispositivo con sensores que transmite datos IMU, batería y eventos.
- **Base Laica (BLE + WiFi)**: punto intermedio opcional para conexión local a la red.
- **Backend API (HTTPs)**: centraliza y almacena la información sincronizada desde la app.
- **Firebase**: para autenticación, almacenamiento de imágenes y notificaciones push.

## Diagrama general

(Agrega aquí un enlace a una imagen o diagrama si lo necesitas)

## Documentación adicional

📎 [Descargar documento adjunto sobre arquitectura en PDF](assets/TFC%20-%20Filme.pdf)

Este documento contiene información complementaria sobre la estructura técnica y fundamentos del sistema Laica.
