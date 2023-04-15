window.onload = () => {
    const input = document.getElementById("inputText");
    const resultText = document.getElementById("resultText");
    const encryptBtn = document.getElementById("encrypt");
    const decryptBtn = document.getElementById("decrypt");
    const copyBtn = document.getElementById("copyBtn");
    const keys = {
        e: "enter",
        i: "imes",
        a: "ai",
        o: "ober",
        u: "ufat",
    };

    function encrypt() {
        if (validateCharacters(input.value)) return setAnimation();
        let text = input.value;
        for (let key in keys) {
            text = text.replaceAll(key, keys[key]);
        }
        changeRigthContent(text);
    }

    function decrypt() {
        if (validateCharacters(input.value)) return setAnimation();
        let text = input.value;
        for (const key in keys) {
            text = text.replaceAll(keys[key], key);
        }
        changeRigthContent(text);
    }

    function setAnimation() {
        input.style.animation = "error 1s";
        setTimeout(() => {
            input.style.animation = "";
        }, 1000);
    }

    function changeRigthContent(text) {
        const initial = document.getElementsByClassName("noContentRigth")[0];
        const result = document.getElementsByClassName("contentRigth")[0];
        initial.style.display = "none";
        result.style.display = "flex";
        resultText.value = text;
    }

    function validateCharacters(text) {
        const regex = /[^a-z]/;
        return regex.test(text);
    }

    async function copyToClipboard() {
        try{
            await navigator.clipboard.writeText(resultText.value);
        }catch(err){
            console.log(err);
            alert("Se generó un error al intentar copiar el texto");
        }
    }

    input.onclick = () => {
        if (input.value === "Ingrese el texto aquí") input.value = "";
    };
    input.onblur = () => {
        if (input.value === "") input.value = "Ingrese el texto aquí";
    };
    encryptBtn.onclick = encrypt;
    decryptBtn.onclick = decrypt;
    copyBtn.onclick = copyToClipboard;
};
