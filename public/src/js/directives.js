angular.module('DiscussionApp').directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
     console.log(element);
     $(element[0]).scrollTop($(element)[0].scrollHeight);
      scope.$watchCollection('schrollBottom', function () {
          $(element).scrollTop($(element)[0].scrollHeight);
      });
    }
  }
});