var CssStyle = (function(W){
    var doc = W['document'], cssEl, sheet, ruleSet, css;

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
        this.style[prop] = val;
    };

    return css;
})(this);