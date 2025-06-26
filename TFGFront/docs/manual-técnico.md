# Inventario Técnico – Aplicación Móvil Laica

## 1. Introducción

Este documento presenta un inventario técnico detallado de los **componentes**, **librerías** y **funciones clave** que conforman la aplicación móvil **Laica**, desarrollada en **React Native** utilizando **Expo**. Esta aplicación tiene como objetivo permitir a los usuarios gestionar la información de sus mascotas y de los dispositivos asociados (como collares inteligentes), todo ello mediante una interfaz intuitiva y conectada con servicios en la nube.

---

## 2. Componentes Técnicos Principales

### 2.1 Interfaz de Usuario (UI Layer)

La capa de presentación de la aplicación está compuesta por pantallas organizadas bajo una estructura de rutas utilizando `expo-router`. Las rutas se agrupan por contexto de autenticación (usuarios autenticados y no autenticados) y se organizan en pestañas, pantallas principales y modales.

Los componentes reutilizables se ubican en el directorio `components/`, organizados en subdirectorios como:

- `primitives/`: Botones, inputs, texto, vistas, iconos.
- `forms/`: Formularios multietapa y campos validados.
- `cards/`, `dialogs/`, `modals/`, `feedback/`, `layout/`

El sistema de estilos está gestionado con **NativeWind**, que permite el uso de **Tailwind CSS** en React Native. La configuración está centralizada en `tailwind.config.js`.

---

### 2.2 Gestión de Estado Global

La gestión del estado de la aplicación se realiza mediante la librería `@legendapp/state`, con persistencia local utilizando `@legendapp/state-persist-mmkv`. Esto permite que los datos observables estén sincronizados y sean reactivamente actualizados.

Algunos stores clave incluyen:

- `userStore$`
- `petsStore$`
- `collarsStore$`
- `permissionsStore$`
- `modalStore$`
- `formStore$`

---

### 2.3 Hooks Personalizados

Se han desarrollado **hooks personalizados** para encapsular lógica compleja y promover la reutilización del código. Algunos ejemplos incluyen:

- `useAuth`: para autenticación.
- `useBleScanner`, `useBleDevice`, `useBleImu`: para interacción con dispositivos BLE.
- `usePermissions`, `useNotifications`: para permisos del sistema.
- `useLanguage`: para internacionalización y selección de idioma.

---

## 3. Librerías y Herramientas Utilizadas

### 3.1 Frameworks y Arquitectura

- **React Native** y **Expo** (con `expo-router` para navegación)
- **TypeScript** como lenguaje base
- **Legend State** para gestión reactiva del estado
- **NativeWind / Tailwind CSS** para estilos

---

### 3.2 Comunicación y Manejo de Datos

- `axios`: Cliente HTTP con interceptores personalizados
- `@tanstack/react-query`: Para consultas, cacheo, invalidaciones y sincronización de datos
- `react-hook-form` + `zod`: Para validación robusta de formularios
- `@react-native-firebase/auth`: Autenticación con Firebase
- `@react-native-firebase/storage`: Para manejo de archivos como fotos de mascotas

---

### 3.3 Interacción con Dispositivos BLE

- `react-native-ble-plx`: Manejo de dispositivos Bluetooth Low Energy
- Definición de UUIDs específicos en `constants/bluetooth.ts`
- Comunicación estructurada mediante características BLE para sincronización, configuración y lectura de datos IMU

---

## 4. Funcionalidades Relevantes

La aplicación implementa una variedad de **flujos funcionales** organizados de manera estructurada:

- **Autenticación de Usuarios**: Con flujos separados para email/contraseña, Google y Apple, gestionados por Firebase.
- **Onboarding**: Secuencia de pantallas para configuración inicial del usuario y su primera mascota.
- **Gestión de Mascotas**: CRUD completo, incluyendo salud, vacunas y comportamientos.
- **Vinculación BLE**: Emparejamiento con collares Laica, sincronización de datos IMU, configuración de reloj, clave pública, descarga de logs vía comandos (ej. `BLEDL`, `IMUSYNC`).
- **Configuración WiFi de la Estación Base**: Escritura de SSID y contraseña a características BLE específicas.
- **Visualización de Datos**: Actividad física, salud, localización del collar, mediante gráficas y resúmenes.
- **Notificaciones Push**: Manejo con `expo-notifications`.
- **Soporte Multilenguaje**: Internacionalización con `i18next`.

---
