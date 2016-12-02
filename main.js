"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var environment_1 = require('./app/environment');
var hmr_1 = require('@angularclass/hmr');
var app_module_1 = require('./app/app.module');
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_module_1.AppModule)
        .then(environment_1.decorateModuleRef)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
// needed for hmr
// in prod this is replace for document ready
hmr_1.bootloader(main);
//# sourceMappingURL=main.js.map