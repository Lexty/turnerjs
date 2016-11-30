define.skin('wysiwyg.common.components.singleaudioplayer.viewer.skins.SingleAudioPlayerSkin', function (skinDefinition) {
    /** @type core.managers.skin.SkinDefinition */
    var def = skinDefinition;

    def.inherits('core.managers.skin.BaseSkin2');

    def.iconParams({'description': 'Basic', 'iconUrl': '/images/wysiwyg/skinIcons/audio/EMP4.png', 'group': 'single', 'index': 0});

    def.skinParams([
        {'id': 'bg', 'type': Constants.SkinParamTypes.BG_COLOR, 'defaultTheme': 'color_13'},
        {'id': 'iconBG', 'type': Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme': 'color_13', 'noshow': true},

        {'id': 'brd', 'type': Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme': 'color_15'},
        {'id': 'dividers', 'type': Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme': 'color_15', 'noshow': true},
        {'id': 'audioIcons', 'type': Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme': 'color_21'},
        {'id': 'audioText', 'type': Constants.SkinParamTypes.COLOR, 'defaultTheme': 'color_11'},
        {'id': 'prog', 'type': Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme': 'color_21'},
        {'id': 'vol', 'type': Constants.SkinParamTypes.COLOR_ALPHA, 'defaultTheme': 'color_15'},

        {'id': 'rd', 'type': Constants.SkinParamTypes.BORDER_RADIUS, 'defaultValue': '0'},
        {'id': 'ird', 'type': Constants.SkinParamTypes.BORDER_RADIUS, 'defaultParam': 'rd', 'noshow': true},

        {'id': 'brw', 'type': Constants.SkinParamTypes.SIZE, 'defaultValue': '0', 'range': { 'min': 0, 'max': 10}},
        {'id': 'shd', 'type': Constants.SkinParamTypes.BOX_SHADOW, 'defaultValue': '0 1px 4px rgba(0, 0, 0, 0.6);'},

        {'id': 'pos', 'type': Constants.SkinParamTypes.OTHER, 'defaultValue': 'position: absolute; top: 0; bottom: 0; right: 0; left: 0; margin: auto;', 'noshow': true},
        {'id': 'selectable', 'type': Constants.SkinParamTypes.OTHER, 'defaultValue': '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;', 'noshow': true},
        {'id': 'themeDir', 'type': 'themeUrl', 'defaultTheme': 'THEME_DIRECTORY', 'name': ''}

    ]);

    def.html(
        '<div skinpart="player">' +
            '<div skinpart="info" class="font_9">' +
                '<span skinpart="trackLabel" class="track"></span>' +
                '<span skinpart="sep" class="visible"> - </span>' +
                '<span skinpart="artistLabel" class="artist"></span>' +
            '</div>' +
            '<div class="mediaControls" state="visible">' +
                '<div class="mediaButtons">' +
                    '<div skinpart="playBtn" class="button play"><a>play</a></div>' +
                    '<div skinpart="pauseBtn" class="button pause"><a>pause</a></div> ' +
                    '<div skinpart="repeatBtn" class="button repeat"><a>repeat</a></div> ' +
                '</div>' +
                '<div skinpart="progressbar">' +
                    '<div skinpart="bar"></div>' +
                    '<div skinpart="slider"></div>' +
                    '<div skinpart="handle"></div>' +
                '</div>' +
                '<div class="volumeControls">' +
                    '<div skinpart="volumeBtn" class="button unmuted"><a>volume</a></div>' +
                    '<ul skinpart="volumeScale">' +
                        '<li class="off">' +
                            '<div class="colorBlock"></div>' +
                            '<div class="colorBlank"></div>' +
                        '</li>' +
                        '<li class="off">' +
                            '<div class="colorBlock"></div>' +
                            '<div class="colorBlank"></div>' +
                        '</li>' +
                        '<li class="off">' +
                            '<div class="colorBlock"></div>' +
                            '<div class="colorBlank"></div>' +
                        '</li>' +
                        '<li class="off">' +
                            '<div class="colorBlock"></div>' +
                            '<div class="colorBlank"></div>' +
                        '</li>' +
                        '<li class="off">' +
                            '<div class="colorBlock"></div>' +
                            '<div class="colorBlank"></div>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
                '<span skinpart="durationOfTrack" class="duration font_10"><span skinpart="trackPosition"></span><span> / </span><span skinpart="trackDuration"></span></span>' +
            '</div>' +
        '</div>'
    );

    def.css([
        // DO NOT delete spaces before class selectors
        ' .hidden {display: none;}',
        ' .visible {display: inline;}',

        '{height: 60px; border: [brw] solid [brd]; [ird] [shd] [selectable]}',
        '[state~="mobile"] {height: 76px;}',
        '[state~="loading"] %player% {background:url([themeDir]gif_preloader.gif) center no-repeat;}',
        '[state~="loading"] %player% * {display: none;}',

        '%player% {min-width: 250px; min-height: 60px; overflow: hidden; [pos] [bg] [rd]}',
        '[state~="mobile"] %player% {min-height: 76px;}',

        '%player%:after {content: ""; position: absolute; top: -10px; bottom: -10px; right: -10px; left: -10px; overflow: hidden; z-index:-1; [bg]}',
        '%player% a {display: block; color: #fff; text-indent: -1000px; }',
        '%player% a:before, %player% a:after {margin: -8px 0 0; background-color: [audioIcons]; content: ""; position: absolute; top: 50%; left: 0;}',

        '%info% {color: [audioText]; padding: 0 10px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin: 10px 0 8px 0; display: block; min-height: 7px;}',

        ' .mediaControls {float: left; width: 100%;}',
        ' .mediaButtons {float: left; margin-left: 10px;}',

        ' .volumeControls {float: right; margin-right: 10px;}',
        '[state~="mobile"] .volumeControls {display: none;}',

        '%durationOfTrack% {color: [audioText]; text-align: center; min-width: 72px; float: right; margin-right: 4px;}',
        '[state~="mobile"] %durationOfTrack% {margin-right: 10px;}',

        '%trackPosition% {color: [audioText];}',
        '%trackDuration% {color: [audioText];}',

        '%artistLabel% {opacity: 0.5; filter: alpha(opacity=50); color: [audioText];}',
        '[state~="mobile"] %artistLabel% {float: left; width: 100%;}',

        '%trackLabel% {color: [audioText];}',
        '[state~="mobile"] %trackLabel% {float: left; width: 100%;}',

        '%sep% {color: [audioText];}',
        '[state~="mobile"] %sep% {display: none;}',

        ' .button {position: relative; overflow: hidden; float: left;}',
        ' .button:before, .button:after {content: ""; position: absolute; top: 50%; left: 0;}',

        '%playBtn% {width: 16px; height: 16px; margin: -1px 5px 0 0;}',
        '%playBtn% a:before {left: 0px; border: 8px solid transparent; border-width: 8px 12px; border-left-color: [audioIcons]; margin-top: -8px; background: transparent;}',

        '%pauseBtn% {width: 16px; height: 16px; margin: -1px 5px 0 0;}',
        '%pauseBtn% a:before {left: 0px; width: 4px; height: 14px; border: 4px solid [audioIcons]; border-width: 0 4px; margin-top: -7px; background: transparent;}',

        '%repeatBtn% {width: 16px; height: 18px; margin: -3px 5px 0 -2px;}',
        '%repeatBtn% a:before {left: 1px; width: 9px; height: 9px; border: 3px solid [audioIcons]; margin-top: -6px; background: transparent; border-radius: 16px;}',
        '%repeatBtn% a:after {left: 9px; border: 4px solid [iconBG]; [bg]; height: 2px; width: 2px; border-width: 5px 2px 5px 5px; border-left-color: [audioIcons]; border-top-color: transparent; border-bottom-color: transparent; border-right-color: transparent;margin: -9px 0 0;}',

        ' .unmuted {width: 20px; height: 20px;}',
        ' .unmuted a:before {left: -2px; border: 7px solid transparent; border-right-color: [vol]; margin-top: -7px; border-radius: 3px; background: transparent;}',
        ' .unmuted a:after {left: 4px; width: 4px; height: 6px; margin-top: -3px; background-color: [vol];}',
        ' .muted {width: 20px; height: 20px;}',
        ' .muted:before {width:16px; height:16px; border:1px solid [vol]; margin-top: -9px; border-radius:16px;}',
        ' .muted:after {width:18px; border-top:1px solid [vol]; -webkit-transform:rotate(-45deg); -moz-transform:rotate(-45deg); -ms-transform:rotate(-45deg); -o-transform:rotate(-45deg); transform:rotate(-45deg);}',
        ' .muted a:before {left: -2px; border: 7px solid transparent; border-right-color: [vol]; margin-top: -7px; border-radius: 3px; background: transparent;}',
        ' .muted a:after {left: 4px; width: 4px; height: 6px; margin-top: -3px; background-color: [vol];}',
        '%volumeBtn% {margin-top: -3px;}',

        'ul {padding: 0; list-style-type: none; height: 10px;}',
        '%volumeScale%, %volumeScale%.unmuted, %volumeScale%.muted {float: left; height: 10px; width: auto; margin: 2px 0 0 2px;}',
        '%volumeScale% li {width: 4px; height: 10px; display: inline; float: left; margin: 0; cursor: pointer;}',
        ' .colorBlock {background-color: [vol]; width: 2px; height: 10px; display: inline; float: left;}',
        ' .colorBlank {[bg]; width: 2px; height: 10px; display: inline; float: left;}',
        '%volumeScale% li.on .colorBlock {opacity: 1; filter: alpha(opacity=100);}',
        '%volumeScale% li.off .colorBlock {opacity: 0.3; filter: alpha(opacity=30);}',
        '%volumeScale%.muted li.on .colorBlock {opacity: 0.3; filter: alpha(opacity=30);}',

        '%progressbar% {position: absolute; left: 28px; right: 129px; height: 5px; margin: 5px 1px;}',
        '[state~="mobile"] %progressbar% {right: 88px;}',

        '%bar% {cursor: pointer; width: 100%; position: absolute; height: 5px; background-color: [prog]; opacity: 0.3; filter: alpha(opacity=30); box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);}',
        '%slider% {position: absolute; height: 5px; display: block; background-color: [prog]; overflow: hidden;}',
        '%slider%:after {content: ""; position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: 1; overflow: hidden;}',
        '%handle% {height: 5px; width: 5px; background-color: transparent; position: absolute; cursor: pointer;}',
        '%handle%:hover {background-color: [audioIcons]; opacity: 0.3}',

        '[state~="waiting"] %.play% {display: block;}',
        '[state~="waiting"] %.pause% {display: none;}',
        '[state~="waiting"] %.repeat% {display: none;}',

        '[state~="playing"] %.play% {display: none;}',
        '[state~="playing"] %.pause% {display: block;}',
        '[state~="playing"] %.repeat% {display: none;}',

        '[state~="pausing"] %.play% {display: block;}',
        '[state~="pausing"] %.pause% {display: none; }',
        '[state~="pausing"] %.repeat% {display: none;}',

        '[state~="stopped"] %.play% {display: block;}',
        '[state~="stopped"] %.pause% {display: none;}',
        '[state~="stopped"] %.repeat% {display: none;}',

        '[state~="repeat"] %.play% {display: none;}',
        '[state~="repeat"] %.pause% {display: none;}',
        '[state~="repeat"] %.repeat% {display: block;}'
    ]);
});