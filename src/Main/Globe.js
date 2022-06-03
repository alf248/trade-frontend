import car1x from './../assets/images/car1x.jpg'
import car2x from './../assets/images/car2x.jpg'
import plane1x from './../assets/images/plane1x.jpg'
import plane2x from './../assets/images/plane2x.jpg'
import bike1x from './../assets/images/bike1x.jpg'
import bike2x from './../assets/images/bike2x.jpg'
import boat1x from './../assets/images/boat1x.jpg'
import boat2x from './../assets/images/boat2x.jpg'
import none from './../assets/images/none.jpg'



class GlobeClass {
    constructor() {
        this.loginBar = null

        // Main go server
        this.server = "http://localhost:1323"
        this.productionServer = "https://trade-k224sx4lwq-ew.a.run.app"

        // Apollo user server
        this.apolloServer = "http://localhost:8080"
        this.apolloProductionServer = "https://apollo-k224sx4lwq-lz.a.run.app"

        this.devMode = false

        this.#init()
        this.makeform = null

        this.author = " alf248"
        this.authorGit = "github.com/alf248/gotrade"
        this.authorGitURL = "https://github.com/alf248/gotrade"
    }

    // Determine wether to use dev or production server
    #init() {
		if ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && true) {
			console.log("DEVELOPMENT MODE: using backend:", this.server)
            this.devMode = true
		} else {
			console.log("PRODUCTION MODE: using backend:", this.productionServer)
            this.server = this.productionServer
            this.apolloServer = this.apolloProductionServer
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