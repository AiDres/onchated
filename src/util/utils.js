export default class U {

    // data = "2019-12-09 14:17:43";
    static filterDate(data,type){
        var dateBegin = new Date(data.replace(/-/g, "/"));
        var dateEnd = new Date();
        var dateDiff = dateEnd.getTime() - dateBegin.getTime();
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
        var leave1 = dateDiff % (24 * 3600 * 1000)    
        var hours = Math.floor(leave1 / (3600 * 1000))
        var leave2 = leave1 % (3600 * 1000)
        var minutes = Math.floor(leave2 / (60 * 1000))
        var leave3 = leave2 % (60 * 1000)
        var seconds = Math.round(leave3 / 1000)
        // console.log(dayDiff,hours,minutes,seconds);
        if (dayDiff!=0){
            return dayDiff+'天前';
        } else if (hours!=0){
            return hours+'小时前';
        } else if (minutes!=0){
            return minutes+'分钟前';
        }else{
            return 0;
        }
    }
    
}