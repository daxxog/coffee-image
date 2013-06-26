/* CoffeeImage
 * Abstract JavaScript class for images.
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.CoffeeImage = factory();
  }
}(this, function() {
    var CoffeeImage = function(src) {
        var i = this.i = new Image();
        
        if(typeof src == 'string') {
            this.src = i.src = src;
            
            this.onload = function() {
                this._ready = true;
                this.ready();
            };
        }
    };
    
    CoffeeImage.prototype._ready = false;
    CoffeeImage.prototype._readyRan = false;
    CoffeeImage.prototype.ready = function(bind) {
        var ifx = (typeof bind == 'function');
        
        if((this._ready === true) && this._readyRan === false) {
            if(ifx) {
                this._readyRan = true;
                bind.apply(this, [this.i]);
            }
        } else if(ifx) {
            this.__ready = bind;
        } else {
            if(typeof this.__ready == 'function') {
                this._readyRan = true;
                this.__ready();
            }
        }
    };
    
    CoffeeImage.prototype.toImage = function() {
        return this.i;
    };
    
    return CoffeeImage;
}));