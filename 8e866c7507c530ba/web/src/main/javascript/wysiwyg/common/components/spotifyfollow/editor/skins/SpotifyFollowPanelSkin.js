define.skin('wysiwyg.common.components.spotifyfollow.editor.skins.SpotifyFollowPanelSkin', function(skinDefinition) {
    /** @type core.managers.skin.SkinDefinition */
    var def = skinDefinition;

    def.inherits('mobile.core.skins.BaseSkin');

    def.skinParams([
        {'id': '$BorderRadius', 'type': Constants.SkinParamTypes.BORDER_RADIUS, 'defaultValue': '5px'}
    ]);

    def.compParts({
        searchLabel: {skin: Constants.PanelFields.Label.skins["default"]},
        searchBtn: {skin: Constants.PanelFields.ButtonField.skins["blueWithArrow"]},
        enterUriLink: {skin: Constants.PanelFields.InlineTextLinkField.skins["default"]},
        inputLabel: {skin: Constants.PanelFields.Label.skins["spotify"]},
        uriInput: {skin: Constants.PanelFields.SubmitInput.skins["default"]},
        setSize: {skin: Constants.PanelFields.ComboBox.skins["default"]},
        setTheme: {skin: Constants.PanelFields.ComboBox.skins["default"]},
        toggleFollowersCount: {skin: Constants.PanelFields.CheckBox.skins["default"]},
        addAnimation: {skin: Constants.PanelFields.ButtonField.skins.withArrow}
    });

    def.html(
        '<div skinPart="content">' +
            '<fieldset>' +
                '<div skinpart="searchLabel"></div>' +
                '<div skinpart="searchBtn"></div>' +
                '<div skinpart="enterUriLink"></div>' +
                '<div skinpart="inputLabel" class="hidden"></div>' +
                '<div skinpart="uriInput" class="hidden"></div>' +
            '</fieldset>' +
                '<fieldset skinpart="settingsPanel">' +
                '<div skinpart="setSize"></div>' +
                '<br>' +
                '<div skinpart="setTheme"></div>' +
                '<br>' +
                '<div skinpart="toggleFollowersCount"></div>' +
            '</fieldset>' +
            '<fieldset>' +
                '<div skinpart="addAnimation"></div>' +
            '</fieldset>' +
        '</div>'
    );

    def.css([
        'fieldset { background:#fff; padding:10px; border:1px solid #e6e6e6; border-top:1px solid #ccc; margin-bottom:6px; [$BorderRadius]}',
        '%enterUriLink% { margin: 13px 0 5px 0; }'

    ]);
});