# 🎯 **Ruleta Dinámica con Canvas y Toastify.js**  

¡Bienvenido a mi proyecto de **ruleta dinámica**! Esta aplicación permite generar una **ruleta personalizada** utilizando **HTML, CSS, JavaScript y Canvas**. Las opciones se distribuyen automáticamente en función de una lista dinámica que defines. Además, al finalizar cada giro, el **ganador se anuncia con un mensaje emergente (toast)** utilizando **Toastify.js**.

## 🚀 **Características**
- Generación automática de segmentos según el número de opciones definidas.
- **Interfaz gráfica sencilla** gracias a la integración de HTML5 Canvas.
- **Efecto de giro** con animaciones suaves en JavaScript.
- **Mensaje de notificación (toast)** con el resultado del giro, utilizando [Toastify.js](https://github.com/apvarun/toastify-js).
- **Personalizable**: puedes cambiar los ítems, colores y duración del giro fácilmente.

---
## 📋 **Instrucciones de Instalación**
1. **Clona el repositorio:**  
   ```bash
   git clone https://github.com/Anthony3064/onix-roulette.git
   cd onix-roulette
   ```

 2. **Abre el archivo index.html en el navegador:**
    ```bash
    open index.html  # (en MacOS/Linux)
    start index.html  # (en Windows)
    ```
    
 3. **Agrega tu propia lista de opciones:**
 Dentro del archivo script.js, modifica el siguiente fragmento para definir las opciones de la ruleta:
    ```javascript
    const options = ['Opción 1', 'Opción 2','Opción 3'];
    ```
 ---
 
 ## ⚙️ Funcionamiento
- Al hacer clic en el botón "Girar", la ruleta comienza su animación.
- Después del giro, Toastify.js muestra un mensaje emergente con el ítem ganador.
- Cada vez que vuelvas a girar, el resultado se selecciona aleatoriamente.

---

## 📦 Dependencias Externas
- **Toastify.js:** Biblioteca para mostrar mensajes emergentes con estilo.
Se incluye mediante CDN en el archivo index.html:
    ```html
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    ```
---

## 🤝 Contribuciones
¡Toda sugerencia, reporte de errores o mejora es bienvenida!
Siéntete libre de abrir un issue o enviar un pull request. 🙌

---

## 👨‍💻 Autor
Nombre: Anthony Flores Boza
Contacto: anthonyestiven3064@gmail.com

## 🌐 Enlace al Proyecto en Vivo
¿Quieres ver la ruleta en acción? [¡Pruébala aquí!]('https://roulette-onix.web.app/')