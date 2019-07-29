import React from 'react'
import {Select} from 'antd'

const {Option} = Select


export  default {
    formateDate (data){
        if(!data) return ''
        let timeT = new Date(data)
        let h = timeT.getHours() < 10 ? '0'+timeT.getHours() :timeT.getHours()
        let m = timeT.getMinutes() < 10 ? '0'+timeT.getMinutes() :timeT.getMinutes()
        let s = timeT.getSeconds() < 10 ? '0'+timeT.getSeconds() :timeT.getSeconds()
        return timeT.getFullYear()+'-'+(timeT.getMonth()+1)+'-'+timeT.getDate()+' '+h+ ':' +m+':'+s     
    },
    //分页
    pagination(data,callback){
        if (!data) return {}
        return {
            current:data.page,
            pageSize:data.pageSize,
            showSizeChanger:true,
            showTotal:total => `共有 ${total} 条数据`,
            onChange(page,pageSize){
                console.log(page);
                callback&&callback(page)
            },
            pageSizeOptions:['5','10','15','20']
        }
    },
    getOptionList(data){
        if(!data){
            return []
        }
        let OptionVal = []
        data.forEach(ele =>{
            OptionVal.push(<Option value={ele.id} key={ele.id}>{ele.value}</Option>) 
        })
        return OptionVal
    }

}
