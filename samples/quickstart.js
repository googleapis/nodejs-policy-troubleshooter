// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict';
const {authenticate} = require('@google-cloud/local-auth');
const keyfilePath =
  '/Users/sofialeon/Downloads/client_secret_204535198706-a44qeclp37upo4oedm3p46ksckt6k587.apps.googleusercontent.com (1).json';
async function main(principal, fullResourceName, permission) {
  // [START nodejs_policy_troubleshooter_quickstart]
  // Imports the Google Cloud client library

  // eslint-disable-next-line node/no-missing-require
  const {IamCheckerClient} = require('@google-cloud/policy-troubleshooter');

  // TODO(developer): replace with your prefered project ID.
  // const projectId = 'my-project'

  const options = {
    keyfilePath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  };

  // Creates a client
  const client = new IamCheckerClient(authenticate(options));

  async function doSomething() {
    const policy = await client.troubleshootIamPolicy({
      accessTuple: {
        principal,
        fullResourceName,
        permission,
      },
    });
    console.log(policy);
  }
  doSomething();
  // [END nodejs_policy_troubleshooter_quickstart]
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
