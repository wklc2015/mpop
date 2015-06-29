$(function () {
    var mPop = BASE.COM.mPop.init('POP1');
    mPop.on('yes', function(){
        var input = this.$container.find('input');
        if(input[0]){
            console.log(input.val());
        }else{
            console.log('input is not define');
        }
    });
    mPop.on('no', function(){
        console.log('no');
    });
    $('.btn').on(BASE.COM.mUtils.eventName.tap, function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this), opt;
        if ($this.hasClass('alert')) {
            opt = {
                text       : '请输入姓名！',
                placeholder: '请输入姓名',
                yesBtnText : '确定',
                noBtnText  : '取消',
                type       : 'text'
            }
        } else if ($this.hasClass('confirm')) {
            opt = {
                header    : '提示',
                text      : '请输入电话号码！',
                type      : false,
                yesBtnText: '确定',
                noBtnText : '取消'
            }
        } else if ($this.hasClass('prompt')) {
            opt = {
                header     : '注册',
                placeholder: '请输入电话号码',
                type       : 'tel',
                yesBtnText : '确定',
                noBtnText  : '取消'
            }
        } else if ($this.hasClass('dialog')) {
            opt = {
                header    : '提示信息',
                text      : '过去4年总共发布了6款手机。第一个手机是2011年8月份发布的。这只手机从8月份开始销售一直到退市，大概用了18个月。大致上手机行业，其实很多的手机，上市可能3个月，长的6个月，9个月就下市了，第一款手机卖了18个月，卖了790万只。小米2是2012年8月发布的，这只手机时间更长，一直到2014年，6、7月份才停止销售小米2的，卖1742万只。小米3卖了18个月，卖了1438万只。去年红米Note到今天还在卖。看起来手机很多，他们用了4年时间做了6款手机。每款周期很长，量很大。',
                type      : false,
                yesBtnText: '关闭',
                noBtnText  : false
            }
        }
        if(mPop){
            mPop.open(opt);
        }
        return false;
    });
});
