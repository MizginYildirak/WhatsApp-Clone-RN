
// Initialize some variables before react-native code would access them
var onmessage=null, self=global;
// Cache Node's original require as __debug__.require
global.__debug__={require: require};
// Prevent leaking process.versions from debugger process to
// worker because pure React Native doesn't do that and some packages as js-md5 rely on this behavior
Object.defineProperty(process, "versions", {
    value: undefined
});
// TODO: Replace by url.fileURLToPath method when Node 10 LTS become deprecated
function fileUrlToPath(url) {
  if (process.platform === 'win32') {
      return url.toString().replace('file:///', '');
  } else {
    return url.toString().replace('file://', '');
  }
}
function getNativeModules() {
    var NativeModules;
    try {
        // This approach is for old RN versions
        NativeModules = global.require('NativeModules');
    } catch (err) {
        // ignore error and try another way for more recent RN versions
        try {
            var nativeModuleId;
            var modules = global.__r.getModules();
            var ids = Object.keys(modules);
            for (var i = 0; i < ids.length; i++) {
              if (modules[ids[i]].verboseName) {
                 var packagePath = new String(modules[ids[i]].verboseName);
                 if (packagePath.indexOf('Libraries/BatchedBridge/NativeModules.js') > 0 || packagePath.indexOf('Libraries\\BatchedBridge\\NativeModules.js') > 0) {
                   nativeModuleId = parseInt(ids[i], 10);
                   break;
                 }
              }
            }
          if (nativeModuleId) {
            NativeModules = global.__r(nativeModuleId);
          }
        }
        catch (err) {
            // suppress errors
        }
    }
    return NativeModules;
}
// Originally, this was made for iOS only
var vscodeHandlers = {
    'vscode_reloadApp': function () {
        var NativeModules = getNativeModules();
        if (NativeModules && NativeModules.DevSettings) {
            NativeModules.DevSettings.reload();
        }
    },
    'vscode_showDevMenu': function () {
        var NativeModules = getNativeModules();
        if (NativeModules && NativeModules.DevMenu) {
            NativeModules.DevMenu.show();
        }
    }
};
process.on("message", function (message) {
    if (message.data && vscodeHandlers[message.data.method]) {
        vscodeHandlers[message.data.method]();
    } else if(onmessage) {
        onmessage(message);
    }
});
var postMessage = function(message){
    process.send(message);
};
if (!self.postMessage) {
    self.postMessage = postMessage;
}
var importScripts = (function(){
    var fs=require('fs'), vm=require('vm');
    return function(scriptUrl){
        scriptUrl = fileUrlToPath(scriptUrl);
        var scriptCode = fs.readFileSync(scriptUrl, 'utf8');
        // Add a 'debugger;' statement to stop code execution
        // to wait for the sourcemaps to be processed by the debug adapter
        vm.runInThisContext('debugger;' + scriptCode, {filename: scriptUrl});
    };
})();

// Worker is ran as nodejs process, so console.trace() writes to stderr and it leads to error in native app
// To avoid this console.trace() is overridden to print stacktrace via console.log()
// Please, see Node JS implementation: https://github.com/nodejs/node/blob/master/lib/internal/console/constructor.js
console.trace = (function() {
    return function() {
        try {
            var err = {
                name: 'Trace',
                message: require('util').format.apply(null, arguments)
                };
            // Node uses 10, but usually it's not enough for RN app trace
            Error.stackTraceLimit = 30;
            Error.captureStackTrace(err, console.trace);
            console.log(err.stack);
        } catch (e) {
            console.error(e);
        }
    };
})();

// As worker is ran in node, it breaks broadcast-channels package approach of identifying if it’s ran in node:
// https://github.com/pubkey/broadcast-channel/blob/master/src/util.js#L64
// To avoid it if process.toString() is called if will return empty string instead of [object process].
var nativeObjectToString = Object.prototype.toString;
Object.prototype.toString = function() {
    if (this === process) {
        return '';
    } else {
        return nativeObjectToString.call(this);
    }
};


{"id":"776e7820-ab65-4af8-8e20-b11dd710cee1","createdAt":"2025-03-18T19:57:44.206Z","runtimeVersion":"exposdk:52.0.0","launchAsset":{"key":"bundle","contentType":"application/javascript","url":"http://127.0.0.1:19000/index.ts.bundle?platform=ios&dev=true&hot=false&transform.engine=hermes&transform.bytecode=1&transform.routerRoot=app&unstable_transformProfile=hermes-stable"},"assets":[],"metadata":{},"extra":{"eas":{},"expoClient":{"name":"WhatsApp-Clone-RN","slug":"WhatsApp-Clone-RN","version":"1.0.0","orientation":"portrait","icon":"./assets/icon.png","userInterfaceStyle":"light","newArchEnabled":true,"updates":{"enabled":false},"splash":{"image":"./assets/splash-icon.png","resizeMode":"contain","backgroundColor":"#ffffff","imageUrl":"http://127.0.0.1:19000/assets/./assets/splash-icon.png"},"ios":{"supportsTablet":true},"android":{"adaptiveIcon":{"foregroundImage":"./assets/adaptive-icon.png","backgroundColor":"#ffffff","foregroundImageUrl":"http://127.0.0.1:19000/assets/./assets/adaptive-icon.png"}},"web":{"favicon":"./assets/favicon.png"},"_internal":{"isDebug":false,"projectRoot":"/Users/mizgin/Desktop/WhatsApp-Clone-RN","dynamicConfigPath":null,"staticConfigPath":"/Users/mizgin/Desktop/WhatsApp-Clone-RN/app.json","packageJsonPath":"/Users/mizgin/Desktop/WhatsApp-Clone-RN/package.json"},"sdkVersion":"52.0.0","platforms":["ios","android"],"iconUrl":"http://127.0.0.1:19000/assets/./assets/icon.png","hostUri":"127.0.0.1:19000"},"expoGo":{"debuggerHost":"127.0.0.1:19000","developer":{"tool":"expo-cli","projectRoot":"/Users/mizgin/Desktop/WhatsApp-Clone-RN"},"packagerOpts":{"dev":true},"mainModuleName":"index.ts","__flipperHack":"React Native packager is running"},"scopeKey":"@anonymous/WhatsApp-Clone-RN-9cdd4cb9-c934-40c9-ad76-0fe674b7d74d"}}
// Notify debugger that we're done with loading
// and started listening for IPC messages
postMessage({workerLoaded:true});