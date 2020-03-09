function reqmodler(req, res, next) {
    let params = req.originalUrl.split("/");
    
    req.$urlParams = {};
    req.$urlParams.requestType = params[1];
    req.$urlParams.modelType = params[2];
    req.$urlParams.modelId = params[3];
    req.originalUrl = req.$urlParams.modelId ? "/" + req.$urlParams.modelId: "/";
    console.log("req.originalUrl", req.originalUrl);
    console.log("req.$urlParams", req.$urlParams);

    next();
}

module.exports = reqmodler;