import React from "react";
import IndividualCharacter from "./IndividualCharacter";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

let wrapper;
Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  wrapper = shallow(<IndividualCharacter />);
});

it("Uses render with shallow and using object defined in beforeEach", () => {
    expect.anything(wrapper);
});

it("Gets a character from URL", () => {
    expect.assertions(1);
    expect.anything(wrapper);
    const instance = wrapper.instance();
    return instance.processCharacterRequest(1).then(resp => { expect(resp.ImageExists).toBe(true); }).catch(error => { expect(resp.ImageExists).toBe(false); });
});