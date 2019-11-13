import React from "react";
import { CreateRecommendation } from "./CreateRecommendation";
import { Provider } from "../../Context";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from "@testing-library/react";

describe("<CreateRecommendation/>", () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce(success =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        })
      )
    ),
  };

  afterEach(cleanup, mockGeolocation.getCurrentPosition.mockClear());

  const props = {
    context: {
      data: {
        createRecommendation: jest.fn(),
      },
    },
    match: {
      data: "data",
      params: {
        id: 1,
      },
    },
    history: {
      data: "data",
    },
  };
  global.navigator.geolocation = mockGeolocation;

  it("should render correctly", async () => {
    const { queryByLabelText, getByPlaceholderText } = render(
      <CreateRecommendation
        context={props.context}
        match={props.match}
        history={props.history}
      />
    );
    expect(queryByLabelText("create recommendation title")).toBeTruthy();
    expect(queryByLabelText("create recommendation description")).toBeTruthy();
    expect(queryByLabelText("create recommendation instructions")).toBeTruthy();
    expect(getByPlaceholderText("What's great about this place?")).toBeTruthy();
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    await waitForElement(() =>
      getByPlaceholderText("Enter the name of your place")
    );
    expect(getByPlaceholderText("Enter the name of your place")).toBeDefined();
  });

  it("should get the location of the user", async () => {
    const { getByPlaceholderText, getByText, debug } = render(
      <Provider>
        <CreateRecommendation
          context={props.context}
          match={props.match}
          history={props.history}
        />
      </Provider>
    );
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    await waitForElement(() =>
      getByPlaceholderText("Enter the name of your place")
    );
    const locationInput = getByPlaceholderText("Enter the name of your place");
    fireEvent.change(locationInput, {
      target: {
        value: "McDonald's",
      },
    });

    const descriptionInput = getByPlaceholderText(
      "What's great about this place?"
    );

    fireEvent.change(descriptionInput, {
      target: {
        value: "Great place to take the kids after the park",
      },
    });

    debug();

    getByText("Create Recommendation").click();
  });
});
