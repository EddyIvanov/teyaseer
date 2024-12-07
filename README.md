This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Setup `.npmrc` for installing packages from artifacts

#### For windows

Run vsts-npm-auth to get an Azure Artifacts token added to your user-level .npmrc file

```bash
vsts-npm-auth -config .npmrc
```

#### For other OS

1. open terminal and goto the user's root folder by following command:

```bash
cd $HOME
```

OR

```bash
cd ~
```

2. create a `.npmrc` file there and paste the following code there

```bash
; begin auth token
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/registry/:username=Teyaseer
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/registry/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/:username=Teyaseer
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
```

3. Generate a [Personal Access Token](https://dev.azure.com/Teyaseer/_details/security/tokens) with Packaging read & write scopes.

4. Base64 encode the **Personal Access Token** from the step 3.
   ex:https://www.base64encode.org/

5. Replace both [BASE64_ENCODED_PERSONAL_ACCESS_TOKEN] values in your user `.npmrc` file with your personal access token from Step 4.

6. run command from the project directory:

```bash
yarn install
```

### Setup `.npmrc` for installing packages from artifacts

#### For windows

Run vsts-npm-auth to get an Azure Artifacts token added to your user-level .npmrc file

```bash
vsts-npm-auth -config .npmrc
```

#### For other OS

1. open terminal and goto the user's root folder by following command:

```bash
cd $HOME
```

OR

```bash
cd ~
```

2. create a `.npmrc` file there and paste the following code there

```bash
; begin auth token
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/registry/:username=Teyaseer
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/registry/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/:username=Teyaseer
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]
//pkgs.dev.azure.com/Teyaseer/_packaging/Teyaseer-ML/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
```

3. Generate a [Personal Access Token](https://dev.azure.com/Teyaseer/_details/security/tokens) with Packaging read & write scopes.

4. Base64 encode the **Personal Access Token** from the step 3.
   ex:https://www.base64encode.org/

5. Replace both [BASE64_ENCODED_PERSONAL_ACCESS_TOKEN] values in your user `.npmrc` file with your personal access token from Step 4.

6. run command from the project directory:

```bash
yarn install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting started with https / proxy server for local development

If you want to run the application in https do the following:

1. Install the dependencies

```bash
yarn install
```

2. Edit your `/etc/hosts` (for mac user) or `System32\Drivers\etc\hosts` (for windows user) file to point your localhost (e.g. 127.0.0.1) with your `https-config.json` file's hostname.

Example: hosts file

```bash
127.0.0.1 qa.teyaseer.ae
```

Example: https-config.json file

```bash
{
  "localhost-proxy": {
    "source": 443,
    "target": 3000,
    "hostname": "qa.teyaseer.ae",
    "key": "localhost.key",
    "cert": "localhost.cert"
  }
}
```

3. Update your env files `NEXT_PUBLIC_BASE_URL` with `https://`
   Example:

```bash
NEXT_PUBLIC_BASE_URL=https://qa.teyaseer.ae
```

4. Then run the development server:

```bash
yarn dev:https
```

and open the application on your browser with the base URL `https://qa.teyaseer.ae`

[NB: As this project requires authentication with UAEPass and Forgerock it has to be run on ```https```]

## UAE Pass staging app enrollment:

1. Download the staging apps from here [https://docs.uaepass.ae/resources/staging-apps](https://docs.uaepass.ae/resources/staging-apps)
2. Sign up as usual (visitor or resident)
   Go to [https://stg-selfcare.uaepass.ae/](https://stg-selfcare.uaepass.ae/), click on `developers`, and login (enter your email address, and approve the notification on the stage UAE Pass app)
3. After login, click on `"Upgrade"` to go here [https://stg-selfcare.uaepass.ae/upgrade](https://stg-selfcare.uaepass.ae/upgrade)
4. On the page you can change all of your account's attributes, mainly: \
   a. Profile Type: Change to "Citizen or Resident" if it's "Visitor" \
   b. User Type: Change to SOP3 \
   c. IDN: Change to any of the test Emirates ID Numbers in a customer account on Salesforce \
   d. Nationality: U.A.E

5. Hit `update`, `re-login`, and go back to the `Upgrade page`.
6. Then click on `"Set Sign Credentials"` in the upper right corner, and create signing certificates for both `"Qualified"` and `"Advanced"`

Note: Every time you change your IDN to test another use case (Eligible, "Slightly eligible", "Not eligible"), you'll have to re-create the sign credentials again

## If auth fails in Google Chrome / Safari:

See the Forgerock SDK [troubleshooting](https://backstage.forgerock.com/docs/sdks/latest/sdks/troubleshooting.html#how_do_i_enable_platform_authenticators_in_safari_ios_and_macos)
