const {bot} = require('./structures/client')

new bot()

let errorsToIgnore = [10008]

process.on('unhandledRejection', (reason, p) => {
    if(errorsToIgnore.includes(reason.code)) return;
    console.log(' [antiCrash] :: Unhandled Rejection/Catch');
    console.log(reason, p);
});

process.on('uncaughtException', (err, origin) => {
    if(errorsToIgnore.includes(err.code)) return;
    console.log(' [antiCrash] :: Uncaught Exception/Catch');
    console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    if(errorsToIgnore.includes(err.code)) return;
    console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
    console.log(err, origin);
});

process.on('multipleResolves', (type, promise, reason) => {
    if(errorsToIgnore.includes(reason.code)) return;
    console.log(' [antiCrash] :: Multiple Resolves');
    console.log(type, promise, reason);
});