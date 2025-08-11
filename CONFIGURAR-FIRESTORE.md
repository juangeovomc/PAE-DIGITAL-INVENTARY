# 🔥 Configuración de Firestore - Pasos Específicos

## ✅ Configuración de Firebase Completada

Tu configuración de Firebase ya está lista. Ahora necesitas configurar Firestore Database para que la sincronización funcione.

## 📋 Pasos para Configurar Firestore

### 1. Acceder a Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Selecciona tu proyecto: `inventario-pae-digital`

### 2. Habilitar Firestore Database
1. En el menú lateral izquierdo, haz clic en **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de prueba"** (gratuito)
4. Elige la ubicación más cercana a tu región (recomendado: `us-central1`)
5. Haz clic en **"Listo"**

### 3. Configurar Reglas de Seguridad
1. En Firestore Database, ve a la pestaña **"Reglas"**
2. Reemplaza las reglas existentes con:

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

3. Haz clic en **"Publicar"**

### 4. Verificar la Configuración
1. Regresa a la pestaña **"Datos"**
2. Deberías ver una base de datos vacía lista para usar

## 🚀 Probar la Sincronización

### 1. Abrir la Aplicación
1. Abre `index.html` en tu navegador
2. Verifica que no haya errores en la consola (F12)

### 2. Registrar un Movimiento
1. Registra un movimiento de entrada o salida
2. Haz clic en **"☁️ Sincronizar"** en la sección de historial
3. Deberías ver un mensaje: "✅ Datos sincronizados exitosamente"

### 3. Verificar en Firebase
1. Ve a Firebase Console → Firestore Database
2. Deberías ver las colecciones `inventario` y `historial`
3. Los datos aparecerán en tiempo real

## 🔧 Funcionalidades de Sincronización

### Sincronización Automática
- Los datos se guardan automáticamente cada 5 minutos
- Se sincronizan al recuperar conexión a internet
- Se sincronizan al cambiar de pestaña y volver

### Sincronización Manual
- Botón **"☁️ Sincronizar"** para forzar la sincronización
- Útil cuando quieres asegurarte de que los datos estén en la nube

### Indicadores Visuales
- **Verde**: Conectado y sincronizando
- **Rojo**: Sin conexión (datos se guardan localmente)
- **Animación**: Sincronizando en tiempo real

## 📱 Uso en Diferentes Dispositivos

### Mismo Dispositivo, Diferente Navegador
1. Abre la aplicación en otro navegador
2. Los datos aparecerán automáticamente
3. Los cambios se sincronizan en tiempo real

### Diferente Dispositivo
1. Abre la aplicación en el nuevo dispositivo
2. Los datos se cargarán desde la nube
3. Todos los dispositivos verán los mismos datos

### Sin Conexión
1. La aplicación funciona normalmente
2. Los datos se guardan localmente
3. Se sincronizan cuando hay conexión

## 🛡️ Seguridad

### Reglas Actuales
- Permiten lectura y escritura a todos los usuarios
- Adecuadas para uso personal o interno
- No requieren autenticación

### Para Mayor Seguridad (Opcional)
Si quieres más seguridad, puedes configurar autenticación:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 💰 Costos

### Plan Gratuito
- **Almacenamiento**: 1GB
- **Lecturas**: 50,000 por día
- **Escrituras**: 20,000 por día
- **Eliminaciones**: 20,000 por día

### Para Uso Normal
- Muy improbable exceder los límites gratuitos
- Suficiente para uso personal y de pequeñas empresas

## 🆘 Solución de Problemas

### Error: "Firebase no está configurado"
1. Verifica que `firebase-config.js` tenga tu configuración
2. Asegúrate de que Firestore esté habilitado
3. Revisa la consola del navegador (F12)

### Error: "Permiso denegado"
1. Verifica las reglas de Firestore
2. Asegúrate de que permitan lectura/escritura
3. Publica las reglas nuevamente

### Los datos no se sincronizan
1. Verifica tu conexión a internet
2. Revisa la consola del navegador
3. Intenta sincronizar manualmente

### Error de configuración
1. Verifica que todos los valores en `firebase-config.js` sean correctos
2. Asegúrate de que el proyecto esté activo en Firebase Console
3. Revisa que Firestore esté habilitado

## 📞 Soporte

Si tienes problemas:

1. **Revisa la consola**: Presiona F12 para ver errores
2. **Verifica Firestore**: Asegúrate de que esté habilitado
3. **Prueba la sincronización**: Usa el botón manual
4. **Revisa las reglas**: Asegúrate de que permitan acceso

## 🎉 ¡Listo!

Una vez configurado Firestore, tu aplicación tendrá:

✅ **Sincronización automática** en la nube
✅ **Acceso desde cualquier dispositivo**
✅ **Respaldo automático** de datos
✅ **Funcionamiento sin conexión**
✅ **Indicadores visuales** de estado

¡Tu inventario estará disponible desde cualquier lugar del mundo! 🌍 