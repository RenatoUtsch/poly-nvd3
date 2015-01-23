/*
    @license
    Copyright (c) 2015 Renato Utsch. All rights reserved.
    This code may only be used under the BSD style license found at http://renatoutsch.github.io/LICENSE.txt
*/

/*
 * Replace the original nv.toltip.cleanup function to fix shadow DOM issues.
 * This is based on naunga's work at https://github.com/naunga/polychart-element
 * I do not submit this as a pull request to nvd3 because it needs shadow DOM
 * support or polyfill to work correctly, what nvd3 doesn't use.
 **/
(function(){
    nv.tooltip.cleanup = function() {
        // Find the tooltips, mark them for removal by this class (so others cleanups won't find it)
        var tooltips = document.querySelectorAll('body /deep/ .nvtooltip');
        var purging = [];
        for(var i = 0; i < tooltips.length; ++i) {
            purging.push(tooltips[i]);
            tooltips[i].style.transitionDelay = '0 !important';
            tooltips[i].style.opacity = 0;
            tooltips[i].className = 'nvtooltip-pending-removal';
        }

        setTimeout(function() {
            while (purging.length) {
                var removeMe = purging.pop();
                removeMe.parentNode.removeChild(removeMe);
            }
        }, 500);
    };

})();
