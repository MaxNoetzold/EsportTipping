import { Mock, afterEach, describe, expect, it, vi } from "vitest";

import { render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import getMeApi from "../../../../api/getMeApi";
import logoutApi from "../../../../api/logoutApi";

import UserAvatar from "../UserAvatar";

// Mock getMeApi and logoutApi as Jest mock functions
vi.mock("../../../../api/getMeApi", () => {
  return { default: vi.fn() };
});
const getMeApiMock = getMeApi as Mock;

vi.mock("../../../../api/logoutApi", () => {
  return { default: vi.fn() };
});
const logoutApiMock = logoutApi as Mock;

const getMeApiMockData = {
  discordUserId: "148464331959304192",
  avatar: "d550aa28e9e5601fecc2e9f05fb8ce0d",
};

const queryClient = new QueryClient();

describe("UserAvatar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders LoginButton when there is no user data", async () => {
    getMeApiMock.mockResolvedValueOnce(null);

    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <UserAvatar />
      </QueryClientProvider>
    );

    await waitFor(() => getByRole("button", { name: /login/i }));
  });

  it("renders user avatar when there is user data", async () => {
    getMeApiMock.mockResolvedValueOnce({ ...getMeApiMockData });

    const { getByAltText } = render(
      <QueryClientProvider client={queryClient}>
        <UserAvatar />
      </QueryClientProvider>
    );

    await waitFor(() => getByAltText("User Avatar"));
    expect(getMeApi).toHaveBeenCalledOnce();
  });

  it("calls logoutApi when logout is clicked", async () => {
    const user = userEvent.setup();

    getMeApiMock.mockResolvedValueOnce({ ...getMeApiMockData });
    logoutApiMock.mockResolvedValueOnce({ message: "success" });

    const { getByAltText, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <UserAvatar />
      </QueryClientProvider>
    );

    await waitFor(() => getByAltText("User Avatar"));

    await user.click(getByAltText("User Avatar"));

    await act(async () => {
      await user.click(getByText("Logout"));
    });

    expect(logoutApi).toHaveBeenCalledOnce();
  });
});
