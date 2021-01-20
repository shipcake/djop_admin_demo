import find from 'lodash/find'

const Auth = (request) => {

    if (request.headers.cookie) {
       
        /** remove space between text and split comma into arrays */
        let Cookies = request.headers.cookie.replace(" ","").split(";")
        const Find = find(Cookies, (v) =>  {
            let Regex = new RegExp("logged=true$","g")
           return Regex.test(v)
        })

        if (Find) {
            return true
        } else {
            return false
        }

    }else {
        return false
    }
}
export default Auth