angular.module('slideToggleContentControl', [])
.directive('slideToggleContent', function () {
    return {
        restrict:'A',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '0.5s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggleControl', function($timeout) {
    return {
        restrict: 'A',
        scope: {'toggled': '=?'},
        link: function(scope, element, attrs) {
            var target, content;
            // scoped boolean variable for when the slide is toggled
            scope.toggled = scope.toggled || false;
            
            // slides the slide based on the value of toggle
            function slide(toggled)
            {
                if (!target) target = document.querySelector(attrs.slideToggleControl);
                if (!content) content = target.querySelector('.slideable_content');
                
                if(toggled) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    content.style.border = 0;
                    target.style.height = content.clientHeight + 'px';
                } else {
                    target.style.height = '0px';
                }
            }
            
            // toggles the slide
            function toggle()
            {
                // toggle boolean first
                scope.toggled = !scope.toggled;
                
                // call the slide method
                slide(scope.toggled);
            }
            
            // handle when the control is clicked
            element.bind('click keypress', function() {
                toggle();
            });
            
            // initialize the slide after the directive has compiled
            $timeout(function(){
                // slide content in or out based on scope.toggled
                slide(scope.toggled)
            }, 1);
            
        }
    }
});
