import jsonP from 'jsonp';

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
}