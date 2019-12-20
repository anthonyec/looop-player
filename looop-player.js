const DEFAULT_OPTIONS = {
  el: null,
  iframeUrl: 'player.html'
};

function oneTimeEvent(node, type, callback) {
  node.addEventListener(type, function (e) {
    e.target.removeEventListener(e.type, arguments.callee);
    return callback(e);
  });
}

class LooopPlayer {
  constructor(options) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };

    const iframe = document.createElement('iframe');

    iframe.src = this.options.iframeUrl;
    this.options.el.appendChild(iframe);

    this.iframe = iframe;

    this.iframe.addEventListener('load', () => {
      this.emitEvent('load');
    });
  }

  emitEvent(eventName) {
    // TODO: Add events
  }

  reload() {
    return new Promise((resolve, reject) => {
      this.iframe.contentWindow.location.reload();

      oneTimeEvent(this.iframe, 'load', () => {
        resolve();
      });
    });
  }

  async updateUserCode(code) {
    await this.reload();

    this.iframe.contentWindow.postMessage({
      type: 'updateUserCode',
      payload: code
    });
  }

  handleMessageReceived() {

  }
}
