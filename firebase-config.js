// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBp1dxYiEaao-vhc-wI2Oe2jlN-Kk4Srlg",
    authDomain: "inventario-pae-digital.firebaseapp.com",
    projectId: "inventario-pae-digital",
    storageBucket: "inventario-pae-digital.firebasestorage.app",
    messagingSenderId: "521072530695",
    appId: "1:521072530695:web:3adee4cb525f937d6261a2",
    measurementId: "G-J6FS38EP6R"
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
        if (verificarConfiguracionFirebase()) {
            console.log('🚀 Firebase listo para sincronización en la nube');
        } else {
            console.warn('⚠️ Firebase no está configurado. Los datos solo se guardarán localmente.');
        }
    }, 2000);
}); 