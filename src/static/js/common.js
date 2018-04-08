let CommonFunction = {
    onemenulist:null,
    url: function(){
        // return '/';
        return '/api/';
    },
    //公共样式弹窗
    commonAlertWindow: function(obj){
        var html =
        '<div class="commonAlertBox">' +
            '<div class="alertContent">' +
                obj.message+
            '</div>' +
        '</div>';
        obj.query.append(html);

        setTimeout(function () {
            $('.commonAlertBox').remove();
        },obj.time)
    },
    //  防抖函数
    debounce: function(fn,delay,mustRunDelay){
        var timer = null;
        var t_start;
        return function(){
            var context = this;
            var args = arguments;
            var t_curr = +new Date();
            clearTimeout(timer);
            if(!t_start){
                t_start = t_curr;
            }
            if(t_curr - t_start >= mustRunDelay) {
                fn.apply(context,args);
                t_start = t_curr
            } else {
                timer = setTimeout(function(){
                    fn.apply(context,args);
                },delay);
            }
        } 
    }
}


Date.prototype.format = function(type){
    let year = this.getFullYear();
    let month = this.getMonth() + 1;
    let day = this.getDate();
    let h = this.getHours();
    let m = this.getMinutes();
    let s = this.getSeconds();

    month<=9?month='0'+month:month;
    day<=9?day='0'+day:day;
    h<=9?h='0'+h:h;
    m<=9?m='0'+m:m;
    s<=9?s='0'+s:s;

    if(type === 'YYYY-MM-DD hh:mm:ss'){
        return year+'-'+month+'-'+day+' '+h+':'+m+':'+s;
    }else if(type === 'YYYY-MM-DD'){
        return year+'-'+month+'-'+day;
    }else if(type === 'MM-DD hh:mm:ss'){
        return month+'-'+day+' '+h+':'+m+':'+s;
    }else if(type === 'hh:mm'){
        return h+':'+m;
    }else if(type === 'hh:mm:ss'){
        return h+':'+m+':'+s;
    }else{
        return year+'-'+month+'-'+day+' '+h+':'+m+':'+s;
    }
}

Array.prototype.indexOf = function(val){
    for(let i=0; i<this.length; i++){
        if(this[i] === val){
            return i
        }
    }
    return -1;
}

Array.prototype.remove = function(val){
    let index = this.indexOf(val);
    if(index > -1){
        this.splice(index, 1);
    }
}


export default CommonFunction;