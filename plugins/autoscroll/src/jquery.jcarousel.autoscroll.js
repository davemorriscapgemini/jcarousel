/*!
 * jCarousel AutoScroll Plugin v@VERSION
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2011, Jan Sorgalla
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 *
 * Date: @DATE
 */
(function (window) {
    'use strict';

    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define('jquery.jcarousel.autoscroll', ['jquery', 'jquery.jcarousel'], factory);
        } else {
            factory(window.jQuery, window.jCarousel);
        }
    }(function ($, jCarousel) {
        jCarousel.plugin('jcarouselAutoscroll', {
            options: {
                target:    '+=1',
                interval:  3000,
                autostart: true
            },
            timer: null,
            _init: function() {
                if (this.option('autostart')) {
                    this.start();
                }
            },
            _destroy: function() {
                this.stop();
            },
            start: function() {
                this.stop();

                this.carousel()._bind('animateend.' + this.pluginName, $.proxy(this.start, this));

                this.timer = setTimeout($.proxy(function() {
                    this.carousel().scroll(this.option('target'));
                }, this), this.option('interval'));

                return this;
            },
            stop: function() {
                if (this.timer) {
                    this.timer = clearTimeout(this.timer);
                }

                this.carousel()._unbind('animateend.' + this.pluginName);

                return this;
            }
        });
    }));
}(window));
