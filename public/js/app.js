// const { response } = require("express")

console.log('client side javascript is runnig!')
const search= document.querySelector('input')
const msg =document.querySelector('#msg-1')
const msg2 =document.querySelector('#msg-2')


const weather = document.querySelector('form')

// msg.textContent='Hi hello world'

weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc = search.value
    console.log(loc)
    msg.textContent=''
    msg2.textContent=''
    fetch('http://localhost:3000/weather?address='+loc).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            msg.textContent=data.error
            return console.log(data.error)
            
        }
        else{
            // console.log(data)
            msg.textContent=data[0].place
            msg2.textContent=data[0].description
            // console.log(data)
            // console.log(data[0] .place)
            // console.log(data[0].currentTempature)

        }



        
    })
})

})



