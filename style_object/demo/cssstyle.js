var CssStyle = (function(W){
    var doc = W['document'], detect = bs.detectWindow( this, {} ), bStyle = doc.createElement('div').style,
        cssEl, sheet, ruleSet, css, stylePrefix;

    cssEl = doc.createElement('style');
    doc.getElementsByTagName('head')[0].appendChild(cssEl);

    sheet = cssEl.styleSheet || cssEl.sheet;
    ruleSet = sheet.cssRules || sheet.rules;

    var index, add, remove;

    index = function(sel){
        var i = 0, j = ruleSet.length, k;
        for( ; i < j; i++ ){
            if( ruleSet[k = i].selectorText.toLowerCase() == sel ||
                ruleSet[k = j - i - 1].selectorText.toLowerCase() == sel ){
                return k;
            }
        }
    };

    if( sheet.insertRule ){
        add = function(sel){
            sheet.insertRule( sel + '{}', ruleSet.length );
        };
        remove = function(sel){
            sheet.deleteRule( index(sel) );
        };
    }else{
        add = function(sel){
            sheet.addRule( sel, ' ' );
        };
        remove = function(sel){
            sheet.removeRule( index(sel) );
        }
    }

    switch( detect.browser ){
        case'ie': stylePrefix = 'ms'; break;
        case'firefox': stylePrefix = 'Moz'; break;
        case'opera': stylePrefix = 'O'; break;
        default: stylePrefix = 'webkit';
    }

    css = function(sel){
        add(sel);
        this.selector = sel;
        this.rule = ruleSet[ruleSet.length - 1];
        this.style = this.rule.style;
    };

    css.prototype.destroy = function(){
        remove(this.selector);
        this.style = this.rule = this.selector = null;
    };

    css.prototype.set = function( prop, val ){
        if( prop == 'opacity' && !( 'opacity' in bStyle ) ){
            this.style['filter'] = 'alpha(opacity=' + parseInt( val * 100 ) + ')';
            return;
        }

        var t0 = prop.replace( /-[a-z]/g, function(_0){return _0.charAt(1).toUpperCase();});

        if( prop in bStyle || ( t0 = stylePrefix + t0.charAt(0).toUpperCase() + t0.substr(1) ) in bStyle ){
            this.style[t0] = val;
        }
    };

    return css;
})(this);