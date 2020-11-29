const request = require('request')


const geocode =(address,callback)=>{
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJleTEyNSIsImEiOiJja2g4cXIyM3cwdmJ5MnRsMjExbWdyc2c1In0.Dsg6Ip4N0ahESwpMSDZPBg&limit=1'

    request({url:url,json:true},(error,response)=>{
        if(error){
            console.log('tested')
            callback('unable to connect')
            
        }
        else if(response.body.features.length===0){
            // console.log('test2')
            callback('please enter a valid address')
            
        }
        else{
            const geoinfo= response.body
            const data={
            latitude:geoinfo.features[0].center[1],
            longitude :geoinfo.features[0].center[0],
            placename:geoinfo.features[0].place_name
            }
            callback(undefined,data)
        }

    })

}
module.exports=geocode