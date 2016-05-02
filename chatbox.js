/*
 * Creates a chat box widget
 */
(function($) {
    $.widget("ui.chatbox", {
        options: {
            id: null, //id for the DOM element
            title: null, // title of the chatbox
            user: null, // can be anything associated with this chatbox

            messageSent: function(id, user, msg) {
                this.boxManager.addMsg(user.first_name, msg);
            },

            boxManager: {
                init: function(elem) {
                    this.elem = elem;
                },
                addMsg: function(peer, msg, time_sent) {
                    var self = this;
                    var box = self.elem.uiChatboxLog;
                    var e = document.createElement('div');

                    var container = document.createElement("div");
                    $(container).addClass("container");

                    box.append(container);
                    container.appendChild(e);

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

                    var timestamp = document.createElement("div");
                    $(timestamp).addClass("timestamp");
                    $(timestamp).text(time_sent);
                    container.appendChild(timestamp);

                    $(e).addClass("ui-chatbox-msg");
                    $(e).css("fontSize", "16px");
                    // $(e).css("maxWidth", $(box).width() - 30);
                    $(e).fadeIn();
                    self._scrollToBottom();

                },

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
                .appendTo($( '#messages' ))
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
                .addClass('ui-chatbox-title')
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

            uiChatboxInputBox = (self.uiChatboxInputBox = $('<textarea placeholder="Press Enter to send"></textarea>'))
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

            self.options.boxManager.init(self);
        },

        _setWidth: function(width) {
            this.uiChatboxTitlebar.width(width + "px");
            this.uiChatboxLog.width(width + "px");
            this.uiChatboxInput.css("maxWidth", width + "px");
            this.uiChatboxInputBox.css("width", (width - 18) + "px");
        }
    });
}(jQuery));
