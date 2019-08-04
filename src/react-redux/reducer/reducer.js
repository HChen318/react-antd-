
//初始值
const initialVal = {
    title:'首页',
    ch:25
}

export default (prestate=initialVal,action) => {
    console.log(prestate,'prestate');
    console.log(action,'action');
    
    switch (action.type) {
        case 'crumbs_title': 
            let prestateObj = JSON.parse(JSON.stringify(prestate))
            let newstateObj = {
                ...prestateObj,
                title:action.title,
            }
            return newstateObj
            break;
        default:
            return prestate
            break;
    }
}

