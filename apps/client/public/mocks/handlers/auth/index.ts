import { http, HttpResponse } from "msw";

export const getDashboardInfo = http.get(
  "/onboarding/members/me/dashboard",
  () => {
    const mockResponse = {
      member: {
        manageRole: "ADMIN",
        studyRole: "STUDENT",
      },
    };

    return HttpResponse.json(mockResponse);
  }
);
