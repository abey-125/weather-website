const path= require('path')
const hbs =require('hbs')
const express= require('express')
const { Console } = require('console')
const geocode = require('./utils/geocode')
const weatherRequest = require('./utils/weatherRequest')

// specifying paths to our bhs and html files
const viewpath= path.join(__dirname,"../templates/views")
const publicdir=path.join(__dirname,'../public')
const partialspath = path.join(__dirname,'../templates/partials')

const app=express()

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.use(express.static(publicdir))


app.get('',(req,res)=>{
    
    res.render('index',{
        title:'Weather',
        name:'abey',
        appname:'weatherapp'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        message:'There is an argent requirement in Amazon '
    })

})

app.get('/about',(req,res)=>{

   res.render('about',{
       title:'About me',
       name: 'Abey'
   })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a valid address'
        })
    }
    
    const loc= req.query.address
    geocode(loc,(error,{latitude:lat,longitude:long}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        // const {latitude:lat,longitude:long} =data 
        weatherRequest(lat,long,(error,{location,weateherdesc,currenttemp,feelslike})=>{

            if(error){  
               return res.send({
                    error
                })
            }
            res.send([{
                place:location,
                description:weateherdesc,
                currentTempature:currenttemp,
                feelslike:feelslike
            }
        ])
        })


    })
    
})
app.get('/help/*',(req,res)=>{
    res.send('The help page you are searching is not found 404')
})

 app.get('*',(req,res)=>{
     res.send('This is my 404 page')
 })


app.listen(3000,()=>{
    console.log('The server is up and running in port 3000')
})