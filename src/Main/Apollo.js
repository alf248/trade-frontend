import firebase from 'firebase/compat/app';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import Globe from '../Main/Globe'


const httpLink = createHttpLink({ uri: Globe.apolloServer, });

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = sessionStorage.getItem('token');
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
});



const apolloClient = new ApolloClient({
    uri: Globe.apolloServer+'/graphql',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
export {apolloClient}



class UserQL {
    constructor() {}

    getUser(id) {
        apolloClient.query({
            query: gql`
                query {
                    getUserPrivate(fid: $id) {
                        name
                        offersMade
                        ordersMade
                    }
                }
            `
          }).then(result => console.log(result)).catch(err => console.error(err))
    }

    getByName(name) {
        apolloClient.query({
            query: gql`
                query {
                    getUser(id: 1) {
                        name
                    age
                    friends(first: 1)
                    }
                }
            `
          }).then(result => console.log(result)).catch(err => console.error(err))
    }
}



let Users = new UserQL()
export default Users