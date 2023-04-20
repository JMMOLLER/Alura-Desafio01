window.onload = () => {
    /* DECLARACIONES */
    let resultIsVisible = false; // retorna true si el resultado está visible
    const input = document.getElementById("inputText"); // obtenemos el eleento del DOM con el id inputText
    const resultText = document.getElementById("resultText"); // obtenemos el eleento del DOM con el id resultText
    const encryptBtn = document.getElementById("encrypt"); // obtenemos el eleento del DOM con el id encrypt
    const decryptBtn = document.getElementById("decrypt"); // obtenemos el eleento del DOM con el id decrypt
    const copyBtn = document.getElementById("copyBtn"); // obtenemos el eleento del DOM con el id copyBtn
    const initial = document.getElementsByClassName("noContentRigth")[0]; // obtenemos el DOM que se muestra al inicio
    const result = document.getElementsByClassName("contentRigth")[0]; // obtenemos el DOM que se muestra como resultado
    const delayFunction = () => {
        return new Promise((resolve) => setTimeout(resolve, DURATION + 850));
    }; // función que retorna una promesa que se resuelve después de el valor de DURATION + 500ms
    const clearTextArea = () => {
        if (input.value === "Ingrese el texto aquí") input.value = ""; // si el textarea tiene el texto de ejemplo, lo limpiamos
    };
    const setTextOnTextArea = () => {
        if (input.value === "") input.value = "Ingrese el texto aquí"; // si el textarea está vacío, mostramos el texto de ejemplo
    };
    const DURATION = 150; // duración de la animación
    const keys = {
        e: "enter",
        i: "imes",
        a: "ai",
        o: "ober",
        u: "ufat",
    }; // objeto con los valores de las vocales

    /* FUNCIONES */

    function encrypt() {
        if (validateCharacters(input.value)) return setAnimationError(); // si hay caracteres que no sean letras o espacios, mostramos la animación y retornamos
        let text = input.value; // obtenemos el texto ingresado
        for (let key in keys) {
            text = text.replaceAll(key, keys[key]); // reemplazamos las vocales por el valor de su vocal correspondiente
        }
        showValueContent(true, text); // mostramos el resultado
    }

    function decrypt() {
        if (validateCharacters(input.value)) return setAnimationError(); // si hay caracteres que no sean letras o espacios, mostramos la animación y retornamos
        let text = input.value; // obtenemos el texto ingresado
        for (const key in keys) {
            text = text.replaceAll(keys[key], key); // reemplazamos las vocales por el valor de su vocal correspondiente
        }
        showValueContent(true, text); // mostramos el resultado
    }

    function setAnimationError() {
        input.style.animation = "error 1s"; // agregamos la animación
        setTimeout(() => {
            input.style.animation = ""; // limpiamos la animación
        }, 1000); // 1000ms = 1s
    }

    function showResultAnimation() {
        initial.style.animation = `fadeOut ${DURATION}ms`; // mostramos el resultado
        setTimeout(() => {
            initial.style.animation = ""; // limpiamos la animación
            initial.style.display = "none"; // ocultamos el contenido inicial
            result.style.display = "flex"; // ocultamos el contenido inicial
            result.style.animation = `fadeIn ${DURATION}ms`; // mostramos el resultado
            setTimeout(() => {
                result.style.animation = ""; // limpiamos la animación
            }, DURATION);
        }, DURATION); // esperamos a que termine la animación
    }

    function hiddenResultAnimation() {
        result.style.animation = `fadeOut ${DURATION}ms`; // mostramos el resultado
        setTimeout(() => {
            result.style.animation = ""; // limpiamos la animación
            result.style.display = "none"; // ocultamos el contenido inicial
            initial.style.display = "flex"; // ocultamos el contenido inicial
            initial.style.animation = `fadeIn ${DURATION}ms`; // mostramos el resultado
            setTimeout(() => {
                initial.style.animation = ""; // limpiamos la animación
                decryptBtn.disabled = false; // habilitamos el botón de desencriptar
                encryptBtn.disabled = false; // habilitamos el botón de encriptar
            }, DURATION);
        }, DURATION); // esperamos a que termine la animación
    }

    async function showValueContent(show, text) {
        if (show) {
            copyBtn.textContent = "Copiar"; // mostramos el texto de copiado
            resultText.value = text; // mostramos el resultado
            if(!resultIsVisible) showResultAnimation(); // mostramos la animación
            resultIsVisible = true; // el resultado está visible
        } else {
            copyBtn.textContent = "¡Copiado!"; // mostramos el texto de copiado
            copyBtn.classList.add("onClickCopy"); // agregamos la clase que cambia el color del botón
            await delayFunction(); // esperamos a que termine la animación
            if(resultIsVisible) hiddenResultAnimation(); // ocultamos la animación
            copyBtn.classList.remove("onClickCopy"); // removemos la clase que cambia el color del botón
            resultIsVisible = false; // el resultado no está visible
        }
    }

    function validateCharacters(text) {
        const regex = /[^a-z\s]/; // expresión regular para caracteres que no sean letras o espacios
        return regex.test(text); // si hay caracteres que no sean letras o espacios, retorna true
    }

    function selectText() {
        if(document.body.createTextRange) { // ms
            const range = document.body.createTextRange();
            range.moveToElementText(resultText);
            range.select();
        } else if(window.getSelection) { // moz, opera, webkit
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(resultText);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            console.warn("El navegador no soporta la selección de texto");
        }
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(resultText.value); // copiar el texto
            showValueContent(false); // ocultar el resultado
        } catch (err) {
            console.warn("El navegador no soporta la copia al portapapeles");
            selectText(); // seleccionamos el texto
        }
    }

    /* EVENTOS */

    encryptBtn.onclick = encrypt;
    decryptBtn.onclick = decrypt;
    input.onclick = clearTextArea;
    input.onblur = setTextOnTextArea;
    copyBtn.onclick = copyToClipboard;
};
