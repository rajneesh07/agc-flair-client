/********************************
 * Misc Utility Function
 * *******************************/
export default {
  async getIpAddressForClient() {
    console.log("getIpAddressForClient() function entered");

    return new Promise(r => {
      var w = window,
        a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }),
        b = () => {};
      a.createDataChannel("");
      a.createOffer(c => a.setLocalDescription(c, b, b), b);
      a.onicecandidate = c => {
        try {
          c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r);
        } catch (e) {
          console.error(e);
        }
      };
    });
  },

  getTimerName(timerId, timerType) {
    return timerType + "_" + timerId;
  },

  getValueByKey(data, keyName, key, valName) {
    var i,
      len = data.length;

    for (i = 0; i < len; i++) {
      if (data[i][keyName] === key) {
        return data[i][valName];
      }
    }

    return null;
  },

  getFuncName() {
    return this.caller.name;
  },
  encodeQueryData(data) {
    const ret = [];
    for (let d in data) ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }
};
