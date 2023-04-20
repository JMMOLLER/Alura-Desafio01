window.onload = () => {
    const input = document.getElementById("inputText"); // obtenemos el eleento del DOM con el id inputText
    const resultText = document.getElementById("resultText"); // obtenemos el eleento del DOM con el id resultText
    const encryptBtn = document.getElementById("encrypt");  // obtenemos el eleento del DOM con el id encrypt
    const decryptBtn = document.getElementById("decrypt"); // obtenemos el eleento del DOM con el id decrypt
    const copyBtn = document.getElementById("copyBtn"); // obtenemos el eleento del DOM con el id copyBtn
    const clearTextArea = () => {
        if (input.value === "Ingrese el texto aquí") input.value = ""; // si el textarea tiene el texto de ejemplo, lo limpiamos
    };
    const setTextOnTextArea = () => {
        if (input.value === "") input.value = "Ingrese el texto aquí"; // si el textarea está vacío, mostramos el texto de ejemplo
    };
    const keys = {
        e: "enter",
        i: "imes",
        a: "ai",
        o: "ober",
        u: "ufat",
    }; // objeto con los valores de las vocales

    function encrypt() {
        if (validateCharacters(input.value)) return setAnimation(); // si hay caracteres que no sean letras o espacios, mostramos la animación y retornamos
        let text = input.value; // obtenemos el texto ingresado
        for (let key in keys) {
            text = text.replaceAll(key, keys[key]); // reemplazamos las vocales por el valor de su vocal correspondiente
        }
        showValueContent(true, text); // mostramos el resultado
    }

    function decrypt() {
        if (validateCharacters(input.value)) return setAnimation(); // si hay caracteres que no sean letras o espacios, mostramos la animación y retornamos
        let text = input.value; // obtenemos el texto ingresado
        for (const key in keys) {
            text = text.replaceAll(keys[key], key); // reemplazamos las vocales por el valor de su vocal correspondiente
        }
        showValueContent(true, text); // mostramos el resultado
    }

    function setAnimation() {
        input.style.animation = "error 1s"; // agregamos la animación
        setTimeout(() => {
            input.style.animation = ""; // limpiamos la animación
        }, 1000); // 1000ms = 1s
    }

    function showValueContent(show, text) {
        if (show) {
            const initial = document.getElementsByClassName("noContentRigth")[0]; // obtenemos el contenido inicial
            const result = document.getElementsByClassName("contentRigth")[0]; // obtenemos el elemento que contiene el textarea
            initial.style.display = "none"; // ocultamos el contenido inicial
            result.style.display = "flex"; // mostramos el resultado
            resultText.value = text; // mostramos el resultado
        } else {
            const initial = document.getElementsByClassName("noContentRigth")[0]; // obtenemos el contenido inicial
            const result = document.getElementsByClassName("contentRigth")[0]; // obtenemos el elemento que contiene el textarea
            initial.style.display = "flex"; // mostramos el contenido inicial
            result.style.display = "none"; // ocultamos el resultado
            resultText.value = ""; // limpiamos el textarea
        }
    }

    function validateCharacters(text) {
        const regex = /[^a-z\s]/; // expresión regular para caracteres que no sean letras o espacios
        return regex.test(text); // si hay caracteres que no sean letras o espacios, retorna true
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(resultText.value); // copiar el texto
            showValueContent(false); // ocultar el resultado
        } catch (err) { // si hay un error, evitamos ocultar el resultado
            console.log(err); // si hay un error, lo mostramos en consola
            alert("Se generó un error al intentar copiar el texto"); // mostramos un mensaje de error
        }
    }

    encryptBtn.onclick = encrypt;
    decryptBtn.onclick = decrypt;
    input.onclick = clearTextArea;
    input.onblur = setTextOnTextArea;
    copyBtn.onclick = copyToClipboard;
};
