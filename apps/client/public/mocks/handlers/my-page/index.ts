import { apiPath } from "constants/apiPath";
import { http, HttpResponse } from "msw";
import type { MyAccountInfoDto } from "types/dtos/members";

export const getMyAccountInfo = http.get<MyAccountInfoDto>(
  `${apiPath.members}/me/account-info`,
  () => {
    const mockResponse: MyAccountInfoDto = {
      name: "Test One",
      githubHandle: "SATISFIED",
    };

    return HttpResponse.json(mockResponse);
  }
);
