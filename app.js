const startButton = document.querySelector("[data-start]");
const pousetButton = document.querySelector("[data-pouse]");
const stopButton = document.querySelector("[data-stop]");
const timeElement = document.querySelector("[data-time]")

let segundos = 0;
    minutos = 0;
    horas = 0;
let interval;

const renderizarTime = (segundos, minutos, horas) => {
    const horasValue = horas < 10 ? "0" + horas : horas;
    const minutosValue = minutos < 10 ? "0" + minutos : minutos;
    const segundosValue = segundos < 10 ? "0" + segundos : segundos;

    timeElement.innerHTML = horasValue + ":" + minutosValue + ":" + segundosValue;
};


const startTime = (startValue)=>{
    startButton.setAttribute("disabled","true");
    pousetButton.removeAttribute("disabled");
    stopButton.removeAttribute("disabled")

    if (startValue === "start" || startValue === "restart") {
        (segundos = segundos != 0 ? -1 : 0), (minutos = 0); (horas = 0);
        interval = setInterval(() => {
            segundos++;
            while (segundos === 60) {
                segundos = 0;
                minutos++;                
            }
            while (minutos === 60) {
                minutos = 0;
                horas++;                
            }
            renderizarTime(segundos, minutos, horas);    
        }, 1000)
    }else if(startValue === "continue"){
        interval = setInterval(() => {
            segundos++;
            while (segundos === 60) {
                segundos = 0;
                minutos++;                
            }
            while (minutos === 60) {
                minutos = 0;
                horas++;                
            }
            renderizarTime(segundos, minutos, horas);    
        }, 1000)

    }
    
};
const pouseTime = () =>{
    
    startButton.removeAttribute("disabled");
    startButton.setAttribute("data-start","continue");
    startButton.innerHTML = "Continuar";
    pousetButton.setAttribute("disabled","true");

    clearInterval(interval);
};
const stopTime = () =>{
    startButton.removeAttribute("disabled");
    startButton.setAttribute("data-start", "restart");
    pousetButton.setAttribute("disabled", "true")
    stopButton.setAttribute("disabled", "true")
    startButton.innerHTML = "Reiniciar"

    clearInterval(interval);
};

startButton.onclick = () => {
    const startValue = startButton.getAttribute("data-start");
    startTime(startValue);
}
pousetButton.onclick = () =>{
    pouseTime();
}