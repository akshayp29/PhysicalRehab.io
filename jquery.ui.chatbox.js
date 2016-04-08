/*
 * Creates a chat box widget
 */
(function($) {
    $.widget("ui.chatbox", {
        options: {
            id: null, //id for the DOM element
            title: null, // title of the chatbox
            user: null, // can be anything associated with this chatbox
            hidden: false,
            right_offset: 0, // relative to right edge of the browser window
            bottom_offset: 0, // relative to the bottom edge of the browser window
            width: 300, // width of the chatbox

            messageSent: function(id, user, msg) {
                this.boxManager.addMsg(user.first_name, msg);
            },

            boxManager: {
                init: function(elem) {
                    this.elem = elem;
                },
                addMsg: function(peer, msg) {
                    var self = this;
                    var box = self.elem.uiChatboxLog;
                    var e = document.createElement('div');
                    box.append(e);
                    $(e).hide();

                    var systemMessage = false;

                    if (peer) {
                        var peerName = document.createElement("b");
                        $(peerName).text(peer + ": ");
                        e.appendChild(peerName);
                    } else {
                        systemMessage = true;
                    }

                    var msgElement = document.createElement(
                        systemMessage ? "i" : "span");
                    $(msgElement).text(msg);
                    e.appendChild(msgElement);
                    $(e).addClass("ui-chatbox-msg");
                    $(e).css("maxWidth", $(box).width());
                    $(e).fadeIn();
                    self._scrollToBottom();

                    // if (!self.elem.uiChatboxTitlebar.hasClass("ui-state-focus") && !self.highlightLock) {
                    //     self.highlightLock = true;
                    //     self.highlightBox();
                    // }
                },
                // highlightBox: function() {
                //     var self = this;
                //     self.elem.uiChatboxTitlebar.effect("highlight", {}, 300);
                //     self.elem.uiChatbox.effect("bounce", {times: 3}, 300, function() {
                //         self.highlightLock = false;
                //         self._scrollToBottom();
                //     });
                // },
                _scrollToBottom: function() {
                    var box = this.elem.uiChatboxLog;
                    box.scrollTop(box.get(0).scrollHeight);
                }
            }
        },

        widget: function() {
            return this.uiChatbox
        },
        _create: function() {
            var self = this,
            options = self.options,
            title = options.title || "No Title",

            // Chatbox
            uiChatbox = (self.uiChatbox = $('<div></div>'))
                .appendTo(document.body)
                .addClass('ui-widget ' +
                          'ui-corner-top ' +
                          'ui-chatbox'
                         )
                .attr('outline', 0)

            // Titlebar
            uiChatboxTitlebar = (self.uiChatboxTitlebar = $('<div></div>'))
                .addClass('ui-widget-header ' +
                          // 'ui-corner-top ' +
                          'ui-chatbox-titlebar '
                          // +'ui-dialog-header' // take advantage of dialog header style
                         )
                .appendTo(uiChatbox),

            uiChatboxTitle = (self.uiChatboxTitle = $('<span></span>'))
                .html(title)
                .appendTo(uiChatboxTitlebar),


            // Content
            uiChatboxContent = (self.uiChatboxContent = $('<div></div>'))
                .addClass('ui-widget-content ' +
                          'ui-chatbox-content '
                         )
                .appendTo(uiChatbox),

            uiChatboxLog = (self.uiChatboxLog = self.element)
                .addClass('ui-widget-content ' +
                          'ui-chatbox-log'
                         )
                .appendTo(uiChatboxContent),

            uiChatboxInput = (self.uiChatboxInput = $('<div></div>'))
                .addClass('ui-widget-content ' +
                          'ui-chatbox-input'
                         )
                .appendTo(uiChatboxContent),

            uiChatboxInputBox = (self.uiChatboxInputBox = $('<textarea></textarea>'))
                .addClass('ui-widget-content ' +
                          'ui-chatbox-input-box ' +
                          'ui-corner-all'
                         )
                .appendTo(uiChatboxInput)
                .keydown(function(event) {
                    if (event.keyCode && event.keyCode == $.ui.keyCode.ENTER) {
                        msg = $.trim($(this).val());
                        if (msg.length > 0) {
                            self.options.messageSent(self.options.id, self.options.user, msg);
                        }
                        $(this).val('');
                        return false;
                    }
                })
                .focusin(function() {
                    uiChatboxInputBox.addClass('ui-chatbox-input-focus');
                    var box = $(this).parent().prev();
                    box.scrollTop(box.get(0).scrollHeight);
                })
                .focusout(function() {
                    uiChatboxInputBox.removeClass('ui-chatbox-input-focus');
                });

                uiChatbox.children().click(function() {
                self.uiChatboxInputBox.focus();
            });

            self._setWidth(self.options.width);
            self._position(self.options.right_offset, self.options.bottom_offset);

            self.options.boxManager.init(self);

            if (!self.options.hidden) {
                uiChatbox.show();
            }
        },
        // _setOption: function(option, value) {
        //     if (value != null) {
        //         switch (option) {
        //         case "hidden":
        //             if (value)
        //                 this.uiChatbox.hide();
        //             else
        //                 this.uiChatbox.show();
        //             break;
        //         case "offset":
        //             this._position(value);
        //             break;
        //         case "width":
        //             this._setWidth(value);
        //             break;
        //         }
        //     }
        //     $.Widget.prototype._setOption.apply(this, arguments);
        // },

        _setWidth: function(width) {
            this.uiChatboxTitlebar.width(width + "px");
            this.uiChatboxLog.width(width + "px");
            this.uiChatboxInput.css("maxWidth", width + "px");
            this.uiChatboxInputBox.css("width", (width - 18) + "px");
        },

        _position: function(right_offset, bottom_offset) {
            this.uiChatbox.css("right", right_offset);
            this.uiChatbox.css("bottom", bottom_offset);

        }
    });
}(jQuery));
