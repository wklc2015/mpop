/**
 * zepto.mPop.js
 * */
BASE.namespace('BASE.COM.mPop');
BASE.COM.mPop = (function ($, win, doc) {
    var mUtile = BASE.COM.mUtils;

    function Mpop(ID) {
        this.options = {
            prefix    : 'mPop-',
            header    : '标题',
            noBtnText : '取消',
            yesBtnText: '确认'
        };
        this.events = {};
        this.initNodes(ID);
        this.initEvents();
    }

    Mpop.prototype = {
        Template  : function (options) {
            var opt = $.extend({}, this.options, options);
            this.html = '<ul>';
            opt['header'] && (this.html += '<li class="' + opt.prefix + 'Header">' + opt.header + '</li>');
            this.html += '<li class="' + opt.prefix + 'Content">';
            opt['text'] && (this.html += '<p class="' + opt.prefix + 'TipsText">' + opt.text + '</p>');
            opt['type'] && (this.html += '<input type="' + opt.type + '" placeholder="' + (opt['placeholder'] ? opt.placeholder : '') + '" maxlength="50" />');
            this.html += '</li><li class="' + opt.prefix + 'Footer">';
            opt['noBtnText'] && (this.html += '<span data-mPop="mPopBtn" class="' + opt.prefix + 'CancelBtn">' + opt.noBtnText + '</span>');
            opt['yesBtnText'] && (this.html += '<span data-mPop="mPopBtn" class="' + opt.prefix + 'ConfirmBtn">' + opt.yesBtnText + '</span>');
            this.html += '</li></ul>';
        },
        on        : function (type, fn) {
            if (!this.events[type]) {
                this.events[type] = [];
            }
            this.events[type].push(fn);
        },
        off       : function (type, fn) {
            if (this.events[type]) {
                var index = this.events[type].indexOf(fn);
                if (index > -1) {
                    this.events[type].splice(index, 1);
                }
            }
        },
        execEvent : function (type) {
            var that = this;
            if (this.events[type]) {
                for (var i = 0, l = this.events[type].length; i < l; i++) {
                    this.events[type][i].apply(this, [].slice.call(arguments, 1));
                }
            }
        },
        initNodes : function (ID) {
            this.container = doc.createElement('div');
            this.container.id = ID;
            this.container.className = this.options.prefix + 'Container';
            doc.body.appendChild(this.container);
            this.$container = $(this.container);
        },
        _setEvents: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = e.target;
            var $target = $(target);
            if(target.tagName.toUpperCase() === 'SPAN' && $target.hasClass(this.options.prefix + 'ConfirmBtn')){
                this.execEvent('yes');
                this.close();
            }else if(target.tagName.toUpperCase() === 'SPAN' && $target.hasClass(this.options.prefix + 'CancelBtn')){
                this.execEvent('no');
                this.close();
            }
            return false;
        },
        initEvents: function () {
            this.$container.on(mUtile.eventName.tap, 'span[data-mPop="mPopBtn"]', $.proxy(this._setEvents, this));
            this.$container.on('touchmove', function () {
                return false;
            });
        },
        open      : function (options) {
            this.Template(options);
            if(this.container){
                this.$container.addClass('show');
                this.container.innerHTML = this.html;
            }
        },
        close     : function (speed) {
            var that = this;
            var time = speed || 400;
            this.$container.addClass('close');
            setTimeout(function () {
                that.$container.removeClass('show close');
            }, time);
        }
    };
    var init = function (ID) {
        return new Mpop(ID);
    };
    return {
        init: init
    };
}(Zepto, window, document));