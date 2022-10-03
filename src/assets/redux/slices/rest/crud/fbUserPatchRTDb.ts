import {fbSignedUserRTDbURL} from '../../../../globals';

export const fbUserPatchRTDb = async (patch: any) => {
  console.log(`${fbSignedUserRTDbURL}${patch.url}.json`);
  console.log(JSON.stringify(patch.data));

  const response = await fetch(`${fbSignedUserRTDbURL}${patch.url}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patch.data),
  });
  if (!response.ok) {
    const errorResponse = await response.text();
    const errorID = JSON.parse(errorResponse);
    throw new Error('Something went wrong' + errorID.error.message);
  }
  return await response.json();
};
