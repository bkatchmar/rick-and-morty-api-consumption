import React from "react";
import AppContainer from "./AppContainer";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

let wrapper;
Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  wrapper = shallow(<AppContainer />);
});

it("Uses render with shallow and using object defined in beforeEach", () => {
  expect.anything(wrapper);
});