const TokenStore = {
  instnace: null,
  token: null,
  getInstance: function () {
    if (!this.instnace) {
      this.instnace = {
        setToken: (token) => (this.token = token),
        getToken: () =>{
          console.log("request token ", this.token);
        return this.token
        }
      };
    }

    return this.instnace;
  },
};

export default TokenStore;
