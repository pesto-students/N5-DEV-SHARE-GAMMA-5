var moment=require('moment');
module.exports = {
    sendResponse:function(res,body,status=200){
        res.status(status).send(body);
    },
    formatedDate:function(date,format){
       return moment(date).format(format);
    }
}


