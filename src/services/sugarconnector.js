import axios from 'axios'
let instance = axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/http://13.235.180.13/sugarcrm/rest/v11",
    timeout: 15000
});
export default {

    sendSmsRequestToGateway(request) {
        console.log("sendSmsRequestToGateway(): request received Request=", request)

        return instance.get('/bulksms?username=di78-agcnet&password=digimile&type=0&dlr=1&destination=' + request.cli + '&source=AGCNTW&message=' + request.message, {}).then(response => {
            console.log("sendSmsRequestToGateway() response=", response)

            return response
        }).catch(error => {
            console.log("sendSmsRequestToGateway() :  error=", error)
            throw error
        })
    },

    fetchOuathTokenForSugarCrm() {
        const body = {
            "grant_type": "password",
            "client_id": "sugar",
            "client_secret": "",
            "username": "RohitS",
            "password": "Tcs@1234",
            "platform": "base"
        }
        const head = {
            "Content-Type": "application/json"
        }
        console.log("getOauthToken(): request received")

        return instance.post('/oauth2/token', body, { headers: head }).then(response => {
            console.log("getOauthToken() response=", response)
            console.log("getOauthToken() response.data.access_token=", response.data.access_token)
            return response
        }).catch(error => {
            console.log("getOauthToken() :  error=", error)
            throw error
        })
    },

    getAccountIdFromPhoneNumber(request) {
        console.log("getAccountIdFromPhoneNumber(): request received Request=", request)

        const body = {
            "filter": {
                "array": {
                    "phone_office": request.body.phoneNumber
                }
            }
        }

        const head = {
            "Content-Type": "application/json",
            "Oauth-Token": request.header.authToken

        }
    
        return instance.post('/Accounts/filter', body, { headers: head }).then(response => {
            console.log("getAccountIdFromPhoneNumber() response=", response)
            return response
        }).catch(error => {
            console.log("getAccountIdFromPhoneNumber() :  error=", error)
            throw error
        })
    }

}