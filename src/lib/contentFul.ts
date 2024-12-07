import * as contentful from 'contentful';

import { envVars } from '@/configs/env';

const Client = contentful.createClient({
  space: envVars.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: envVars.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  environment: envVars.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
});

export default Client;
