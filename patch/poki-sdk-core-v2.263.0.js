(() => {
    // Motor falso do PokiSDK Core para evitar tela preta e conexões externas
    var FakeCore = function() {
        this.init = function() {
            return Promise.resolve();
        };
        this.initWithVideoHB = function() {
            return Promise.resolve();
        };
      this.commercialBreak = function(callback) {
    if (typeof callback === 'function') {
        callback();
    }
    return Promise.resolve();
};

this.rewardedBreak = function(callback) {
    if (typeof callback === 'function') {
        callback(true);
    }
    return Promise.resolve(true);
};

        this.getLeaderboard = function() {
            return Promise.resolve();
        };
        this.getSharableURL = function() {
            return Promise.resolve(window.location.href);
        };
        this.getURLParam = function() {
            return "";
        };
        this.isAdBlocked = function() {
            return false;
        };
        this.captureError = function(err) {
            console.debug("Erro ignorado pelo Stub:", err);
        };
    };

    // Aplica as funções vazias nos métodos que o jogo costuma chamar
    var coreInstance = new FakeCore();
    window.PokiSDK = window.PokiSDK || {};
    
    Object.keys(coreInstance).forEach(function(key) {
        window.PokiSDK[key] = coreInstance[key];
    });

    // Eventos de ciclo de carregamento e gameplay que não precisam fazer nada
    var emptyMethods = [
        "disableProgrammatic", "gameLoadingStart", "gameLoadingFinished", 
        "gameInteractive", "roundStart", "roundEnd", "muteAd",
        "setDebug", "gameplayStart", "gameplayStop", "gameLoadingProgress", 
        "happyTime", "setPlayerAge", "togglePlayerAdvertisingConsent", 
        "logError", "sendHighscore", "setDebugTouchOverlayController"
    ];

    emptyMethods.forEach(function(method) {
        window.PokiSDK[method] = function() { 
            // Apenas retorna vazio de forma segura
        };
    });

    console.log("PokiSDK Core Stub injetado com sucesso! Jogo liberado para rodar localmente.");
})();
