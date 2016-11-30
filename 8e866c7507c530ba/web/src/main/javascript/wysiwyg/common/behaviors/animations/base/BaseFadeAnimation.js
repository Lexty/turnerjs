define.animation('BaseFade', function(){
    return {
        init: function(animations){
            this._animations = animations;
        },

        /**
        * Fade base animation object
        * @param {HTMLElement|String} element DOM element or DOM Id
        * @param {Number} [duration=1.0]
        * @param {Number} [delay=0]
        * @param {Object} params
        * @param {Number|String} [params.from.opacity]
        * @param {Number|String} [params.to.opacity]
        * @returns {Tween}
        */
        animate: function(element, duration, delay, params) {
            params = params || {};
            params.duration = _.isNumber(parseInt(duration)) ? duration : this._defaults.duration;
            params.delay = _.isNumber(parseInt(delay)) ? delay : this._defaults.delay;
            params = _.defaults(_.cloneDeep(params), this._defaults.params);

            return this._animations.tween(element, params, this._allowedParams);
        },

        _defaults:{
            duration: 1.0,
            delay: 0,
            params: {}
        },

        _allowedParams: ['opacity'],

        group: ['base']
    };
});
