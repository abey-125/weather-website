const request = require('request')

const weatherRequest=(lat,long,callback)=>{
    url=`http://api.weatherstack.com/current?access_key=ed4870f8726a093bd2fb56e44584a778&query=${lat},${long}&units=f`
    // console.log(url)
    request({url:url,json:true},(error,response)=>{
        if (error){
            callback('unable to connect!')
        }
        else if(response.body.error){
            callback(response.body.error.info)
        }
        else{
            const currentval= response.body.current
            const data={
                weateherdesc:currentval.weather_descriptions[0]+', current temprature is '+currentval.temperature+'°f and it feelslike ' + currentval.feelslike+'°f ',
                currenttemp:currentval.temperature,
                feelslike:currentval.feelslike,
                location: response.body.location.name +','+response.body.location.region +','+response.body.location.country
            }
            callback(undefined,data)
        }

    })
}
module.exports=weatherRequest