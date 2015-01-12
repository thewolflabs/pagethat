angular.module('pagethat.controllers', [])

// Login Controller
.controller('loginController', function($scope, $state, $location, $ionicSideMenuDelegate) {
    
    $scope.facebookLogin = function () {
 
		openFB.login(
                function(response) {
                    if(response.status === 'connected') {
                    	$state.go('app.facebook');
                    } else {
                        alert('Facebook login failed: ' + response.error);
                    }
                }, {scope: 'email,publish_stream,user_likes'});
    };
})

//facebook controller
.controller('facebookController', function($scope, $stateParams) { 
       
    
    $scope.sort_by = function(field, reverse, primer){
        var key = function (x) {return primer ? primer(x[field]) : x[field]};

        return function (a,b) {
            var A = key(a), B = key(b);
            return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
        }
    }
    
    var curDate = new Date();
    var feedDate = new Date();
    feedDate.setHours(curDate.getHours()-1);
    //alert(feedDate.getTime());
    var res = [];
		openFB.api(
		{
			path: '/me/likes',
			success: function(data){
                try
                {
                    var pageids=[];
                    var likes =  JSON.parse(JSON.stringify(data));
                    for(var i=0; i<Object.keys(likes.data).length;i++)
                      pageids.push(likes.data[i].id);
                    
                    //if has next, repeat 
                    
                    
                    //for begin
                    for(var k=0;k<Object.keys(pageids).length;k++)
                    {
                        //alert('here');
                        openFB.api({
                            path: '/' + pageids[k].toString() + '/feed',
                            params: { limit:25, fields:'comments.limit(1).summary(true),likes.limit(1).summary(true)', untill: feedDate.getTime()}, //, 
                            success: function(data){
                                var pagefeeds =  JSON.parse(JSON.stringify(data));
                                //alert(Object.keys(pagefeeds.data).length);
                                for(var j=0;j<Object.keys(pagefeeds.data).length;j++)
                                {
                                    //if(pagefeeds.data[j].type == "link")
                                    //{
                                        //pagefeeds.data[j].sourceImage = getSourceImage(pagefeeds.data[j].picture);

                                        //var si = pagefeeds.data[j].picture.replace(/\/s130x130|\/v/g, "");
                                        //var si = si.replace(/\/p130x130|\/v/g, "");
                                        //var si = si.replace(/\/s480x480|\/v/g, "");
                                        //pagefeeds.data[j].sourceImage = si;
                                        //alert(pagefeeds.data[j].likes.summary.total_count);
                                        //pagefeeds.data[j].likes_count = pagefeeds.data[j].likes.summary.total_count;
                                        //pagefeeds.data[j].comments_count = pagefeeds.data[j].comments.summary.total_count;
                                        res.push(pagefeeds.data[j]);
                                    //}
                                }

                            },
                            error: function(error){alert(error.message+'child');}
                        });
                    }
                    
                //for end
                }catch(ex)
                {
                    alert(ex.message+'parent');   
                }
            },
                          
			error: function(error){alert(error.message);}
		});
    
    //sort
    
    //res.sort(sort_by('price', false, parseInt));
    
        $scope.feeds = res;
    
    alert('oh fuck' + Object.keys(res).length);
    
    
    
	
});
