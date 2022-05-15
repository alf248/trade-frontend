import Globe from './Globe'



class PostData {
    constructor(url, logout) {
        this.url = url
        this.success = null
        this.fail = null
        this.simpleHeaders = { 'Content-Type': 'application/json' }
        this.body = null
		this.logout = logout
    }
    Body(body) {
        this.body = JSON.stringify( body )
        return this
    }
    Success(callback) {
        this.success = callback
        return this
    }
    Fail(callback) {
        this.fail = callback
        return this
    }
    Call() {
        this.#post(this.url, this.simpleHeaders)
    }
    CallAuth() {
        const token = sessionStorage.getItem('token')
        const email = sessionStorage.getItem('email')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token + ' ' + email,
        }

        console.log("CALL AUTH:", "token:" ,token, "email:", email)

        this.#post(this.url, headers)
    }
    #post(url, headers) {
        console.log("CALLING:", url)

        const fullURL = Globe.server + url

        const requestOptions = {
            method: 'POST',
            headers: headers,
		}

        if (this.body !== null) {
            requestOptions["body"] = this.body
            console.log("SENDING BODY:", this.body)
        }

        fetch(fullURL, requestOptions)
        .then(res => {

                //console.log("RESPONSE CONTENT TYPE", res.headers.get("content-type"))

                if (res.ok) {
                    if (res.headers.get("content-type").includes('json')) {
                        return res.json()
                    }
                    throw new Error("Wrong response content type. Expected json, got:", res.headers.get("content-type"))
                }

                if (res.status === 401) {
                    // 401 = Unauthorized
                    // if this is received, it means user is not logged in
                    // assert that it is reflected in the client state
                    this.logout()
                    alert("You are not signed in. Your session may have expired. Please sign in and try again.")
                }

                if (res.headers.get("content-type").includes('text')) {
                    res.text().then((message)=>{

                        if (this.fail !== null) {
                            this.fail(res.status, message)
                        }
                        console.log("RESPONSE:", res.status, message)
                    })
    
                    throw new Error(res.status)
                }
                else if (res.headers.get("content-type").includes('json')) {
                    res.json().then((message)=>{

                        if (this.fail !== null) {
                            this.fail(res.status, message)
                        }
                        console.log("RESPONSE:", res.status, message)
                    })
    
                    throw new Error(res.status)
                }
                else {
                    throw new Error("Wrong response content type. Expected JSON or TEXT, got:", res.headers.get("content-type"))
                }

            },
            err => {
                if (this.fail !== null) {
                    this.fail(null, err.message)
                }
                console.log("NO RESPONSE", err)
                throw new Error(err)
            }
        )
        .then(
            (result) => {
                console.log("RESPONSE:", result)
                if (this.success !== null) {
                    this.success(result)
                }
            }
        )
        .catch((err) => {
            //console.log("catch:", err)
        })
    }
}
export default PostData