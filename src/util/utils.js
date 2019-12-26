import AsyncStorage from '@react-native-community/async-storage';
import S from '../../server';
export default class U {

    // data = "2019-12-09 14:17:43";
    static filterDate(data,type){
        let src = new Date(data).toLocaleString();
        let replaceReg1 =/[\u4e00-\u9fa5]/g;
        let replaceReg2 = /[/]/g
        let l1 = src.replace(replaceReg1,'');
        data = l1.replace(replaceReg2,'-');
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
        if (minutes!=0 && dayDiff==0 && hours==0){
            return minutes+'分钟前';
        }else if (hours!=0 && dayDiff==0){
            return hours+'小时前';
        }else  if (dayDiff!=0){
            return dayDiff+'天前';
        } else{
            return 0;
        }
    }
    static setStorage(key,value){
        AsyncStorage.setItem(key,value);
    }
    static getStorage(key){
        const callBack = AsyncStorage.getItem(key);
        if(callBack !== null) {
            return callBack;
        }else{
          return '';
        }
    }
}