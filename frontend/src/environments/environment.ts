// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  facebook: '2029381097343338',
  google: '641184484201-moggs3ittkjnumhnppg1equ9jlcsopav.apps.googleusercontent.com',
  apiUrl: 'http://localhost:8000/api/',
  api: {
    login: () => 'login',
    register: () => 'register',
    completeRegistration: () => 'complete-registration',
    emailAvailable: () => 'email-available',
    cities: () => 'cities',
    services: () => 'services',
    pendingServices: () => 'services/pending',
    search: () => 'search',
    attachService: (id) => 'services/' + id + '/attach-service',
    attachNewService: () => 'services/attach-new-service',
    detachService: (id) => 'services/' + id + '/detach-service',
    uploadPicture: () => 'users/picture',
    profile: (id) => 'users/' + id ,
    rating: (id) => 'users/' + id + '/rating',
    rate: (id) => 'users/' + id + '/rate',
    userProfile: () => 'users/user-profile',
    freelancerProfile: () => 'users/freelancer-profile',
    companyProfile: () => 'users/company-profile',
    userServices: () => 'users/services',
    picture: (pic) => '../storage/pictures/' + pic,
  }
};
