// 测试环境/正式环境
let debuger = false;
const domainPath = {
    url:debuger?'http://192.168.0.114:3000/':'https://onchated.cn:1080/'
};

const nameIds = {
    'login':['user/login',{email:'',pwd:''}],
    'hasLogin':['user/hasLogin',{token:''}],
    'article':['socialMatter/article',{token:''}],
    'getMsgList':['user/getMsgList',{token:''}]
}
function getData(data={},reqPath,doSuccess){
    if(nameIds[reqPath]){
       if(JSON.stringify(data)!={}){
        var reqData = nameIds[reqPath];
        reqData[1] = data;
       }
       let url = domainPath.url+reqData[0];
       fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => 
            response.json()
        ).then((responseJson) => {
            if (typeof doSuccess == "function") {
                console.log(reqPath,responseJson);
                doSuccess(responseJson);
            }
        })
    }else{
        alert('无定义接口');
    }
    
}
module.exports = {
    getData
}