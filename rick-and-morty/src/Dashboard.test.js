import React from "react";
import Dashboard from "./Dashboard";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

let wrapper;
Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  wrapper = shallow(<Dashboard />);
});

it("Uses render with shallow and using object defined in beforeEach", () => {
  expect.anything(wrapper);
  expect.anything(wrapper.find("div.text-center"));
  expect(wrapper.find("div.text-center")).toHaveLength(1);
});