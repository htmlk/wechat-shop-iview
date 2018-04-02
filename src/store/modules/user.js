import api from '../../libs/api.js'
import util from '../../libs/util.js'
const user = {
    state: {},
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            localStorage.clear();
        }
    },
    actions:{
    	//登录
        login({commit },data) {
            let url = util.baseUrl + '/auth/login'
            return api.otherPost(url,data)
                .then(function(res) {
                    return res.data
                })
        },
    }
};

export default user;
