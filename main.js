// QR code generator
const wrapper = document.querySelector(".wrapper"),
generateBtn = wrapper.querySelector(".form button"),
qrInput = wrapper.querySelector(".form input"),
qrImg = wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if(!qrValue) return; // jika tidak ada value return false
    generateBtn.innerText = "Generating QR Code...";
    // debugg
    // console.log(qrValue)
    // menambahkan class baru berna active
    // api qr
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    try{
        qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    })
    } catch (error){
        console.log(error)
    }
    
    qrInput.addEventListener("keyup", () => {
        setTimeout(() => {
             if(!qrInput.value) 
        wrapper.classList.remove("active");
        }, 300);
    });
});
// end qr code generator

// qr code scanner
const wrapperScaner = document.querySelector(".wrapper-scanner"),
form = wrapperScaner.querySelector("form"),
fileInput = form.querySelector("input"),
infoText = form.querySelector("p"),
copyBtn = wrapperScaner.querySelector(".copy");
closeBtn = wrapperScaner.querySelector(".close");

function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code...";
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        if(!result) return;
        // ternary
        infoText.innerText = result ? "Upload QR Code to Scan": "Couldn't Scan Qr Code "
        wrapperScaner.querySelector("textarea").innerText = result;
        form.querySelector("#qr-code-scanner").src = URL.createObjectURL(file);
        // debug kedua
        // console.log(result)
      
        wrapperScaner.classList.add("active-scan");
        // debug lagi
        // console.log(result)
    }).catch (error => {
        let message = "Error QR code not read, please change file and try again";
        infoText.innerText = message;
    });
    // debug console.log
    // console.log(file);
}

fileInput.addEventListener("change", (e) => {
    let file = e.target.files[0]; // getting user selected file
    let formData = new FormData(); // creating a new form data object
    formData.append("file", file); // appending file to formData
    fetchRequest(formData, file);
    // debug console.log buat let file
    // console.log(file);

})

copyBtn.addEventListener("click", () => {
    let txt = wrapperScaner.querySelector("textarea").textContent;
    navigator.clipboard.writeText(txt);
    alert("Text copied to clipboard");
});
form.addEventListener("click", () => fileInput.click());
closeBtn.addEventListener("click", () => setTimeout(wrapperScaner.classList.remove("active-scan")), 2000);
// end qr code scanner
