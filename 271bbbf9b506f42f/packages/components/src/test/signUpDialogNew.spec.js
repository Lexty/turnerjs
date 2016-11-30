define([
        'react',
        'testUtils',
        'lodash',
        'core',
        'components/components/dialogs/siteMemberDialogs/signUpDialog/signUpDialog',
        'reactDOM'
    ],
    function (React, testUtils, _, core, signUpDialog, ReactDOM) {
        'use strict';

        function createComponent(props) {
            return testUtils.getComponentFromDefinition(signUpDialog, props);
        }

        function mockThemeStyle(props) {
            props.compTheme = {
                style: {
                    properties: {
                        "alpha-bg": "1",
                        "alpha-bgh": "1",
                        "alpha-brd": "1",
                        "alpha-brdh": "1",
                        "alpha-txt": "1",
                        "alpha-txth": "1",
                        "bg": "color_9",
                        "bgh": "color_4",
                        "boxShadowToggleOn-shd": "false",
                        "brd": "color_4",
                        "brdh": "color_4",
                        "brightness-bg": "0",
                        "brightness-bgh": "0",
                        "brightness-brd": "0",
                        "brightness-brdh": "0",
                        "brightness-txt": "0",
                        "brightness-txth": "0",
                        "brw": "0",
                        "fnt": "font_8",
                        "rd": "0px",
                        "saturation-bg": "0",
                        "saturation-bgh": "0",
                        "saturation-brd": "0",
                        "saturation-brdh": "0",
                        "saturation-txt": "0",
                        "saturation-txth": "0",
                        "shd": "0 1px 4px rgba(0, 0, 0, 0.6);",
                        "txt": "color_8",
                        "txth": "color_10"
                    }
                }
            };
        }

        describe('signUpDialog component', function () {
            var props = {};
            var comp;
            beforeEach(function () {
                testUtils.experimentHelper.openExperiments('newLoginScreens');
                spyOn(core.compMixins.animationsMixin, 'sequence').and.callFake(testUtils.mockSequence);
                props = testUtils.mockFactory.mockPropsWithSiteDataAndFont();
                mockThemeStyle(props);
                _.assign(props, {
                    skin: 'wysiwyg.viewer.skins.dialogs.siteMembersDialogs.signUpDialogSkinNew',
                    language: 'en',
                    onSubmitCallback: jasmine.createSpy('onSubmitCallback'),
                    onCloseDialogCallback: jasmine.createSpy('onCloseDialogCallback'),
                    onSwitchDialogLinkClick: jasmine.createSpy('onSwitchDialogLinkClick'),
                    needLoginMessage: true
                });
                props.structure.componentType = 'wysiwyg.viewer.components.dialogs.siteMemberDialogs.SignUpDialog';

                comp = createComponent(props);
            });

            describe("closing options", function () {
                it("should not have cancel and xButton skin properties if props.notClosable is set", function () {
                    props.notClosable = true;
                    comp = createComponent(props);
                    var skinPropertiesKeys = _.keys(comp.getSkinProperties());
                    expect(skinPropertiesKeys).not.toContainAny(['cancel', 'xButton']);
                });
                it("blocking layer should not have an onClick if props.notClosable is set", function () {
                    props.notClosable = true;
                    comp = createComponent(props);
                    var skinProperties = comp.getSkinProperties();
                    expect(skinProperties.blockingLayer.onClick).not.toBeDefined();
                });
            });

            describe('validateBeforeSubmit', function () {

                beforeEach(function () {
                    comp.refs.emailInput.setState({value: 'a@a.com'});
                    comp.refs.passwordInput.setState({value: '1234'});
                    comp.refs.retypePasswordInput.setState({value: '1234'});
                });

                it('should fail when email is not well formatted', function () {
                    comp.refs.emailInput.setState({value: 'a@'});
                    expect(comp.validateBeforeSubmit()).toBeFalsy();
                });

                it('should fail when passwordInput length is less than 4', function () {
                    comp.refs.passwordInput.setState({value: '123'});
                    expect(comp.validateBeforeSubmit()).toBeFalsy();
                });

                it('should fail when passwordInput length is more than 15', function () {
                    comp.refs.passwordInput.setState({value: '1234567890123456'});
                    expect(comp.validateBeforeSubmit()).toBeFalsy();
                });

                it('should fail when retypePasswordInput length is less than 4', function () {
                    comp.refs.retypePasswordInput.setState({value: '123'});
                    expect(comp.validateBeforeSubmit()).toBeFalsy();
                });

                it('should fail when retypePasswordInput length is more than 15', function () {
                    comp.refs.retypePasswordInput.setState({value: '1234567890123456'});
                    expect(comp.validateBeforeSubmit()).toBeFalsy();
                });

                it('should fail when retypePasswordInput is different passwordInput', function () {
                    comp.refs.passwordInput.setState({value: '1234'});
                    comp.refs.retypePasswordInput.setState({value: '12345'});
                    expect(comp.validateBeforeSubmit()).toBeFalsy();
                });

                it('should pass when all three are valid', function () {
                    comp.refs.emailInput.setState({value: 'a@a.com'});
                    comp.refs.passwordInput.setState({value: '1234'});
                    comp.refs.retypePasswordInput.setState({value: '1234'});
                    expect(comp.validateBeforeSubmit()).toBeTruthy();
                });

            });

            describe('getDataToSubmit', function () {
                it('should return an object with a "password" and "email" properties', function () {
                    comp.refs.emailInput.setState({value: 'a@a.com'});
                    comp.refs.passwordInput.setState({value: '1234'});
                    var data = comp.getDataToSubmit();
                    expect(data).toEqual({'email': 'a@a.com', 'password': '1234'});
                });
            });

            describe('getSkinProperties', function () {
                it('should return the correct skin properties', function () {
                    var skinProperties = comp.getSkinProperties();
                    expect(skinProperties.title.children).toEqual("Sign up");
                    expect(skinProperties.okButton.children.props.structure.componentType).toEqual('wysiwyg.viewer.components.SiteButton');
                    expect(skinProperties.cancel.children).toEqual("Cancel");
                    expect(skinProperties.switchDialogLink.children).toEqual("log in");
                    expect(skinProperties.errMsg.children).toEqual("");
                    expect(skinProperties.email.children.props.label).toEqual('Email');
                    expect(skinProperties.password.children.props.label).toEqual('Password');
                    expect(skinProperties.retypePassword.children.props.label).toEqual('Retype password');
                    expect(skinProperties.blockingLayer).toBeDefined();
                    expect(skinProperties.xButton).toBeDefined();
                    expect(skinProperties.infoTitle.children).toEqual("To view this page, you need to be logged in.");
                    expect(skinProperties.note.children).toEqual("I'm already a user,");
                });

                it('should not show infoTitle if needLoginMessage==false', function () {
                    var props2 = testUtils.mockFactory.mockPropsWithSiteDataAndFont();
                    mockThemeStyle(props2);

                    _.assign(props2, {
                        skin: 'wysiwyg.viewer.skins.dialogs.siteMembersDialogs.signUpDialogSkinNew',
                        language: 'en',
                        onSubmitCallback: jasmine.createSpy('onSubmitCallback'),
                        onCloseDialogCallback: jasmine.createSpy('onCloseDialogCallback'),
                        onSwitchDialogLinkClick: jasmine.createSpy('onSwitchDialogLinkClick'),
                        needLoginMessage: false
                    });
                    props2.structure.componentType = 'wysiwyg.viewer.components.dialogs.siteMemberDialogs.SignUpDialog';

                    var comp2 = createComponent(props2);

                    var skinProperties = comp2.getSkinProperties();
                    expect(skinProperties.infoTitle.children).toEqual("");
                });
            });

            describe('GUI', function () {
                it('should activate onSwitchDialogLinkClick when the link is clicked', function () {
                    var buttonNode = ReactDOM.findDOMNode(comp.refs.switchDialogLink);
                    React.addons.TestUtils.Simulate.click(buttonNode);
                    expect(comp.props.onSwitchDialogLinkClick).toHaveBeenCalled();
                });

                it('should activate onSubmitCallback when the button is clicked, and the input is valid', function () {
                    comp.refs.emailInput.setState({value: 'a@a.com'});
                    comp.refs.passwordInput.setState({value: '1234'});
                    comp.refs.retypePasswordInput.setState({value: '1234'});
                    var buttonNode = ReactDOM.findDOMNode(comp.refs.okButton);
                    React.addons.TestUtils.Simulate.click(buttonNode);
                    expect(comp.props.onSubmitCallback).toHaveBeenCalled();
                });

                it('should not activate onSubmitCallback when the button is clicked, but the input is invalid', function () {
                    comp.refs.emailInput.setState({value: 'a@a.com'});
                    comp.refs.passwordInput.setState({value: '1234'});
                    comp.refs.retypePasswordInput.setState({value: '12345'});
                    var buttonNode = ReactDOM.findDOMNode(comp.refs.okButton);
                    React.addons.TestUtils.Simulate.click(buttonNode);
                    expect(comp.props.onSubmitCallback).not.toHaveBeenCalled();
                });

                it('should activate onCloseDialogCallback when the xButton is clicked', function () {
                    var buttonNode = ReactDOM.findDOMNode(comp.refs.xButton);
                    React.addons.TestUtils.Simulate.click(buttonNode);
                    expect(comp.props.onCloseDialogCallback).toHaveBeenCalled();
                });

                it('should not activate onCloseDialogCallback when the blockingLayer is clicked', function () {
                    var buttonNode = ReactDOM.findDOMNode(comp.refs.blockingLayer);
                    React.addons.TestUtils.Simulate.click(buttonNode);
                    expect(comp.props.onCloseDialogCallback).not.toHaveBeenCalled();
                });

            });

        });
    });
