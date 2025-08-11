// Funciones para sincronización con Firebase Firestore

// Función para guardar datos en Firebase
async function guardarEnFirebase() {
    try {
        // Mostrar indicador de sincronización
        mostrarIndicadorSincronizacion(true);
        
        // Guardar inventario
        await db.collection('inventario').doc('datos').set({
            inventario: inventario,
            contadores: contadores,
            ultimaActualizacion: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Guardar historial (en lotes para evitar límites de tamaño)
        const batch = db.batch();
        const historialRef = db.collection('historial');
        
        // Eliminar historial anterior
        const historialAnterior = await historialRef.get();
        historialAnterior.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        // Agregar nuevo historial
        historial.forEach((movimiento, index) => {
            const docRef = historialRef.doc(`movimiento_${index}`);
            batch.set(docRef, {
                ...movimiento,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        await batch.commit();
        
        // Actualizar timestamp de última sincronización
        localStorage.setItem('ultimaSincronizacion', Date.now().toString());
        
        mostrarIndicadorSincronizacion(false);
        mostrarMensajeSincronizacion('✅ Datos sincronizados exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al guardar en Firebase:', error);
        mostrarIndicadorSincronizacion(false);
        mostrarMensajeSincronizacion('❌ Error al sincronizar datos', 'error');
    }
}

// Función para cargar datos desde Firebase
async function cargarDesdeFirebase() {
    try {
        mostrarIndicadorSincronizacion(true);
        
        // Cargar inventario
        const inventarioDoc = await db.collection('inventario').doc('datos').get();
        if (inventarioDoc.exists) {
            const datos = inventarioDoc.data();
            inventario = datos.inventario || {};
            contadores = datos.contadores || { entradas: 0, salidas: 0 };
        }
        
        // Cargar historial
        const historialSnapshot = await db.collection('historial').orderBy('timestamp', 'desc').get();
        historial = [];
        historialSnapshot.forEach(doc => {
            const datos = doc.data();
            historial.push({
                id: datos.id || Date.now(),
                producto: datos.producto,
                cantidad: datos.cantidad,
                tipo: datos.tipo,
                sede: datos.sede,
                descripcion: datos.descripcion,
                fecha: datos.fecha,
                mes: datos.mes,
                mesNombre: datos.mesNombre,
                stockRestante: datos.stockRestante
            });
        });
        
        // Guardar en localStorage como respaldo
        guardarDatosLocal();
        
        mostrarIndicadorSincronizacion(false);
        mostrarMensajeSincronizacion('✅ Datos cargados desde la nube', 'success');
        
        return true;
        
    } catch (error) {
        console.error('Error al cargar desde Firebase:', error);
        mostrarIndicadorSincronizacion(false);
        mostrarMensajeSincronizacion('❌ Error al cargar datos de la nube', 'error');
        return false;
    }
}

// Función para sincronizar automáticamente
async function sincronizarAutomaticamente() {
    const ultimaSinc = localStorage.getItem('ultimaSincronizacion');
    const ahora = Date.now();
    
    // Sincronizar si han pasado más de 5 minutos desde la última sincronización
    if (!ultimaSinc || (ahora - parseInt(ultimaSinc)) > 300000) {
        await guardarEnFirebase();
    }
}

// Función para mostrar indicador de sincronización
function mostrarIndicadorSincronizacion(mostrar) {
    let indicador = document.getElementById('sincronizacion-indicador');
    
    if (!indicador) {
        indicador = document.createElement('div');
        indicador.id = 'sincronizacion-indicador';
        indicador.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3498db;
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            z-index: 10000;
            display: none;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(indicador);
    }
    
    if (mostrar) {
        indicador.innerHTML = `
            <div style="width: 16px; height: 16px; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <span>Sincronizando...</span>
        `;
        indicador.style.display = 'flex';
    } else {
        indicador.style.display = 'none';
    }
}

// Función para mostrar mensajes de sincronización
function mostrarMensajeSincronizacion(mensaje, tipo) {
    let mensajeElement = document.getElementById('sincronizacion-mensaje');
    
    if (!mensajeElement) {
        mensajeElement = document.createElement('div');
        mensajeElement.id = 'sincronizacion-mensaje';
        mensajeElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10001;
            display: none;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(mensajeElement);
    }
    
    mensajeElement.textContent = mensaje;
    mensajeElement.style.background = tipo === 'success' ? '#27ae60' : '#e74c3c';
    mensajeElement.style.color = 'white';
    mensajeElement.style.display = 'block';
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        mensajeElement.style.display = 'none';
    }, 3000);
}

// Función para verificar conectividad
function verificarConectividad() {
    return navigator.onLine;
}

// Función para sincronizar cuando se recupera la conexión
function sincronizarAlRecuperarConexion() {
    if (verificarConectividad()) {
        guardarEnFirebase();
    }
}

// Event listeners para conectividad
window.addEventListener('online', sincronizarAlRecuperarConexion);
window.addEventListener('focus', sincronizarAutomaticamente);

// Función modificada para guardar datos (local + nube)
async function guardarDatosCompleto() {
    // Guardar localmente primero
    guardarDatosLocal();
    
    // Intentar guardar en la nube si hay conexión
    if (verificarConectividad()) {
        await guardarEnFirebase();
    }
}

// Función para guardar solo en localStorage
function guardarDatosLocal() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
    localStorage.setItem('historial', JSON.stringify(historial));
    localStorage.setItem('contadores', JSON.stringify(contadores));
}

// Función para cargar datos (local + nube)
async function cargarDatosCompleto() {
    // Cargar desde localStorage primero
    cargarDatosLocal();
    
    // Intentar cargar desde la nube si hay conexión
    if (verificarConectividad()) {
        const exitoNube = await cargarDesdeFirebase();
        if (exitoNube) {
            // Si se cargaron datos de la nube, actualizar la interfaz
            actualizarInterfaz();
            mostrarHistorial();
        }
    }
}

// Función para cargar solo desde localStorage
function cargarDatosLocal() {
    try {
        const inventarioGuardado = localStorage.getItem('inventario');
        const historialGuardado = localStorage.getItem('historial');
        const contadoresGuardados = localStorage.getItem('contadores');
        
        if (inventarioGuardado) inventario = JSON.parse(inventarioGuardado);
        if (historialGuardado) historial = JSON.parse(historialGuardado);
        if (contadoresGuardados) contadores = JSON.parse(contadoresGuardados);
    } catch (error) {
        console.error('Error al cargar datos locales:', error);
    }
}

// Estilos CSS para animaciones
const estilosSincronizacion = document.createElement('style');
estilosSincronizacion.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(estilosSincronizacion); 