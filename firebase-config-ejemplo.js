// EJEMPLO DE CONFIGURACIÓN DE FIREBASE
// Copia este archivo como "firebase-config.js" y reemplaza con tu configuración real

// Configuración de Firebase
const firebaseConfig = {
    // Reemplaza estos valores con los de tu proyecto Firebase
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdefghijklmnop"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a Firestore
const db = firebase.firestore();

// Configuración de Firestore para usar timestamp del servidor
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

// Función para verificar si Firebase está configurado correctamente
function verificarConfiguracionFirebase() {
    try {
        if (firebase.apps.length === 0) {
            console.error('❌ Firebase no está inicializado');
            return false;
        }
        
        if (!db) {
            console.error('❌ Firestore no está disponible');
            return false;
        }
        
        console.log('✅ Firebase configurado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error en la configuración de Firebase:', error);
        return false;
    }
}

// Verificar configuración al cargar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!verificarConfiguracionFirebase()) {
            console.warn('⚠️ Firebase no está configurado. Los datos solo se guardarán localmente.');
            
            // Mostrar mensaje al usuario
            const mensaje = document.createElement('div');
            mensaje.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #f39c12;
                color: white;
                padding: 20px;
                border-radius: 10px;
                z-index: 10000;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            `;
            mensaje.innerHTML = `
                <h3>⚠️ Configuración de Firebase</h3>
                <p>Para sincronizar datos en la nube, configura Firebase siguiendo las instrucciones en README-FIREBASE.md</p>
                <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 8px 16px; border: none; border-radius: 5px; background: white; color: #f39c12; cursor: pointer;">
                    Entendido
                </button>
            `;
            document.body.appendChild(mensaje);
        }
    }, 2000);
}); 