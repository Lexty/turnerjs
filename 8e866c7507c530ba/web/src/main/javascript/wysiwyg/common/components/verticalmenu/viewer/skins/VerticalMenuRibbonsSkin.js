define.skin('wysiwyg.common.components.verticalmenu.viewer.skins.VerticalMenuRibbonsSkin', function(skinDefinition){
    /** @type core.managers.skin.SkinDefinition */
    var def = skinDefinition;

    def.inherits('core.managers.skin.BaseSkin2');

    def.iconParams({'description': 'Ribbons', 'iconUrl': 'images/wysiwyg/skinIcons/verticalmenu/ribbon.jpg', 'hidden': true, 'index': 5});

    def.skinParams([
        {'id':'fnt','type':Constants.SkinParamTypes.FONT,'defaultTheme':'font_1'},
        {'id':'SKINS_fntSubmenu','type':Constants.SkinParamTypes.FONT,'defaultTheme':'font_1'},

        {'id':'txt',  'type':Constants.SkinParamTypes.COLOR,'defaultTheme':'color_15'},
        {'id':'txth',  'type':Constants.SkinParamTypes.COLOR,'defaultTheme':'color_13'},
        {'id':'txts',  'type':Constants.SkinParamTypes.COLOR,'defaultTheme':'color_13'},

        {'id':'bg', 'type':Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme':'color_11'},
        {'id':'SKINS_bgSubmenu', 'type':Constants.SkinParamTypes.BG_COLOR, 'defaultTheme':'color_11'},
        {'id':'bgh', 'type':Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme':'color_15'},
        {'id':'bgs', 'type':Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme':'color_15'},

        // Fold
        {'id':'SKINS_foldh', 'type':Constants.SkinParamTypes.COLOR_ALPHA, 'defaultParam':'bgh', "mutators": ["brightness", 70 ], "noshow": true },
        {'id':'SKINS_folds', 'type':Constants.SkinParamTypes.COLOR_ALPHA, 'defaultParam':'bgs', "mutators": ["brightness", 70 ], "noshow": true },

        {'id':'rd',  'type':Constants.SkinParamTypes.BORDER_RADIUS, 'defaultValue':'0'},
        {'id':'SKINS_submenuBR',  'type':Constants.SkinParamTypes.BORDER_RADIUS, 'defaultValue':'0'},
        {'id':'rdTop', 'type':Constants.SkinParamTypes.BORDER_RADIUS, mutators:['square',['br','bl']], 'defaultParam': 'rd'},
        {'id':'rdBottom', 'type':Constants.SkinParamTypes.BORDER_RADIUS, mutators:['square',['tr','tl']], 'defaultParam': 'rd'},
        {'id':'dropDownRdTop', 'type':Constants.SkinParamTypes.BORDER_RADIUS, mutators:['square',['br','bl']], 'defaultParam': 'SKINS_submenuBR'},
        {'id':'dropDownRdBottom', 'type':Constants.SkinParamTypes.BORDER_RADIUS, mutators:['square',['tr','tl']], 'defaultParam': 'SKINS_submenuBR'},
        {'id':'SKINS_submenuMargin', 'type':Constants.SkinParamTypes.SIZE, 'defaultValue': '1px' },

        {'id':'textSpacing', 'type':Constants.SkinParamTypes.SIZE, 'defaultValue': '10px'},
        {'id':'subItemAlterAlignPad', 'type':Constants.SkinParamTypes.SIZE, 'mutators': [ 'increase', 7 ], 'defaultParam': 'textSpacing' },

        {'id':'shd','type':Constants.SkinParamTypes.BOX_SHADOW, 'defaultValue':'0 1px 4px rgba(0, 0, 0, 0.6);', "styleDefaults": { "boxShadowToggleOn": "false" }},

        {'id':'itemBGColorTrans','type':Constants.SkinParamTypes.TRANSITION,'defaultValue': 'background-color 0.4s ease 0s'},
        {'id':'subMenuOpacityTrans','type':Constants.SkinParamTypes.TRANSITION,'defaultValue': 'all 0.4s ease 0s'}
    ]);

    def.html(
        '<ul skinpart="menuContainer">' +
            '<li skinpart="menuItem" class="item">' +
                '<div class="ribbonWrapper">' +
                    '<span class="ribbon ribTop"></span>' +
                    '<span class="ribbon ribBottom"></span>' +
                    '<span class="ribFold"></span>' +
                '</div>' +
                '<div class="itemWrapper">' +
                    '<a></a>' +
                    '<ul class="subMenu">' +
                    '</ul>' +
                '</div>' +
            '</li>' +

            '<li skinpart="subMenuItem" class="item">' +
                '<a></a>' +
                '<ul></ul>' +
            '</li>' +
        '</ul>'
    );

    //God help you if you remove the space before the .label rules (this class is added by JS later)
    def.css([
        //General
        '%menuContainer% { padding: 0; margin: 0; height:100%; position: relative; [shd] [rd] }',
        '%menuContainer% .emptySubMenu { display: none!important; }',
        '%.item% { background-color: [bg]; margin: 0; position: relative; display: block; cursor:pointer; list-style: none; [itemBGColorTrans] }',
        ' .label { padding-left: [textSpacing]; padding-right: [textSpacing]; [fnt] color:[txt]; display: block; white-space: nowrap; text-overflow:ellipsis; overflow:hidden; }',
        '%.subMenu% .label { [SKINS_fntSubmenu] }',

        ' .itemWrapper { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }',

        //Ribbons
        ' .ribbonWrapper { display: none; width: 100%; position: absolute; top: 10px; bottom:10px; left: 0; }',

        'span { position: absolute; width: 105%; width:calc(100% + 10px); height: 50%; overflow:hidden; }',
        'span:after { width:100%; height:100%; position:absolute; content:""; border-width:1000px; border-color:transparent; border-style:solid; }',

        //Ribbons - Right
        '[state~="subMenuOpenSide-right"] .ribTop          { left: -10px; top: 0; }',
        '[state~="subMenuOpenSide-right"] .ribBottom       { left: -10px; bottom: 0; }',

        '[state~="subMenuOpenSide-right"] .ribTop:after    { top: 0;    right: 7px; border-top-color:    [bgh]; border-right-width: 500px; }',
        '[state~="subMenuOpenSide-right"] .ribBottom:after { bottom: 0; right: 7px; border-bottom-color: [bgh]; border-right-width: 500px; }',

        '[state~="subMenuOpenSide-right"] .ribFold { position: absolute; bottom: -9px; left: -10px; width: 0px; height: 0px; border-style: solid; border-width: 0 10px 10px 0; border-color: transparent [SKINS_foldh] transparent transparent; }',

        //Ribbons - Left
        '[state~="subMenuOpenSide-left"] .ribTop          { right: -10px; top: 0; }',
        '[state~="subMenuOpenSide-left"] .ribBottom       { right: -10px; bottom: 0; }',

        '[state~="subMenuOpenSide-left"] .ribTop:after    { top: 0;    left: 7px; border-top-color:    [bgh]; border-left-width: 500px; }',
        '[state~="subMenuOpenSide-left"] .ribBottom:after { bottom: 0; left: 7px; border-bottom-color: [bgh]; border-left-width: 500px; }',

        '[state~="subMenuOpenSide-left"] .ribFold { position: absolute; bottom: -9px; right: -10px; width: 0px; height: 0px; border-style: solid; border-width: 10px 10px 0 0; border-color: [SKINS_foldh] transparent transparent transparent; }',

        //Item hover style
        '%.item%:hover .ribbonWrapper { display: block; }',
        '%.item%:hover > .itemWrapper > .label { color:[txth]; }',
        '%.item%:hover .ribTop:after { border-top-color: [bgh]; }',
        '%.item%:hover .ribBottom:after { border-bottom-color: [bgh]; }',

        //Sub-Item hover style
        '%.subMenu% > %.item%:hover { background-color: [bgh]; [itemBGColorTrans] }',
        '%.subMenu% > %.item%:hover > .label { color:[txth]; }',


        //Item selected style (or its child)
        '%.item%.selected > .ribbonWrapper { display: block; }',
        '%.item%.selectedContainer > .ribbonWrapper { display: block; }',
        '%.item%.selected > .label { color:[txts]!important; }',
        '%.item%.selected > .itemWrapper > .label { color:[txts]; }',
        '%.item%.selectedContainer > .itemWrapper > .label { color:[txts]; }',
        '%.item%.selected > .ribbonWrapper > .ribTop:after { border-top-color: [bgs]; }',
        '%.item%.selected > .ribbonWrapper > .ribBottom:after { border-bottom-color: [bgs]; }',
        '%.item%.selectedContainer > .ribbonWrapper > .ribTop:after { border-top-color: [bgs]; }',
        '%.item%.selectedContainer > .ribbonWrapper > .ribBottom:after { border-bottom-color: [bgs]; }',
        '%.subMenu% > %.item%.selected { background-color: [bgs]; }',

        '[state~="subMenuOpenSide-left"] %.item%.selected > .ribbonWrapper > .ribFold { border-color: [SKINS_folds] transparent transparent transparent; }',
        '[state~="subMenuOpenSide-right"] %.item%.selected > .ribbonWrapper > .ribFold { border-color: transparent [SKINS_folds] transparent transparent; }',
        '[state~="subMenuOpenSide-left"] %.item%.selectedContainer > .ribbonWrapper > .ribFold { border-color: [SKINS_folds] transparent transparent transparent; }',
        '[state~="subMenuOpenSide-right"] %.item%.selectedContainer > .ribbonWrapper > .ribFold { border-color: transparent [SKINS_folds] transparent transparent; }',


        '[state~="items-align-left"] %.item% { text-align: left; }',
        '[state~="items-align-center"] %.item% { text-align: center; }',
        '[state~="items-align-right"] %.item% { text-align: right; }',

        '[state~="subItems-align-left"] %.subMenu% > %.item% { text-align: left; padding-left: [textSpacing]; padding-right: [subItemAlterAlignPad]; }',
        '[state~="subItems-align-center"] %.subMenu% > %.item% { text-align: center; }',
        '[state~="subItems-align-right"] %.subMenu% > %.item% { text-align: right; padding-left: [subItemAlterAlignPad]; padding-right: [textSpacing]; }',

        //Round corners to first and last elements
        '%.item%:first-child { [rdTop] }',
        '%.item%:last-child { [rdBottom]; }',

        //Hide sub-menus
        '%.subMenu% { z-index: 999; min-width:100%; opacity: 0; display: none; position: absolute; [subMenuOpacityTrans] [SKINS_bgSubmenu]; border: 0px solid transparent; [SKINS_submenuBR] [shd] }',
        '%.subMenu% %.item% { [SKINS_bgSubmenu]; }',
        '%.subMenu% %.item%:first-child { [dropDownRdTop]; }',
        '%.subMenu% %.item%:last-child { [dropDownRdBottom]; }',
        '%.subMenu% %.item%:first-child:last-child { [SKINS_submenuBR]; }', // only child

        //Show sub-menus on hover
        ' .itemWrapper:hover > %.subMenu% { opacity: 1; [subMenuOpacityTrans] display: block; }',

        //Sub-menu side open
        '[state~="subMenuOpenSide-right"] %.subMenu% { left: 100%; float: left; margin-left: [SKINS_submenuMargin]; }',
        '[state~="subMenuOpenSide-left"] %.subMenu% { right: 100%; float: right; margin-right: [SKINS_submenuMargin]; }',

        //Sub-menu open direction
        '[state~="subMenuOpenDir-down"] %.subMenu% { top: 0; }',
        '[state~="subMenuOpenDir-up"] %.subMenu% { bottom: 0; }',

        //This bridges the gap so you can mouse into the sub-menu without it disappearing
        '%.subMenu%:before { content: " "; display: block; width: [SKINS_submenuMargin]; height: 100%; position: absolute; top: 0; }',
        '[state~="subMenuOpenSide-right"] %.subMenu%:before { left: 0; margin-left: -[SKINS_submenuMargin]; }',
        '[state~="subMenuOpenSide-left"] %.subMenu%:before { right: 0; margin-right: -[SKINS_submenuMargin]; }'
    ]);
});