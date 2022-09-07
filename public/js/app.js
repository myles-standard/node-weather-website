const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    // preventDefault() prevents the default behaviour. 
    // In this case the default behaviour being prevented is the automatic refresh of a page upon form submit.
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location)
    .then((response) => {
        response.json()
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                // console.log('You must enter an address')
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
                // console.log(data.location)
                // console.log(data.forecastData)
            }
        })
    })
    console.log('Location ' + location)
})