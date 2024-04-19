    function Date_Con(Date){
        let hours = Date.getHours().toString();
        let mins = Date.getMinutes().toString();
        let date = Date.getDate();
        let month = Date.getMonth()+1;
        let year = Date.getFullYear();
        hours = hours.length==1?'0'+hours.toString():hours
        mins = mins.length==1?'0'+mins.toString():mins
        
        return (hours+':'+mins+' '+date+'/'+month+'/'+year)
    }


//(el.date.getHours()/10==0?('0'+el.date.getHours()):el.date.getHours())+':'+(el.date.getMinutes()/10==0?('0'+el.date.getMinutes()):el.date.getMinutes())+' '+el.date.getDate()+'/'+(el.date.getMonth()+1)+'/'+el.date.getFullYear()
export default Date_Con