let charAttribute = []
let userCharacter = {}
//let progressCounter = [0, 0, 0 ,0 ,0, 0, 0]
let correctAnswers = 0
let wrongAnswers = 0

const questionPack = [
    questionaire1,
    questionaire2,
    questionaire3,
    questionaire4,
    questionaire5,
    questionaire6,
    questionaire7
]

const renderChar = () => {
    //console.log(`running renderChar`)
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
            charElement.id = `card${i}` 
            charElement.innerHTML = `
                <div class="card">
                    <div class="card card-image">
                        <img id="character-img${i}" class="character" src=${charAttribute[i].card}
                            data-card=${charAttribute[i].card} 
                            data-classimg=${charAttribute[i].classImg}
                            data-index=${charAttribute[i].index} 
                            data-avatar=${charAttribute[i].avatar} 
                            data-name=${charAttribute[i].name} 
                            data-progress=${charAttribute[i].progress}>
                    </div>
                </div>
            `
            document.getElementById('charSelect').append(charElement)        
        }//end for loop
    //console.log(`ending renderChar`)
}// end renderChar


const getName = charIndex => {
    //console.log(`running getName`)
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
    //console.log(`ending getName`)
}// end getName

renderUserChar = user => {// Generate user character in the arena
    console.log(`running renderUserCHar`)
    if(user !== null){
        //console.log(`generating new Character because user is ${user.target.dataset.name}`)
        // Grab attributes from user
        userCharacter = {
            index: parseInt(user.target.dataset.index),
            name: user.target.dataset.name,
            card: user.target.dataset.card,
            classImg: user.target.dataset.classimg,
            avatar: user.target.dataset.avatar,
            questionaire: questionPack[parseInt(user.target.dataset.index)],
            progress: parseInt(user.target.dataset.progress)
        }// end object
        
        // console.log(`new character selected.`)
        // console.log(`index is ${parseInt(user.target.dataset.index)}`)
        // console.log(`progress is ${parseInt(user.target.dataset.progress)}`)
        // console.log(`progress is ${userCharacter.progress}`)

        // Generate the div to display on the HTML
        let userElement = document.createElement('div')
        userElement.innerHTML = `
            <div class='card'>
                <div class='card card-image'>
                    <img class="user-character" src=${userCharacter.avatar}>
                </div>
            </div>
        `
        document.getElementById('avatarStage').append(userElement)
        document.getElementById('avatarStage').className = 'col s4 scale-transition'
        generateTrivia(userCharacter)
    } else {
        //console.log(`executing null statement because user is ${user}`)
        document.getElementById('avatarStage').innerHTML = ''
        userCharacter = {}
    }
    //console.log(`ending renderUserChar`)
}// end renderUserChar

const randomList = (x) => {
    //console.log(`running randomList`)
	let answerArray = []
	if (x.index < 5){
		for(let i = 0; i < 4 ; i++){
			answerArray.push(x.index + i)
		}
	}
	else{
		for(let i = 0; i < 4 ; i++){
			answerArray.push(x.index - i)
		}
	}

    answerArray = shuffle(answerArray)
    //console.log(`ending randomList`)
    return answerArray
}// end randomList


const shuffle = (array) => {
    //console.log(`running shuffle`)
    for(var i = array.length, j, tmp; i--; ){
        j = 0|(Math.random() * i);
        tmp = array[j];
        array[j] = array[i];
        array[i] = tmp;
    }
    //console.log(`ending shuffle`)
    return array;
} // end shuffle

generateTrivia = charChoice => {
    
    //reset the page
    document.getElementById('question').innerHTML=''
    document.getElementById('answerChoices').innerHTML=''

    if(charChoice !== null){
        let answerChoiceArray = randomList(charChoice)
        let answerChoice = [
            charAttribute[answerChoiceArray[0]].questionaire[userCharacter.progress].answer,
            charAttribute[answerChoiceArray[1]].questionaire[userCharacter.progress].answer,
            charAttribute[answerChoiceArray[2]].questionaire[userCharacter.progress].answer,
            charAttribute[answerChoiceArray[3]].questionaire[userCharacter.progress].answer
        ]

        //Create the question element to display on the DOM
        let newQuestion = document.createElement('div') 
        newQuestion.className = 'question'
            newQuestion.innerHTML = `
                <div>
                    <p>
                        ${charChoice.questionaire[charChoice.progress].question}
                    </p>
                </div>
            `

        // Create the radio buttons element to display on the DOM
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
    } else{
        document.getElementById('question').innerHTML=''
        document.getElementById('answerChoices').innerHTML=''
        document.getElementById('answerButton').className='scale-transition scale-out'
    }
}// end generateTrivia

// const removeCard = div => {
//     let divBlock = document.getElementById(div)
//     let blockChild = document.getElementById(div)
//     divBlock.remove(blockChild)
// }// end removeDiv

selectNewCharacter = () =>{
    // console.log(`running selectNewCharacter`)
    // console.log(`current character is ${userCharacter.name}`)
    // console.log(`current progress is ${userCharacter.progress}`)
    // console.log(`storing user progress for ${userCharacter.name} which is ${userCharacter.progress}`)
    // console.log(`pushing ${userCharacter.progress} to charAttribute element ${userCharacter.index}`)
    // console.log(`progress was stored in charAttribute[${userCharacter.index}].progress`)
    // console.log(`progress in the charAttribute is now ${charAttribute[userCharacter.index].progress}`)
    generateTrivia(null)
    renderUserChar(null)
   //console.log(`ending selectNewCharacter`)
}

document.addEventListener('click', event => {
    //console.log(event.target.id)
    if (event.target.className === 'character') {
        console.log(`character is clicked`)
        if (Object.keys(userCharacter).length === 0){// Select a character
            renderUserChar(event)
            document.getElementById(`character-img${userCharacter.index}`).src = userCharacter.classImg
        } else{
            document.getElementById(`character-img${userCharacter.index}`).src = userCharacter.card
            selectNewCharacter()
            renderUserChar(event)
            document.getElementById(`character-img${userCharacter.index}`).src = userCharacter.classImg
            //console.log("Unhandled click event")
        } // end else
    }// end if
})// end listener

document.getElementById('answerButton').addEventListener('click', event => {
    console.log(`answerButton is clicked`)

    let answerRadios = document.getElementsByName('choices')
    let answer = ''

    //Check the radio buttons for which one is checked
    for (let i = 0; i < answerRadios.length; i++){
        answerRadios[i].checked ? answer=answerRadios[i].value : null
        // console.log(answerRadios[i].checked)
    }

    answer === userCharacter.questionaire[userCharacter.progress].answer ? correctAnswers++ : wrongAnswers++
    console.log(`character progress ${userCharacter.progress} inrementing characterProgress`)
    //userCharacter.progress++
    charAttribute[userCharacter.index].progress++
    document.getElementById(`character-img${userCharacter.index}`).dataset.progress = userCharacter.progress++
    console.log(`character progress is now ${userCharacter.progress}`)
    console.log(`charAttribute progress updated to ${charAttribute[userCharacter.index].progress    }`)
    
    userCharacter.progress < 5 ? generateTrivia(userCharacter) : selectNewCharacter()

    // if(answer === userCharacter.questionaire[userCharacter.progress].answer){
    //     console.log(`answer is correct`)
    //     // increment userCharacter.progress
    //     userCharacter.progress++
    //     // generate next question
    //     generateTrivia(userCharacter)
    // }/* end if */ else{
    //     console.log(`answer is wrong`)
    // }


    //console.log(`the answer is: ${answer}`)

    // console.log(event)
})

renderChar()
