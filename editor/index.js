const { app, BrowserWindow } = require('electron');
const path = require('path');
const ejs = require('ejs'); // Módulo para renderizar plantillas EJS.
const fs = require('fs'); // Módulo para interactuar con el sistema de archivos.

// Esta función se encarga de crear la ventana principal de la aplicación.
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // El script de precarga (preload.js) se ejecuta antes de que se carguen otros scripts.
      // Sirve como un puente seguro entre el proceso principal y el de renderizado.
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // La nueva lógica para cargar el archivo .ejs
  const ejsPath = path.join(__dirname, 'src', 'views', 'index.ejs');

  // Leemos el archivo .ejs de manera asíncrona.
  fs.readFile(ejsPath, 'utf-8', (err, data) => {
    if (err) {
      // Manejamos cualquier error que ocurra al leer el archivo.
      console.error('Error al leer el archivo EJS:', err);
      return;
    }

    // Renderizamos el contenido de la plantilla EJS a HTML.
    // Puedes pasar un objeto con datos dinámicos aquí. Por ahora, lo dejamos vacío.
    const html = ejs.render(data, {});

    // Usamos loadURL con un esquema de datos para cargar el HTML renderizado.
    win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  });

  // Descomenta la siguiente línea para abrir las herramientas de desarrollo.
  // win.webContents.openDevTools();
}

// Este método se ejecutará cuando Electron haya terminado de inicializar.
app.whenReady().then(() => {
  createWindow();

  // En macOS, si todas las ventanas se cierran, la aplicación permanece en la barra de
  // tareas. Este código asegura que, si no hay ventanas abiertas, se cree una nueva.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cierra la aplicación cuando todas las ventanas están cerradas, excepto en macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
