


const ProccessApi = {

    getUserRole: () => {
        return localStorage.getItem("role")
    },

    getJwtToken: ()=> {
        return localStorage.getItem("token")
    },

    getUserId: ()=> {
        return localStorage.getItem("userId")
    }
}


export default ProccessApi;