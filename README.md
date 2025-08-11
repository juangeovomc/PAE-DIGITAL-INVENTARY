# 📦 Sistema de Inventario PAE Digital

Un sistema completo de gestión de inventario con sincronización en la nube, diseñado para el control de entradas y salidas de productos.

## ✨ Características Principales

### 🔐 Seguridad
- **Autenticación con clave** para funciones críticas
- **Clave de administrador**: `PAE2025`
- **Protección contra eliminación accidental**

### 🌙 Interfaz Moderna
- **Modo oscuro/claro** con detección automática
- **Diseño responsive** para todos los dispositivos
- **Alertas elegantes** con SweetAlert2
- **Indicadores visuales** de estado

### ☁️ Sincronización en la Nube
- **Firebase Firestore** para almacenamiento en la nube
- **Sincronización automática** cada 5 minutos
- **Funcionamiento sin conexión** con sincronización posterior
- **Acceso desde cualquier dispositivo**

### 📊 Gestión Completa
- **Registro de entradas y salidas**
- **Control de stock en tiempo real**
- **Historial detallado** de movimientos
- **Reportes mensuales** con estadísticas
- **Filtros por tipo y sede**

## 🚀 Demo en Vivo

**URL de la aplicación**: [https://TU_USUARIO.github.io/inventario-pae-digital/](https://TU_USUARIO.github.io/inventario-pae-digital/)

## 📱 Capturas de Pantalla

### Vista Principal
![Vista Principal](img/screenshot-main.png)

### Modo Oscuro
![Modo Oscuro](img/screenshot-dark.png)

### Reportes
![Reportes](img/screenshot-reports.png)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsive
- **JavaScript ES6+** - Funcionalidad dinámica
- **Firebase Firestore** - Base de datos en la nube
- **SweetAlert2** - Alertas elegantes
- **GitHub Pages** - Hosting gratuito

## 📋 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/TU_USUARIO/inventario-pae-digital.git
cd inventario-pae-digital
```

### 2. Configurar Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un proyecto llamado `inventario-pae-digital`
3. Habilita Firestore Database
4. Configura las reglas de seguridad
5. Actualiza `firebase-config.js` con tu configuración

### 3. Abrir la Aplicación
```bash
# Opción 1: Abrir directamente
open index.html

# Opción 2: Servidor local (recomendado)
python -m http.server 8000
# Luego ve a http://localhost:8000
```

## 🔧 Configuración de Firebase

### Reglas de Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Dominios Autorizados
Agrega tu dominio a Firebase Authentication:
- `TU_USUARIO.github.io` (para GitHub Pages)
- `localhost` (para desarrollo local)

## 📖 Uso de la Aplicación

### Registrar un Movimiento
1. Selecciona el **nombre del producto**
2. Ingresa la **cantidad**
3. Elige el **tipo** (entrada/salida)
4. Selecciona la **sede** (para salidas)
5. Elige el **mes** del movimiento
6. Agrega una **descripción** (opcional)
7. Haz clic en **"Registrar Movimiento"**

### Gestionar Datos
- **🗑️ Limpiar Historial**: Requiere clave `PAE2025`
- **🔄 Restablecer Todo**: Requiere clave `PAE2025`
- **☁️ Sincronizar**: Forzar sincronización con la nube

### Ver Reportes
1. Ve a la pestaña **"📊 Reportes"**
2. Selecciona el **mes** que quieres consultar
3. Revisa las **estadísticas** y **detalles**

## 🌐 Despliegue en GitHub Pages

### Pasos Rápidos
1. Crea un repositorio público en GitHub
2. Sube todos los archivos
3. Ve a Settings → Pages
4. Selecciona "Deploy from a branch"
5. Elige "main" y "/ (root)"
6. ¡Listo! Tu app estará en `https://TU_USUARIO.github.io/inventario-pae-digital/`

### Configuración Adicional
- Agrega tu dominio a Firebase
- Configura HTTPS (automático en GitHub Pages)
- Personaliza el dominio si lo deseas

## 🔒 Seguridad

### Clave de Administrador
- **Clave actual**: `PAE2025`
- **Para cambiar**: Edita las funciones `limpiarHistorial()` y `restablecerTodo()`
- **Protege**: Eliminación de datos y restablecimiento del sistema

### Firebase Security
- Reglas de Firestore configuradas
- Dominios autorizados
- HTTPS requerido

## 📊 Estructura del Proyecto

```
inventario-pae-digital/
├── index.html              # Aplicación principal
├── firebase-config.js      # Configuración de Firebase
├── firebase-sync.js        # Funciones de sincronización
├── img/                    # Imágenes y logos
│   ├── logo cis .jpg
│   └── alcaldia .png
├── README.md              # Este archivo
├── GITHUB-PAGES.md        # Guía de despliegue
├── CONFIGURAR-FIRESTORE.md # Configuración de Firebase
└── NUEVAS-FUNCIONALIDADES.md # Documentación de features
```

## 🆘 Solución de Problemas

### Error de Sincronización
1. Verifica tu conexión a internet
2. Revisa la configuración de Firebase
3. Verifica las reglas de Firestore
4. Revisa la consola del navegador (F12)

### Error de Autenticación
1. Verifica que la clave sea `PAE2025`
2. Asegúrate de no tener espacios adicionales
3. La clave es sensible a mayúsculas/minúsculas

### Problemas de Visualización
1. Limpia la caché del navegador (Ctrl+F5)
2. Verifica que JavaScript esté habilitado
3. Prueba en modo incógnito

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Sistema de Inventario PAE Digital**
- **Desarrollado para**: Control de inventario institucional
- **Tecnologías**: HTML, CSS, JavaScript, Firebase
- **Hosting**: GitHub Pages

## 🙏 Agradecimientos

- **Firebase** por la infraestructura en la nube
- **SweetAlert2** por las alertas elegantes
- **GitHub** por el hosting gratuito
- **Comunidad open source** por las herramientas utilizadas

## 📞 Soporte

Si tienes problemas o preguntas:

1. **Revisa la documentación** en los archivos `.md`
2. **Verifica la consola** del navegador (F12)
3. **Prueba en otro navegador** para descartar problemas
4. **Revisa la configuración** de Firebase

---

⭐ **¡Dale una estrella al repositorio si te gusta el proyecto!**

🔗 **Comparte la aplicación**: [https://TU_USUARIO.github.io/inventario-pae-digital/](https://TU_USUARIO.github.io/inventario-pae-digital/) 