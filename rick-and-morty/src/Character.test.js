import React from "react";
import Character from "./Character";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

let wrapper;
Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  wrapper = shallow(<Character />);
});

it("Uses render with shallow and using object defined in beforeEach", () => {
    let sessionState = wrapper.state();
    expect.anything(wrapper);
    expect(sessionState.CharacterRedirectId).toBe(0);
    expect(sessionState.CurrentPage).toBe(1);
    expect(sessionState.Pages).toHaveLength(1);
    expect(sessionState.Characters).toHaveLength(0);
});

it("Uses instance to invoke methods directly", () => {
    const instance = wrapper.instance();

    expect.anything(wrapper);
    expect.anything(instance);
    
    let newPages = instance.processNewPaginationArray(5);
    expect(newPages).toHaveLength(5);
});

it("Assert the correct number of buttons that show up", () => {
    const component = mount(<Character />);
    component.setState({ "CharacterRedirectId" : 0, "NameSearch" : "", "CurrentPage" : 1, "Pages" : [1,2,3,4,5], "Characters" : [] });
    expect(component.find("ul.pagination button.page-link")).toHaveLength(5);
});