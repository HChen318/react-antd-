import jsonP from 'jsonp';
import axios from 'axios'
import {Modal} from 'antd'

export default class Axios {
    //静态方法
    static jsonp(option) {
        return new Promise((resolve,reject)=>{
            jsonP(
                option.url,
                {param:'callback'},
                function(err,response){
                    if(response.status === 'success'){
                        resolve(response)
                    }else {
                        reject(response.message)
                    }
                    
                }
            )
        })
    }
    static ajaxAxios(option){
        let baseURL = 'https://www.easy-mock.com/mock/5d342ba81dacec11eafbfd63/mockapi'
        if(option.data && option.data.isshow != false){
            document.getElementById('ajaxLoading').style.display = 'block'
        }
        return new Promise((resolve,reject) =>{
            axios({
                baseURL,
                url:option.url,
                timeout: 5000,
                params: (option.data && option.data.param) || ''
            }).then(res=>{
                console.log(res);
                
                if(res.status == 200){
                    if(res.data.code == 0){
                        if(option.data && option.data.isshow != false){
                            document.getElementById('ajaxLoading').style.display = 'none'
                        }
                        resolve(res.data)
                    }else {
                        Modal.info({
                            title:'提示',
                            content:res.data.meg
                        })
                    }  
                } else {
                    reject(res.data)
                }
            }).catch(err =>{
                console.log('axios 出错');
                
                document.getElementById('ajaxLoading').style.display = 'none'
            })
        })
    }
}