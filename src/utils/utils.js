export  default {
    formateDate (data){
        if(!data) return ''
        let timeT = new Date(data)
        let h = timeT.getHours() < 10 ? '0'+timeT.getHours() :timeT.getHours()
        let m = timeT.getMinutes() < 10 ? '0'+timeT.getMinutes() :timeT.getMinutes()
        let s = timeT.getSeconds() < 10 ? '0'+timeT.getSeconds() :timeT.getSeconds()
        return timeT.getFullYear()+'-'+(timeT.getMonth()+1)+'-'+timeT.getDate()+' '+h+ ':' +m+':'+s     
    }
}
