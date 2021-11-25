const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')


populateUi()
let ticketPrice = +movieSelect.value
    //Save Selected movie
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)

    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count 
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
        //Copy selected seats into array
        //Map array
        //return a new array


    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    console.log(selectedSeats)
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice

}

//Get Data from lokalstorige

function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    console.log(selectedSeats)
    if (selectedSeats !== null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }

        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex

    }
}



//Change Movie event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)

    updateSelectedCount()
})

//Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupide')) {
        e.target.classList.toggle('selected')

        updateSelectedCount()

    }
})

updateSelectedCount()