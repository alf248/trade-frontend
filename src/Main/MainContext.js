import React from 'react'



// React Context
// https://reactjs.org/docs/context.html
export const MainContext = React.createContext({
	signedUser: "",
	Post: () => {}, // for posting data to server
})