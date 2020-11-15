import angular from 'angular';

angular.module('portainer.azure').component('azureEndpointConfig', {
  bindings: {
    applicationId: '=',
    tenantId: '=',
    authenticationKey: '=',
  },
  templateUrl: './azure-endpoint-config.html',
});
