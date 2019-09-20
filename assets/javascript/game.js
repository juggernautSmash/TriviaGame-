let charAttribute = []
let userCharacter = {}
let progressCounter = [0, 0, 0 ,0 ,0, 0, 0]

const questions1 = [
    {// First Question
        question: "Who Am I?",
        answer: "someone"
    },
    {// Second Question
         question: "What time period was I born?",
        answer: "some time period"
    },
    {// Third Question
         question: "which nation do I hail from?",
        answer: "some nation"
    },
    {// Fourth Question
        question: "Where is my existance recorded?",
     answer: "something"
    },
    {// Fifth Question
        question3: "What is my weapon of choice",
        answer: "some weapon"
    }
]

const questionPack = [
    questionaire1,
    questionaire2,
    questionaire3,
    questionaire4,
    questionaire5,
    questionaire6,
    questionaire7
]

renderChar = () => {
        for(let i=0; i<7; i++){// Generate the individual character selections
            // Generate object for the character
            getName(i)
            charAttribute.push({
                index: i,
                name: servantName,
                classImg: `./assets/images/classCard${i+1}.png`,
                card: `./assets/images/card${i+1}.png`,
                avatar: `./assets/images/avatar${i+1}.png`,
                questionaire: questionPack[i],
                progress: 0
            })  

            // Generate the div card for character selection
            charElement = document.createElement('div')
            charElement.className = `carousel-item`
            charElement.id = `card${i+1}` 
            charElement.innerHTML = `
                <div class="card">
                    <div class="card card-image">
                        <img id="character-img${i+1}" class="character" src=${charAttribute[i].card} 
                            data-index=${charAttribute[i].index} 
                            data-avatar=${charAttribute[i].avatar} 
                            data-name=${charAttribute[i].name}
                            data-progress=${charAttribute[i].progress}>
                    </div>
                </div>
            `
            document.getElementById('charSelect').append(charElement)        
        }//end for loop
}// end renderChar

getName = charIndex => {
    charIndex = parseInt(charIndex)
    switch(charIndex){
        case 0:
            servantName = "Archer"
            break;
        case 1:
            servantName = "Assassin"
            break;
        case 2:
            servantName = "Berserker"
            break;
        case 3:
            servantName = "Caster"
            break;
        case 4:
            servantName = "Lancer"
            break;
        case 5:
            servantName = "Rider"
            break;
        case 6:
            servantName = "Saber"
            break;
        default:
            console.log(`something went wrong. charIndex is ${charIndex}`)
    }// end switch
}// end getName

renderUserChar = user => {// Generate user character in the arena
    // Grab attributes from user
    userCharacter = {
        index: parseInt(user.target.dataset.index),
        name: user.target.dataset.name,
        classImg: user.target.dataset.classImg,
        avatar: user.target.dataset.avatar,
        questionaire: questionPack[parseInt(user.target.dataset.index)],
        progress: progressCounter[parseInt(user.target.dataset.progress)]
    }// end object
    
    console.log(`progress is ${user.target.dataset.progress}`)

    // Generate the div to display on the HTML
    userElement = document.createElement('div')
    userElement.innerHTML = `
        <div class='card'>
            <div class='card card-image'>
                <img class="user-character" src=${charAttribute[userCharacter.index].avatar}>
            </div>
        </div>
    `
    document.getElementById('avatarStage').append(userElement)
    document.getElementById('avatarStage').className = 'col s4 scale-transition'
    generateTrivia(userCharacter)
}// end renderUserChar

generateTrivia = charChoice => {
    let newQuestion = document.createElement('div') 
    newQuestion.className = 'question'
        newQuestion.innerHTML = `
            <div>
                <p>
                    ${charChoice.questionaire[progressCounter[charChoice.progress]].question}
                </p>
            </div>
        `

    let answerChoice = ['lorem', 'impsum', 'veritas', 'consectetur']

    let newAnswers = document.createElement('form')
    newAnswers.className = 'answers'
    for(let i=0; i<4; i++){
    newAnswers.innerHTML += `
            <p>
                <label>
                    <input class='with-gap' type='radio' name='choices' value='${answerChoice[i]}'/>
                    <span>${answerChoice[i]}</span>
                </label>
            </p>
        `
    }

    document.getElementById('question').append(newQuestion)
    document.getElementById('answerChoices').append(newAnswers)
    document.getElementById('answerButton').className='waves-effect waves-yellow btn-large red scale-transition'
}

removeCard = div => {
    let divBlock = document.getElementById(div)
    let blockChild = document.getElementById(div)
    divBlock.remove(blockChild)
}// end removeDiv

displayClassCard = classCard => {
    console.log(`running displayClassCard`)
    console.log(`classCard index is ${classCard.index}`)
    console.log(`character image index is ${classCard.index+1}`)
    // console.log(`classCard image URL is ${charAttribute[classCard.index].classImg}`)
    document.getElementById(`character-img${classCard.index+1}`).src = charAttribute[classCard.index].classImg
}

document.addEventListener('click', event => {
    //console.log(event.target.id)
    if (event.target.className === 'character') {
        if (Object.keys(userCharacter).length === 0){// Select a character
            renderUserChar(event)
            displayClassCard(userCharacter)
            //removeCard(`card${userCharacter.index}`)
            // removeCard(`intro`)
        } //else if (Object.keys(userCharacter).length !== 0){
        //     removeCard(`card${userCharacter.index}`) // remvoe the div
        //     userCharacter = {} // empty userCharacter
        //     renderUserChar(event) // regenerate userCharacter
        // } 
        else{
            console.log("Unhandled click event")
        } // end else
    }// end if
})// end listener

document.getElementById('answerButton').addEventListener('click', event => {
    console.log(`button is clicked`)

    let answerRadios = document.getElementsByName('choices')
    let answer = ''

    for (let i = 0; i < answerRadios.length; i++){
        answerRadios[i].checked ? answer=answerRadios[i].value : console.log(`Button is ${answerRadios[i].value} and it is it checked? ${answerRadios[i].checked}`)
        // console.log(answerRadios[i].checked)
    }
    
    if(answer === userCharacter.questionaire[userCharacter.progress].answer){
        console.log(`answer is correct`)
        // increment userCharacter.progress
        // userCharacter.progress++
        // generate next question
        // generateTrivia(userCharacter)
    }/* end if */ else{
        console.log(`answer is wrong`)
    }


    //console.log(`the answer is: ${answer}`)

    // console.log(event)
})

renderChar()
