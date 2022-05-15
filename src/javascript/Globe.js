import car1x from './../images/car1x.jpg'
import car2x from './../images/car2x.jpg'
import plane1x from './../images/plane1x.jpg'
import plane2x from './../images/plane2x.jpg'
import bike1x from './../images/bike1x.jpg'
import bike2x from './../images/bike2x.jpg'
import boat1x from './../images/boat1x.jpg'
import boat2x from './../images/boat2x.jpg'
import none from './../images/none.jpg'



class GlobeClass {
    constructor() {
        this.loginBar = null
        this.server = ""
        // The backend servers
        this.devServer = "http://localhost:1323"
        this.productionServer = "https://trade-k224sx4lwq-ew.a.run.app"

        this.devMode = false

        this.#init()
        this.makeform = null

        this.author = " alf248"
        this.authorGit = "https://github.com/alf248/"

        this.classicId = "62810a411d2ee440601b0449"
        this.racerId = "62810a411d2ee440601b044a"
    }

    // Determine wether to use dev or production server
    #init() {
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
			console.log("GLOBE DEVELOPMENT:", this.devServer)
            this.server = this.devServer
            this.devMode = true
		} else {
			console.log("GLOBE PRODUCTION:", this.productionServer)
            this.server = this.productionServer
		}
    }

    getImage(name) {
        return getAnImage(name)
    }

    convertDollarsToEuro(dollars) {
        return dollars = dollars * 0.95
    }
}
let Globe = new GlobeClass()
export default Globe



const images = {    
    car1: car1x, car2: car2x,
    boat1: boat1x, boat2: boat2x,
    plane1: plane1x, plane2: plane2x,
    bike1: bike1x, bike2: bike2x,
}



function getAnImage(name) {

    switch (name) {
        case "classic":
            return car1x
        case "dodge":
            return car2x
        default:
            if (name in images) return images[name]
            return none
    }
}