//REFACTORIZAR EN UNA FUNCION
const firstCallApi = async()=>{
    try {
        const respuesta = await fetch('https://swapi.dev/api/films/')
        const data = await respuesta.json()
        const peliculas = data.results
        const tituloPeliculas = peliculas.map(pelicula => pelicula.title)
        const yearData = peliculas.map(pelicula=>pelicula.release_date)
        const año = yearData.map( d => new Date( d ).getFullYear() );
        return paintLines(año, tituloPeliculas)
    } catch (error) {
    }
}
firstCallApi()

const paintLines = (año, tituloPeliculas)=>{
    var defaultOptions = {
        axisY: {
          onlyInteger: true
        },
    }
    new Chartist.Line('.ct-chart', {
        labels: tituloPeliculas,
        series: [año]
      }, defaultOptions);
}

const secondCallApi = async()=>{
try {
   const respuesta = await fetch('https://swapi.dev/api/people/') 
   const data = await respuesta.json()
   const personajes = data.results
   const filmsLength = personajes.map(personaje=>personaje.films.length)
   const nombrePersonaje = personajes.map(personaje => personaje.name)
   return paintBarras(nombrePersonaje, filmsLength)
} catch (error) {
    console.log(error)
}
}
secondCallApi()

const paintBarras = (nombrePersonaje, filmsLength)=>{
    new Chartist.Bar('.ct-chart2', {
        labels: nombrePersonaje,
        series: [filmsLength]
      }, {
        stackBars: true,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value.split(/\s+/).map(function(word) {
              return word[0];
            }).join('');
          },
          onlyInteger:true
        },
        axisY: {
          offset: 20,
          onlyInteger: true
        }
      }, [
        // Options override for media > 400px
        ['screen and (min-width: 400px)', {
          reverseData: true,
          horizontalBars: true,
          axisX: {
            labelInterpolationFnc: Chartist.noop,
          },
          axisY: {
            offset: 60,
          }
        }],
      ]);
      
}



