const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const one=document.querySelector('#one')
const two=document.querySelector('#two')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    //document.getElementById('api').innerHTML='data'
    one.textContent="loading..."
    two.textContent=""
    const location=search.value
    fetch('/weather?address='+encodeURI(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
          console.log(  {"error":"data.error"})
          one.textContent=data.error
        }else{
            console.log(data)
            one.textContent=data.location
            two.textContent=data.temperature

        }
        
    })

})
    
    console.log('testing')
})