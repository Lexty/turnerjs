define(['cloud/bi/errors.json', 'lodash', 'utils'], function(errors, _, utils){
    'use strict';
    var logger = utils.logger;

    /**
     * Please ctrl/cmd + click on biError to see the schema :)
     * @type {Object.<String, biError>}
     */

    _.forEach(errors, function(error, key) {
        error.errorName = key;
    });


    logger.register('cloud', 'error', errors);

    return errors;
});
