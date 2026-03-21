# KINARA v6 — PWA de Gestión Clínica Fisioterapéutica

## Despliegue en GitHub Pages

### Opción 1: Subir archivos directamente

1. Crear repositorio en GitHub (ej: `kinara-app`)
2. Subir estos 5 archivos a la rama `main`:
   ```
   index.html
   sw.js
   manifest.json
   icon-192.png
   icon-512.png
   ```
3. Ir a **Settings → Pages → Source: Deploy from a branch → main / root**
4. Esperar ~1 minuto. La app estará en `https://tu-usuario.github.io/kinara-app/`

### Opción 2: Desde línea de comandos

```bash
git init
git add .
git commit -m "KINARA v6 - PWA fisioterapia"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/kinara-app.git
git push -u origin main
```

Luego activar GitHub Pages en Settings.

### Uso local (sin servidor)

Simplemente abrir `index.html` en el navegador. Funciona como `file://`.
El Service Worker usará un blob fallback en modo local.

### Estructura

```
kinara-pwa/
├── index.html      ← App completa (HTML + CSS + JS)
├── sw.js           ← Service Worker para cache offline
├── manifest.json   ← Manifest PWA (instalable)
├── icon-192.png    ← Ícono 192x192
├── icon-512.png    ← Ícono 512x512
└── README.md       ← Este archivo
```

### Tecnologías

- HTML5 / CSS3 / JavaScript vanilla (sin frameworks)
- IndexedDB v5 (offline-first, 7 stores)
- Service Worker (cache-first + network fallback)
- jsPDF (CDN) para generación de PDF
- Google Fonts: Cormorant Garamond + DM Sans

### Profesional

**Geraldine Castillo Torres** · Fisioterapeuta  
CC 1026584622 · COLFI Acto Administrativo 22915  
ReTHUS vigente desde 2025-08-21
