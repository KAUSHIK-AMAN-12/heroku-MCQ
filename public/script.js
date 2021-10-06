const startbutton = document.getElementById('start-btn')
const nextbutton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const headerid = document.getElementById('headerid')
const questionnumber = document.getElementById('question-number') 
const resultbutton = document.getElementById('result-btn')
const resultdivcontainer = document.getElementById('resultdiv')
const detailsdiv = document.getElementById('detailsdiv')
const totalquesdiv = document.getElementById('totalquesdiv')
const totalcorrect = document.getElementById('total-correct')
const totalattempts = document.getElementById('total-attempts')
const inpusername = document.getElementById('username')
const emailid = document.getElementById('emailid')
const collegename = document.getElementById('collegename')
const profession = document.getElementById('profession')
const printcollegename = document.getElementById('printcollegename')
const printusername = document.getElementById('printusername')
const userdetails = document.getElementById('userdetails')




const questions = [
    {
        question : 'Ques. what is the purpose of JWT ?',
        answers : [
            {text : 'autherization' , correct: true},
            {text : 'authentication' , correct : false},
            {text : 'API' , correct : false},
            {text : 'None of the above' , correct : false}
        ]
    },
    {
        question : ' Ques. why is the  format of JSON object ? ',
        answers : [
            {text : '{"name" : "aman"}',correct : true},
            {text : '{name : "aman"}', correct : false}
            ,{text : 'name : "aman" ', correct : false},
            {text : '[name : "aman"]' , correct : false}
        ]
    },
    {
        question : ' Ques. why is __proto__ ? ',
        answers : [
            {text : 'hidden pointer that points to obj from current obj inherited',correct : true},
            {text : 'similar to this pointer', correct : false}
            ,{text : 'super class', correct : false},
            {text : 'none of the above' , correct : false}
        ]
    },
    {
        question : 'Ques. which one is correct ?',
        answers : [
            {text : 'obj.__proto__.__proto__ == object.prototype',correct : false},
            {text : 'obj.__proto__ == object.prototype', correct : true}
            ,{text : 'obj == object.prototype', correct : false},
            {text : 'none of the above' , correct : false}
        ]
    },
    {
        question : 'Ques. how to use React.component with class in React.js ?',
        answers : [
            {text : 'function app extends React.component ',correct : false},
            {text : 'class App extends React.Component', correct : true}
            ,{text : 'class App inherit React.Component', correct : false},
            {text : 'none of the above' , correct : false}
        ]
    },
    {
        question : 'Ques. how to use React.component with class in React.js ?',
        answers : [
            {text : 'function app extends React.component ',correct : false},
            {text : 'class App extends React.Component', correct : true}
            ,{text : 'class App inherit React.Component', correct : false},
            {text : 'none of the above' , correct : false}
        ]
    },
    {
        question : 'Ques. how to hash a password with bcrypt parse from req.body?',
        answers : [
            {text : 'bcrypt.hash(req.body.password)',correct : false},
            {text : 'bcrypt.hash(req.body.password,10)', correct : true}
            ,{text : 'bcrypt.gensalt(req.body.password)', correct : false},
            {text : 'none of the above' , correct : false}
        ]
    },
    {
        question : 'Ques. which lib should we use for photo storing in database in node js ? ',
        answers : [
            {text : 'nodemon',correct : false},
            {text : 'dotenv', correct : false}
            ,{text : 'multer', correct : true},
            {text : 'none of the above' , correct : false}
        ]
    },
]


let shuffledQuestions;                    //new var use for --->   New Array
let currentQuestionIndex;                 //new var use for ---> index for New Array
let totalrightquestions = 0;              
let totalquesattempts = 0;

// Ab hume sabse phle functions chhaiye jo hamare buttons click karne pe chalenege
// setNextQuestion do bar call kiya jaraha hai ek to startgame() me or nextbutton ko click karne se

startbutton.addEventListener('click' ,()=>{
    totalrightquestions = 0;
    console.log(inpusername.value)
    console.log(profession.value)
    startGame()})

nextbutton.addEventListener('click' ,()=> {
    currentQuestionIndex++     
    setNextQuestion()
})

resultbutton.addEventListener('click' , ()=>{
    resultshow()
})



function startGame()                      // --->    Onclick start button
{
console.log('game started')
startbutton.classList.add('hide')          //.add dynamically add class name to your class element
questionContainerElement.classList.remove('hide')
headerid.classList.remove('hide') 
resultdivcontainer.classList.add('hide')
detailsdiv.classList.add('hide')
userdetails.classList.add('hide')


shuffledQuestions = questions.sort(()=> Math.random() - .5)     //questions.sort(0/1) for new array
currentQuestionIndex = 0
setNextQuestion()
}

function setNextQuestion(){   //---->       each time we want clear previous answers first
resetState()                  //----->      to clean form,body,buttons,questions
showQuestion(shuffledQuestions[currentQuestionIndex],currentQuestionIndex)  //showquestion() me wo particular question bheja
}


function showQuestion(question,quesno)     
{
    console.log('ques : ' + question.question)
    questionnumber.innerText = 'Ques : ' + (quesno + 1)
    questionElement.innerText = question.question

///--->             next step is populating answers buttons,
//---->            to jtne b answer hai unke liye loop chalake 'button' element banaya 

    question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    //aur ab ye upar bane new button elements me css style add karna hai uske liye
    button.classList.add('btn')
    if (answer.correct)  // if correct = 1 , to hum button elmnt me data attr add krnge othrwise nhi 
    {
    button.dataset.correct = answer.correct  //-->  <button data="correct">option-1</button>
    }
    /// ---- button element ko click functionality dedi hai

    button.addEventListener('click' ,selectAnswer,{once : true})  //new buttons ko click karne se selectAnswer()

    // button ko banane ke bad, css apply ke bad,text set,
    //dataset attr karne ke bad usko append karna hai

    answerButtonsElement.appendChild(button)
})
}

function selectAnswer(e)     //answer ko select karne ke bad kya hai ? uske liye ye func() hai
{
    totalquesattempts++;
 const selectedButton = e.target      ///-->  e.target gives us the access to data-compo in elements
 const correct = selectedButton.dataset.correct 
 setStatusClass(document.body , correct)  //phle yaha se call kiya setStatusclass ko body ka color 
                                          // change krne ko accor to correct or wrong
 Array.from(answerButtonsElement.children).forEach(button =>{
     setStatusClass(button , button.dataset.correct)   //yaha se each button elem ko setStatusClass() me bheja hai

 })
 if (shuffledQuestions.length == currentQuestionIndex + 1)  
 {
    resultbutton.classList.remove('hide')     
 }
 else{          //jab sare question ka end hojayega tab hum kya kya show karna chhate hai
                // for ex - restart button, total correct ans , total attempts , total question
    console.log(totalrightquestions);   
    nextbutton.classList.remove('hide')          
    // startbutton.innerText = 'Restart' 
    // startbutton.classList.remove('hide')
 }

}

function setStatusClass(element , correct)    //new status set se phle previous clear honge
{
clearStatusClass(element) //it will clear previous status
if (correct)        //agar correct = true hai, correct style file ko add kardenge body and button me
{
element.classList.add('correct'); 
if(element == document.body)
{
    totalrightquestions++;
    console.log(totalrightquestions)
}
}
else{
    element.classList.add('wrong')
}
}

//----------------- to clear previous states ---------------------------------///
function clearStatusClass(element)     //how to clear previous state
{
element.classList.remove('correct')
element.classList.remove('wrong')
}

//----------------- to reset states -------------------//
function resetState()
{
    clearStatusClass(document.body)
    nextbutton.classList.add('hide')   //hum answer to click karne ke bad hi 
    //----->  next button show karna chahte hai
    //-----> ab check karenge ki answerbuttonelement <div> me jo child hai unko remove karna hai 
    //----->   so that ki wo next question me na dhike

    while (answerButtonsElement.firstChild)
    {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild) //ye sare purane child nikal dega
    }
}


function resultshow()
{
userdetails.classList.add('hide')
headerid.classList.add('hide')
nextbutton.classList.add('hide')
resultbutton.classList.add('hide')
questionContainerElement.classList.add('hide')
resultdivcontainer.classList.remove('hide')
detailsdiv.classList.remove('hide')
startbutton.innerText = 'restart'
startbutton.classList.remove('hide')
updateresultvalues()
}

function updateresultvalues()
{
resetState()
printusername.innerText = inpusername.value
printcollegename.innerText = collegename.value
totalquesdiv.innerText = questions.length
totalcorrect.innerText = totalrightquestions
totalattempts.innerText = totalquesattempts
}