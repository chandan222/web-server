const path=require('path')
const express = require('express')
const hbs=require('hbs')


const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')


const app= express()

//define path for express config
const PublicDirectoryPath=path.join(__dirname,'../public')
const ViewsDirectoryPath=path.join(__dirname,'../template/views')
const partialspath=path.join(__dirname,'../template/partials')

// setup handle bar engine and view location
app.set('view engine','hbs')
app.set('views',ViewsDirectoryPath)
hbs.registerPartials(partialspath)

// setup stactic template
app.use(express.static(PublicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        'title':"Home Page title",
        "name":"Chandan"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        'title':"About Kate! ",
        'name':"Chandan"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        'title':"help mama",
        'message':"help hona kate",
        'name':"Chandan"
    })
})




app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            "error":"please send address"
        })
    }

    geocode.geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({
                 error
            })
        }
        forecast.forecast(latitude,longitude,(error,{temperature, feelslike})=>{
            if(error){
                return res.send({
                    error
                })
            }

            const weather={
                location,
                temperature,
                feelslike
            }
            res.send(weather)

        })
    })
   
    console.log(req.query)
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        'title':"404",
        'message':"Help article not Found",
        'name':'Chandan'
    })
})


app.get('*', (req,res) => {
    res.render('404',{
        'title':"404",
        'message':"Page not Found",
        'name':'Chandan'
    })
})

app.listen(3000,()=>{
    console.log('listening')
})