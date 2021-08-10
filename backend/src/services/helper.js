module.exports = {
    sendResponse:function(res,body,status=200){
        res.status(status).send(body);
    }
}


