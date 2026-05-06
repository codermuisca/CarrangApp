🎸 CarrangApp

Aplicación móvil para explorar, estudiar y preservar la música carranguera en Colombia 🇨🇴

🌱 Descripción

CarrangApp es una app pensada para músicos, estudiantes y amantes de la música carranguera, donde pueden:

🎵 Ver repertorio de canciones
🎼 Consultar tono y ritmo
📄 Leer letras completas
📱 Acceder desde el celular de forma rápida

Este proyecto busca preservar y difundir la cultura carranguera, apoyando el aprendizaje musical y la conexión con nuestras raíces.

🚀 Tecnologías usadas
⚛️ React Native
📱 Expo
🔥 Firebase (Firestore)
🟦 TypeScript
🧭 Expo Router
📂 Estructura del proyecto
app/
 ├── (tabs)/
 │   └── Repertorio.tsx   # Lista de canciones
 ├── song/
 │   └── [id].tsx         # Detalle de cada canción

services/
 └── firebase.ts          # Configuración de Firebase

types/
 └── Song.ts              # Tipos de datos
⚙️ Instalación

Clona el repositorio:

git clone https://github.com/codermuisca/CarrangApp.git
cd CarrangApp

Instala dependencias:

npm install
▶️ Ejecutar la app
npx expo start

Puedes abrirla en:

📱 Expo Go (recomendado)
🤖 Emulador Android
🍏 Simulador iOS
🔐 Variables de entorno

Crea un archivo .env en la raíz del proyecto:

EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...

⚠️ No subir este archivo a GitHub

🎯 Estado actual

✅ Conexión a Firestore
✅ Listado dinámico de canciones
✅ Vista individual por ID
🚧 Próximamente:

Búsqueda por tono y ritmo
Favoritos
Modo offline
Carga masiva desde Excel
🌎 Visión

Convertirse en una plataforma digital que:

Preserve la música carranguera 🎸
Apoye a músicos locales
Conecte comunidades culturales en Colombia
🤝 Contribuciones

Este proyecto está en crecimiento.
Si quieres aportar ideas o código, eres bienvenido 🙌

👨‍💻 Autor

Marco Aurelio (codermuisca)
Colombia 🇨🇴
Apasionado por la música, el arte y la tecnología

⭐ Apoya el proyecto

Si te gusta la idea, dale una estrella en GitHub ⭐
