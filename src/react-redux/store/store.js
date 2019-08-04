// 创建仓库
import { createStore } from 'redux';

//导入小弟reducer
import reducer from '../reducer/reducer'

//导出仓库
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //与插件一起使用
)
export default store