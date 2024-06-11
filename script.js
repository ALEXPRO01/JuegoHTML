const questions=[
    {
        question:"¿Qué etiqueta se utiliza para añadir una imagen en HTML?",
        answers:[
            {Text:"&lt;img&gt;", correct:true},
            {Text:"&lt;a&gt;", correct:false},
            {Text:"&lt;image&gt;", correct:false},
        ]
    },
    {
        question:"¿Qué atributo se utiliza para especificar la URL de un enlace?",
        answers:[
            {Text:"src", correct:false},
            {Text:"href", correct:true},
            {Text:"alt", correct:false},
        ]  
    },
    {
        question:"¿Cuál es la etiqueta correcta para crear un formulario en HTML?",
        answers:[
            {Text:"&lt;form&gt;", correct:true},
            {Text:"&lt;input&gt;", correct:false},
            {Text:"&lt;label&gt;", correct:false},
        ]  
    },
    {
        question:"¿Qué etiqueta se usa para crear una lista ordenada??",
        answers:[
            {Text:"&lt;ul&gt;", correct:false},
            {Text:"&lt;ol&gt;", correct:true},
            {Text:"&lt;li&gt", correct:false},
        ]  
    },
    {
        question:"¿Qué etiqueta se utiliza para crear una tabla en HTML?",
        answers:[
            {Text:"&lt;table&gt", correct:true},
            {Text:"&lt;tr&gt", correct:false},
            {Text:"&lt;td&gt", correct:false},
        ]  
    },
    {
        question:"¿Qué etiqueta se usa para definir un encabezado en HTML?",
        answers:[
            {Text:"&lt;head&gt", correct:false},
            {Text:"&lt;h1&gt", correct:false},
            {Text:"&lt;header&gt", correct:true},
        ]  
    },
    {
        question:"¿Cuál es el propósito del atributo 'alt' en una etiqueta de imagen?",
        answers:[
            {Text:"Proporcionar un texto alternativo en caso de que la imagen no se pueda mostrar", correct:true},
            {Text:"Especificar la URL de la imagen", correct:false},
            {Text:"Definir el tamaño de la imagen", correct:false},
        ]  
    },
    {
        question:"¿Qué etiqueta se utiliza para definir un enlace en HTML?",
        answers:[
            {Text:"&lt;link&gt", correct:false},
            {Text:"&lt;a&gt", correct:true},
            {Text:"&lt;href&gt", correct:false},
        ]  
    },
    {
        question:"¿Cuál es el elemento contenedor principal en una página HTML?",
        answers:[
            {Text:"&lt;body&gt", correct:true},
            {Text:"&lt;html&gt", correct:false},
            {Text:"&lt;div&gt", correct:false},
        ]  
    },
    {
        question:"¿Qué etiqueta se usa para crear un campo de entrada en un formulario? ",
        answers:[
            {Text:"&lt;textarea&gt", correct:false},
            {Text:"&lt;select&gt", correct:false},
            {Text:"&lt;input&gt", correct:true},
        ]  
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const btn2Button = document.getElementById("btn2");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    btn2Button.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    

}

function showScore(){
    resetState();
    questionElement.innerHTML = `Tu puntuacion ha sido ${score} de ${questions.length}`;
    nextButton.innerHTML = "Jugar de nuevo";
    btn2Button.innerHTML = "Inicio";
    nextButton.style.display ="block";
    btn2Button.style.display ="block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();

