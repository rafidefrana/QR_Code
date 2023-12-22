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


