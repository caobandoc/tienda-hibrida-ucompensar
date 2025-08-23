# Tienda Híbrida UCompensar

Aplicación móvil/web de tienda construida con Ionic + Angular para la materia «Desarrollo de Aplicaciones Móviles Híbridas».

## Objetivo
Desarrollar una tienda híbrida (PWA y Capacitor) que permita explorar productos y sentar las bases para futuras funcionalidades (carrito, autenticación, pagos, etc.).

## Stack técnico
- Ionic Framework (Ionic Angular 8)
- Angular 20
- Capacitor 7 (App, Status Bar, Haptics, Camera, Filesystem, Keyboard, Preferences)
- RxJS 7, Zone.js 0.15

## Requisitos
- Node.js y npm recientes
- (Opcional) Ionic CLI para utilidades de desarrollo
- (Opcional) Android Studio / Xcode para compilar en Android/iOS

## Uso (desarrollo)
- Instalar dependencias con npm
- Ejecutar el servidor de desarrollo con el script «start» (usa Angular: «ng serve»)
- Alternativa con Ionic CLI: «ionic serve»

## Build
- Script «build» (Angular) genera la salida de producción en «dist/»
- Para plataformas móviles, ejecutar un build web y luego sincronizar con Capacitor (Android/iOS) antes de abrir el proyecto nativo

## Scripts disponibles
- start: ng serve
- build: ng build
- watch: ng build --watch --configuration development
- test: ng test
- lint: ng lint

## Estructura del proyecto (resumen)
- src/app: módulos y páginas (tabs, tab1, tab2, tab3)
- src/assets: recursos estáticos
- src/environments: configuraciones por entorno
- capacitor.config.ts: configuración de Capacitor
- ionic.config.json: configuración de Ionic

## Autores
- Cesar Augusto Martinez Guerrero
- Carlos Andres Obando Casiano

## Licencia
Uso académico.
