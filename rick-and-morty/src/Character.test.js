import React from "react";
import Character from "./Character";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

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

it("Gets data from the service URL with no page number", () => {
    expect.assertions(3);
    const instance = wrapper.instance();
    
    return instance.processCharacterPageRequest().then(resp => {
        expect(resp.CurrentPage).toBe(1);
        expect(resp.Characters.length).toBeGreaterThan(1);
        expect(resp.Pages.length).toBeGreaterThan(1);
    }).catch(error => {
        expect(error.CurrentPage).toBe(1);
        expect(resp.Characters.length).toBeGreaterThan(0);
        expect(resp.Pages.length).toBeGreaterThan(0);
    });
});

it("Gets data from the service URL with a page number", () => {
    expect.assertions(1);
    const instance = wrapper.instance();
    
    return instance.processCharacterPageRequest(3).then(resp => {
        expect(resp.CurrentPage).toBe(3);
    }).catch(error => {
        expect(error.CurrentPage).toBe(1);
    });
});