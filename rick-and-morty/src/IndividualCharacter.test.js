import React from "react";
import IndividualCharacter from "./IndividualCharacter";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

let wrapper;
Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  wrapper = shallow(<IndividualCharacter />);
});

it("Uses render with shallow and using object defined in beforeEach", () => {
    expect.anything(wrapper);
});

it("Renders an image when one is selected", () => {
    const component = mount(<IndividualCharacter />);
    component.setState({"ImageExists" : true, "ImageUrl" : "https://rickandmortyapi.com/api/character/avatar/1.jpeg", "Name": "Rick Sanchez", "Gender" : "Male", "Species" : "Human" });
    expect(component.find("img#character-portrait")).toHaveLength(1);
});

it("Negates an image when one is not specified", () => {
  const component = mount(<IndividualCharacter />);
  component.setState({ "ImageExists" : false, "ImageUrl" : "", "Name": "", "Gender" : "", "Species" : "" });
  expect(component.find("img#character-portrait")).toHaveLength(0);
});