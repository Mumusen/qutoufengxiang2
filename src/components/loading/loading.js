import jQuery from 'jquery';
function Loading(query){
    this.query = query;
    this.html = '<div class="loading-son"></div>';
    
    
}

Loading.prototype = {
    constructor: Loading,
    show: function(){
        
        $(this.query).append(this.html).css('position','relative');
    },
    hide: function(){
        $('.loading-son').remove();
    }
}

export default Loading;